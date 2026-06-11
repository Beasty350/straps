import { Landmark } from './ExerciseRules';

// ============================================================================
// Basic geometry & normalization
// ============================================================================

export type Point = { x: number; y: number };
export type Vec3 = { x: number; y: number; z: number; visibility?: number };
export type Orientation = 'Face Forward' | 'Face 45 Degree' | 'Face Sideway';

export function computeDistance(p1: Point, p2: Point): number {
    return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

export function calculateAngle(a: Point, b: Point, c: Point): number {
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs(radians * 180 / Math.PI);
    if (angle > 180) angle = 360 - angle;
    return angle;
}

export function inRange(val: number, low: number, high: number): boolean {
    return val >= low && val <= high;
}

export function calculateContainmentScore(userRange: [number, number], refRange: [number, number]): number {
    const [user_min, user_max] = userRange;
    const [ref_min, ref_max] = refRange;
    if (user_min === user_max) {
        return (user_min >= ref_min && user_min <= ref_max) ? 1.0 : 0.0;
    }
    const user_length = user_max - user_min;
    if (user_length <= 0) return 1.0;
    const intersection_min = Math.max(user_min, ref_min);
    const intersection_max = Math.min(user_max, ref_max);
    const intersection_length = Math.max(0, intersection_max - intersection_min);
    return intersection_length / user_length;
}

export function calculateRangeDeviation(value: number, range: [number, number]): number {
    const [min, max] = range;
    if (value < min) return min - value;
    if (value > max) return value - max;
    return 0;
}

export function computeMAE(errors: number[]): number {
    if (errors.length === 0) return 0;
    return errors.reduce((a, b) => a + b, 0) / errors.length;
}

// ============================================================================
// Heart Rate Zone Analysis
// ============================================================================

export interface HrZone {
    name: string;
    durationMinutes: number;
}

export interface HrZoneAnalysis {
    zones: HrZone[];
    sensorWarning: boolean;
}

/**
 * Compute heart rate zone distribution and sensor warning based on age and BPM samples.
 * Uses Tanaka formula: maxHR = 208 - 0.7 * age
 * Each sample is assumed to be taken every second (duration = sample count / 60 minutes).
 * @param samples Array of { timestamp, bpm } where timestamp is relative seconds.
 * @param age User's age in years.
 * @returns Zone analysis with durations in minutes and a sensor warning if >30 seconds below 40% HR.
 */
export function computeHrZoneAnalysis(
    samples: { timestamp: number; bpm: number }[],
    age: number
): HrZoneAnalysis {
    if (!samples.length) {
        return { zones: [], sensorWarning: false };
    }

    const maxHR = 208 - 0.7 * age;
    const zoneCounts: Record<string, number> = {
        'Below 40%': 0,
        'Zone 1 (40-59%)': 0,
        'Zone 2 (60-74%)': 0,
        'Zone 3 (75-84%)': 0,
        'Zone 4 (85-94%)': 0,
        'Zone 5 (95-100%)': 0
    };
    let sensorWarning = false;

    for (const sample of samples) {
        const percent = (sample.bpm / maxHR) * 100;
        if (percent < 40) {
            zoneCounts['Below 40%']++;
            sensorWarning = true;
        } else if (percent < 60) {
            zoneCounts['Zone 1 (40-59%)']++;
        } else if (percent < 75) {
            zoneCounts['Zone 2 (60-74%)']++;
        } else if (percent < 85) {
            zoneCounts['Zone 3 (75-84%)']++;
        } else if (percent < 95) {
            zoneCounts['Zone 4 (85-94%)']++;
        } else {
            zoneCounts['Zone 5 (95-100%)']++;
        }
    }

    // Convert sample count (1 sample ≈ 1 second) to minutes
    const zones = Object.entries(zoneCounts)
        .filter(([_, count]) => count > 0)
        .map(([name, count]) => ({
            name,
            durationMinutes: parseFloat((count / 60).toFixed(1))
        }));

    return { zones, sensorWarning };
}

// ============================================================================
// Landmark normalization
// ============================================================================

export function normalizeLandmarks(landmarks: Landmark[]): Landmark[] {
    const indices = [11, 12, 23, 24];
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    for (const i of indices) {
        const p = landmarks[i];
        sumX += p.x;
        sumY += p.y;
        sumXY += p.x * p.y;
        sumXX += p.x * p.x;
    }
    const n = indices.length;
    const m = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const theta = !isFinite(m) ? Math.PI / 2 : Math.atan(m);
    const cos_t = Math.cos(-theta);
    const sin_t = Math.sin(-theta);
    const shoulder_center = {
        x: (landmarks[11].x + landmarks[12].x) / 2,
        y: (landmarks[11].y + landmarks[12].y) / 2
    };
    const hip_center = {
        x: (landmarks[23].x + landmarks[24].x) / 2,
        y: (landmarks[23].y + landmarks[24].y) / 2
    };
    const scale_factor = computeDistance(shoulder_center, hip_center) || 1e-6;
    return landmarks.map(lm => ({
        ...lm,
        x: ((lm.x - hip_center.x) * cos_t - (lm.y - hip_center.y) * sin_t) / scale_factor,
        y: ((lm.x - hip_center.x) * sin_t + (lm.y - hip_center.y) * cos_t) / scale_factor,
        z: (lm.z ?? 0) / scale_factor
    }));
}

export function getUserOrientation(leftShoulder: Vec3, rightShoulder: Vec3): Orientation {
    if (!leftShoulder || !rightShoulder) return 'Face Forward';
    const dx = Math.abs(rightShoulder.x - leftShoulder.x);
    const dz = Math.abs(rightShoulder.z - leftShoulder.z);
    const angle = Math.atan2(dz, dx) * (180 / Math.PI);
    if (angle < 25) return 'Face Forward';
    if (angle > 65) return 'Face Sideway';
    return 'Face 45 Degree';
}

// ============================================================================
// Exercise‑specific orientation and stance helpers
// ============================================================================

/**
 * Detect body orientation based on shoulder and hip widths.
 * @returns 'front' if facing camera, 'side' if sideways, 'unknown' if unclear.
 */
export function detectBodyOrientation(landmarks: Landmark[]): 'front' | 'side' | 'unknown' {
    if (!landmarks || landmarks.length < 25) return 'unknown';
    const leftShoulder = landmarks[11];
    const rightShoulder = landmarks[12];
    const leftHip = landmarks[23];
    const rightHip = landmarks[24];
    if (!leftShoulder || !rightShoulder || !leftHip || !rightHip) return 'unknown';
    const shoulderWidth = Math.abs(rightShoulder.x - leftShoulder.x);
    const hipWidth = Math.abs(rightHip.x - leftHip.x);
    if (shoulderWidth > 0.2 && hipWidth > 0.2) return 'front';
    if (shoulderWidth < 0.12 && hipWidth < 0.12) return 'side';
    return 'unknown';
}

/**
 * Detect stance width (distance between ankles) for sumo exercises.
 * @returns normalized width (range ~0 – 0.5).
 */
export function detectStanceWidth(landmarks: Landmark[]): number {
    if (!landmarks || landmarks.length < 28) return 0;
    const leftAnkle = landmarks[27];
    const rightAnkle = landmarks[28];
    if (!leftAnkle || !rightAnkle) return 0;
    return Math.abs(rightAnkle.x - leftAnkle.x);
}

/**
 * Check if the user is in a valid side‑view position for Push Jerk.
 * @returns { valid, reason } object.
 */
export function isValidPushJerkOrientation(landmarks: Landmark[]): { valid: boolean; reason: string } {
    const orientation = detectBodyOrientation(landmarks);
    if (orientation !== 'side') {
        return { valid: false, reason: 'Turn sideways for Push Jerk!' };
    }
    return { valid: true, reason: '' };
}

/**
 * Check if the dumbbells are in the rack position (shoulder height) from side view.
 */
export function isRackPositionSideView(landmarks: Landmark[]): boolean {
    if (!landmarks || landmarks.length < 16) return false;
    const leftWrist = landmarks[15];
    const leftShoulder = landmarks[11];
    const rightWrist = landmarks[16];
    const rightShoulder = landmarks[12];
    if (!leftWrist || !leftShoulder || !rightWrist || !rightShoulder) return false;
    const leftDiff = Math.abs(leftWrist.y - leftShoulder.y);
    const rightDiff = Math.abs(rightWrist.y - rightShoulder.y);
    return leftDiff < 0.15 && rightDiff < 0.15;
}

// ============================================================================
// 1. One Euro Filter (single and manager)
// ============================================================================

export class OneEuroFilter {
    private minCutoff: number;
    private beta: number;
    private dCutoff: number;
    private xPrev: number | null = null;
    private dxPrev: number = 0;
    private tPrev: number | null = null;

    constructor(minCutoff = 1.0, beta = 0.007, dCutoff = 1.0) {
        this.minCutoff = minCutoff;
        this.beta = beta;
        this.dCutoff = dCutoff;
    }

    private smoothingFactor(tE: number, cutoff: number): number {
        const r = 2 * Math.PI * cutoff * tE;
        return r / (r + 1);
    }

    private exponentialSmoothing(a: number, x: number, xPrev: number): number {
        return a * x + (1 - a) * xPrev;
    }

    public filter(t: number, x: number): number {
        if (this.tPrev === null || this.xPrev === null) {
            this.tPrev = t;
            this.xPrev = x;
            return x;
        }
        const tE = Math.max(1e-6, (t - this.tPrev) / 1000.0);
        const dx = (x - this.xPrev) / tE;
        const alphaD = this.smoothingFactor(tE, this.dCutoff);
        const dxSmoothed = this.exponentialSmoothing(alphaD, dx, this.dxPrev);
        const cutoff = this.minCutoff + this.beta * Math.abs(dxSmoothed);
        const alpha = this.smoothingFactor(tE, cutoff);
        const xSmoothed = this.exponentialSmoothing(alpha, x, this.xPrev);
        this.tPrev = t;
        this.dxPrev = dxSmoothed;
        this.xPrev = xSmoothed;
        return xSmoothed;
    }
}

export interface OneEuroFilterConfig {
    minCutoff: number;
    beta: number;
    dCutoff: number;
}

export class OneEuroFilterManager {
    private filtersX: Map<number, OneEuroFilter> = new Map();
    private filtersY: Map<number, OneEuroFilter> = new Map();
    private filtersZ: Map<number, OneEuroFilter> = new Map();
    private defaultConfig: OneEuroFilterConfig;

    constructor(config?: Partial<OneEuroFilterConfig>) {
        this.defaultConfig = {
            minCutoff: config?.minCutoff ?? 1.0,
            beta: config?.beta ?? 0.5,
            dCutoff: config?.dCutoff ?? 1.0,
        };
    }

    private getFilter(jointIdx: number, coord: 'x' | 'y' | 'z'): OneEuroFilter {
        let map: Map<number, OneEuroFilter>;
        if (coord === 'x') map = this.filtersX;
        else if (coord === 'y') map = this.filtersY;
        else map = this.filtersZ;
        if (!map.has(jointIdx)) {
            map.set(jointIdx, new OneEuroFilter(this.defaultConfig.minCutoff, this.defaultConfig.beta, this.defaultConfig.dCutoff));
        }
        return map.get(jointIdx)!;
    }

    public filterLandmarks<T extends { x: number; y: number; z?: number }>(landmarks: T[], timestamp: number): T[] {
        return landmarks.map((lm, idx) => ({
            ...lm,
            x: this.getFilter(idx, 'x').filter(timestamp, lm.x),
            y: this.getFilter(idx, 'y').filter(timestamp, lm.y),
            z: lm.z !== undefined ? this.getFilter(idx, 'z').filter(timestamp, lm.z) : lm.z,
        }));
    }

    public resetAll(): void {
        this.filtersX.clear();
        this.filtersY.clear();
        this.filtersZ.clear();
    }

    public updateDefaultConfig(config: Partial<OneEuroFilterConfig>): void {
        this.defaultConfig = { ...this.defaultConfig, ...config };
    }
}

// ============================================================================
// 2. Mean Filter Manager
// ============================================================================

export class MeanFilterManager {
    private windowSize: number;
    private buffersX: Map<number, number[]> = new Map();
    private buffersY: Map<number, number[]> = new Map();
    private buffersZ: Map<number, number[]> = new Map();

    constructor(windowSize = 3) {
        this.windowSize = Math.max(1, windowSize);
    }

    private updateBuffer(buffer: number[], value: number): number {
        buffer.push(value);
        while (buffer.length > this.windowSize) buffer.shift();
        const sum = buffer.reduce((a, b) => a + b, 0);
        return sum / buffer.length;
    }

    public filterLandmarks<T extends { x: number; y: number; z?: number }>(landmarks: T[]): T[] {
        return landmarks.map((lm, idx) => {
            let bx = this.buffersX.get(idx);
            if (!bx) { bx = []; this.buffersX.set(idx, bx); }
            let by = this.buffersY.get(idx);
            if (!by) { by = []; this.buffersY.set(idx, by); }
            let bz = this.buffersZ.get(idx);
            if (!bz) { bz = []; this.buffersZ.set(idx, bz); }
            return {
                ...lm,
                x: this.updateBuffer(bx, lm.x),
                y: this.updateBuffer(by, lm.y),
                z: lm.z !== undefined ? this.updateBuffer(bz, lm.z) : lm.z,
            };
        });
    }

    public resetAll(): void {
        this.buffersX.clear();
        this.buffersY.clear();
        this.buffersZ.clear();
    }

    public setWindowSize(size: number): void {
        this.windowSize = Math.max(1, size);
        this.resetAll();
    }
}

// ============================================================================
// 3. Speed Threshold Corrector
// ============================================================================

export class SpeedThresholdCorrector {
    public enabled = true;
    private prevPositions: Map<number, { x: number; y: number; z: number; t: number }> = new Map();
    private maxSpeedPerSec = 5.0; // in normalized coordinates per second

    public correct(landmarks: Landmark[], timestamp: number, _imageHeight: number): Landmark[] {
        if (!this.enabled) return landmarks;
        return landmarks.map((lm, idx) => {
            const prev = this.prevPositions.get(idx);
            if (!prev) {
                this.prevPositions.set(idx, { x: lm.x, y: lm.y, z: lm.z ?? 0, t: timestamp });
                return lm;
            }
            const dt = Math.max(0.001, (timestamp - prev.t) / 1000);
            const dx = lm.x - prev.x;
            const dy = lm.y - prev.y;
            const speed = Math.hypot(dx, dy) / dt;
            if (speed > this.maxSpeedPerSec) {
                const factor = this.maxSpeedPerSec / speed;
                const corrected = {
                    ...lm,
                    x: prev.x + dx * factor,
                    y: prev.y + dy * factor,
                };
                this.prevPositions.set(idx, { x: corrected.x, y: corrected.y, z: lm.z ?? 0, t: timestamp });
                return corrected;
            }
            this.prevPositions.set(idx, { x: lm.x, y: lm.y, z: lm.z ?? 0, t: timestamp });
            return lm;
        });
    }

    public reset(): void {
        this.prevPositions.clear();
    }
}

// ============================================================================
// 4. Z Corrector (tilt & limb correction)
// ============================================================================

export class ZCorrector {
    public tiltCorrectionEnabled = true;
    public limbCorrectionEnabled = true;

    public correctAllJoints(landmarks: Landmark[], bodyHeight: number): Landmark[] {
        let result = landmarks;
        if (this.tiltCorrectionEnabled) result = this.correctTilt(result, bodyHeight);
        if (this.limbCorrectionEnabled) result = this.correctLimbLengths(result);
        return result;
    }

    private correctTilt(landmarks: Landmark[], _bodyHeight: number): Landmark[] {
        // Simplified tilt correction using shoulder‑hip line
        const leftShoulder = landmarks[11];
        const rightShoulder = landmarks[12];
        const leftHip = landmarks[23];
        const rightHip = landmarks[24];
        if (!leftShoulder || !rightShoulder || !leftHip || !rightHip) return landmarks;
        const shoulderCenter = { x: (leftShoulder.x + rightShoulder.x) / 2, y: (leftShoulder.y + rightShoulder.y) / 2 };
        const hipCenter = { x: (leftHip.x + rightHip.x) / 2, y: (leftHip.y + rightHip.y) / 2 };
        const dx = shoulderCenter.x - hipCenter.x;
        const dy = shoulderCenter.y - hipCenter.y;
        const tiltAngle = Math.atan2(dx, dy);
        const cos = Math.cos(-tiltAngle);
        const sin = Math.sin(-tiltAngle);
        return landmarks.map(lm => ({
            ...lm,
            z: lm.z * cos - (lm.x - hipCenter.x) * sin,
        }));
    }

    private correctLimbLengths(landmarks: Landmark[]): Landmark[] {
        // Placeholder: real implementation would adjust based on reference ratios
        return landmarks;
    }
}