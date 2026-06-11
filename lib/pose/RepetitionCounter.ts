import { Landmark, EXERCISE_CONFIGS } from './ExerciseRules';
import { calculateAngle, Point, calculateRangeDeviation, computeMAE, inRange } from './MathUtils';

export type RepData = {
    primary_angle_r: { up: number[]; down: number[] };
    primary_angle_l: { up: number[]; down: number[] };
    static_angles: { [key: string]: number[] };
    frame_times: number[];
};

export type RepetitionSummary = {
    scores: any;
    feedback: string;
    fps: number;
    count: number;
};

type Phase = 'idle' | 'down_prep' | 'up' | 'done';

export class RepetitionCounter {
    public current_exercise: string = 'unknown';
    private right_phase: Phase = 'idle';
    private left_phase: Phase = 'idle';
    public raw_reps: { [key: string]: number } = {};
    public last_score: any = {};
    public all_scores: any[] = [];
    private rep_data: RepData = this.reset_rep_data();
    private last_frame_time: number = performance.now();

    private reset_rep_data(): RepData {
        return {
            primary_angle_r: { up: [], down: [] },
            primary_angle_l: { up: [], down: [] },
            static_angles: {},
            frame_times: []
        };
    }

    private getPrimaryAngles(exercise: string, landmarks: Landmark[]): { left: number; right: number } {
        const getPt = (idx: number): Point => ({ x: landmarks[idx].x, y: landmarks[idx].y });
        switch (exercise) {
            case 'bicep_curl':
            case 'hammer_curl':
            case 'overhead_press':
                return {
                    left: calculateAngle(getPt(11), getPt(13), getPt(15)),
                    right: calculateAngle(getPt(12), getPt(14), getPt(16))
                };
            case 'squat':
            case 'lunges':
                return {
                    left: calculateAngle(getPt(23), getPt(25), getPt(27)),
                    right: calculateAngle(getPt(24), getPt(26), getPt(28))
                };
            case 'deadlift':
                return {
                    left: calculateAngle(getPt(11), getPt(23), getPt(25)),
                    right: calculateAngle(getPt(12), getPt(24), getPt(26))
                };
            case 'lateral_raises':
                return {
                    left: calculateAngle(getPt(23), getPt(11), getPt(13)),
                    right: calculateAngle(getPt(24), getPt(12), getPt(14))
                };
            default:
                return { left: 0, right: 0 };
        }
    }

    private checkThresholds(angle: number, thresholds: [number, number]): boolean {
        return angle >= thresholds[0] && angle <= thresholds[1];
    }

    private generateShortFeedback(exercise: string, isConcentric: boolean): string {
        switch (exercise) {
            case 'bicep_curl':
            case 'hammer_curl': return isConcentric ? 'Curl higher' : 'Arm straight';
            case 'squat': return isConcentric ? 'Stand tall' : 'Squat lower';
            case 'deadlift': return isConcentric ? 'Stand tall' : 'Hinge lower';
            case 'overhead_press': return isConcentric ? 'Press higher' : 'Lower fully';
            case 'lateral_raises': return isConcentric ? 'Raise higher' : 'Lower arms';
            case 'lunges': return isConcentric ? 'Push up' : 'Drop knee';
            default: return 'Good';
        }
    }

    // ---- Scoring Logic (restored from (1) version, without hull/wrist) ----
    private calculateRepetitionScore(config: any, exercise: string): any {
        const global_config = { static_angle_tolerance: 12, dynamic_angle_buffer: 10 };
        const dynamic_thresholds = config.dynamic_angles;

        // 1. Dynamic angles score
        const joint_scores: { [key: string]: number } = {};
        const relevantJoints = ['elbow_r', 'elbow_l'];
        if (exercise === 'overhead_press') relevantJoints.push('shoulder_r', 'shoulder_l');

        for (const joint of relevantJoints) {
            const jointBase = joint.split('_')[0]; // 'elbow' or 'shoulder'
            for (const stage of ['up', 'down'] as const) {
                const userAngles = this.rep_data[`primary_angle_${joint.slice(-1)}` as 'primary_angle_l' | 'primary_angle_r'][stage];
                const scoreKey = `${joint}_${stage}`;
                if (userAngles && userAngles.length > 0) {
                    const userMin = Math.min(...userAngles);
                    const userMax = Math.max(...userAngles);
                    const refKey = `${jointBase}_${stage}`;
                    const refRange = dynamic_thresholds[refKey] || [0, 0];
                    const [refMin, refMax] = refRange;
                    const outLow = Math.max(0, refMin - userMin);
                    const outHigh = Math.max(0, userMax - refMax);
                    const buffer = global_config.dynamic_angle_buffer;
                    const penLow = Math.max(0, outLow - buffer);
                    const penHigh = Math.max(0, outHigh - buffer);
                    const totalPenalty = penLow + penHigh;
                    const userLength = userMax - userMin;
                    let score = 0.0;
                    if (userMin >= refMin && userMax <= refMax) score = 1.0;
                    else if (userLength > 0) score = Math.max(0, (userLength - totalPenalty) / userLength);
                    joint_scores[scoreKey] = score * 100;
                }
            }
        }

        // 2. Static angles score (if defined in config)
        const staticScores: { [key: string]: number } = {};
        const refStatic = config.static_angles || {};
        for (const [joint, refVal] of Object.entries(refStatic)) {
            const userVals = this.rep_data.static_angles[joint];
            if (userVals && userVals.length > 0) {
                const userMin = Math.min(...userVals);
                const userMax = Math.max(...userVals);
                const tolerance = global_config.static_angle_tolerance;
                const refNum = refVal as number;
                const refMin = refNum;
                const refMax = refNum + tolerance;
                const intersectionMin = Math.max(userMin, refMin);
                const intersectionMax = Math.min(userMax, refMax);
                const intersectionLength = Math.max(0, intersectionMax - intersectionMin);
                const userLength = userMax - userMin;
                const score = userLength > 0 ? intersectionLength / userLength : 0;
                staticScores[joint] = score * 100;
            }
        }

        return {
            "Dynamic Angle Score": joint_scores,
            "Static Angle Score": staticScores,
        };
    }

    public process(exercise: string, smoothedLandmarks: Landmark[]): RepetitionSummary | null {
        if (!smoothedLandmarks?.length) return null;
        this.current_exercise = exercise;
        const config = EXERCISE_CONFIGS[exercise];
        if (!config) return null;

        const now = performance.now();
        this.rep_data.frame_times.push(now - this.last_frame_time);
        this.last_frame_time = now;

        const angles = this.getPrimaryAngles(exercise, smoothedLandmarks);
        let down_th: [number, number] = [0, 0];
        let up_th: [number, number] = [0, 0];
        for (const key in config.dynamic_angles) {
            if (key.includes('down')) down_th = config.dynamic_angles[key];
            if (key.includes('up')) up_th = config.dynamic_angles[key];
        }

        let activeFeedback = 'Good';
        const updatePhase = (phase: Phase, angle: number, side: 'left' | 'right'): Phase => {
            if (phase === 'done') return 'done';
            const angleData = side === 'left' ? this.rep_data.primary_angle_l : this.rep_data.primary_angle_r;
            const isDown = this.checkThresholds(angle, down_th);
            const isUp = this.checkThresholds(angle, up_th);

            // Record static angles if defined
            for (const joint of Object.keys(config.static_angles || {})) {
                if (!this.rep_data.static_angles[joint]) this.rep_data.static_angles[joint] = [];
                if (joint.endsWith('_r') && side === 'right') this.rep_data.static_angles[joint].push(angle);
                else if (joint.endsWith('_l') && side === 'left') this.rep_data.static_angles[joint].push(angle);
                else if (!joint.includes('_')) this.rep_data.static_angles[joint].push(angle);
            }

            if (config.phase_type === 'start_down') {
                if (phase === 'idle' && isDown) return 'down_prep';
                if (phase === 'down_prep' && isUp) { angleData.up.push(angle); return 'up'; }
                if (phase === 'up' && isDown) { angleData.down.push(angle); return 'done'; }
                if (phase === 'down_prep' && !isUp) activeFeedback = this.generateShortFeedback(exercise, true);
                if (phase === 'up' && !isDown) activeFeedback = this.generateShortFeedback(exercise, false);
            } else {
                if (phase === 'idle' && isUp) return 'down_prep';
                if (phase === 'down_prep' && isDown) { angleData.down.push(angle); return 'up'; }
                if (phase === 'up' && isUp) { angleData.up.push(angle); return 'done'; }
                if (phase === 'down_prep' && !isDown) activeFeedback = this.generateShortFeedback(exercise, false);
                if (phase === 'up' && !isUp) activeFeedback = this.generateShortFeedback(exercise, true);
            }
            return phase;
        };

        this.right_phase = updatePhase(this.right_phase, angles.right, 'right');
        this.left_phase = updatePhase(this.left_phase, angles.left, 'left');

        if (this.right_phase === 'done' && this.left_phase === 'done') {
            this.raw_reps[exercise] = (this.raw_reps[exercise] || 0) + 1;
            // Calculate scores using the collected rep data
            this.last_score = this.calculateRepetitionScore(config, exercise);
            const fps = this.rep_data.frame_times.length
                ? 1000 / (this.rep_data.frame_times.reduce((a, b) => a + b, 0) / this.rep_data.frame_times.length)
                : 0;
            const summary: RepetitionSummary = {
                scores: this.last_score,
                feedback: 'Rep Completed',
                fps: Math.round(fps),
                count: this.raw_reps[exercise]
            };
            this.right_phase = this.left_phase = 'idle';
            this.rep_data = this.reset_rep_data();
            return summary;
        }

        // Live telemetry (no full scores yet)
        return {
            scores: { left_angle: Math.round(angles.left), right_angle: Math.round(angles.right) },
            feedback: activeFeedback,
            fps: 0,
            count: this.raw_reps[exercise] || 0
        };
    }
}