import { XGBoostPredictor } from './XGBoostPredictor';
import { Landmark, EXERCISE_CONFIGS } from './ExerciseRules';
import { RehabCore } from './RehabCore';
import {
    OneEuroFilterManager,
    MeanFilterManager,
    SpeedThresholdCorrector,
    ZCorrector,
    normalizeLandmarks
} from './MathUtils';

const LABELS = ['Standing', 'Sitting', 'Fall Detected'];

export class HARCore {
    private predictor: XGBoostPredictor;
    private rehab: RehabCore;
    private currentExercise: string | null = null;

    private oneEuroFilter: OneEuroFilterManager;
    private meanFilter: MeanFilterManager;
    private speedCorrector: SpeedThresholdCorrector;
    private zCorrector: ZCorrector;
    private lastTimestamp: number = 0;
    private useOneEuroFilter = true;
    private useMeanFilter = true;
    private usePostureNormalization = true;
    private imageHeight = 480;

    constructor() {
        this.predictor = new XGBoostPredictor();
        this.rehab = new RehabCore();
        this.oneEuroFilter = new OneEuroFilterManager({ minCutoff: 0.8, beta: 0.7, dCutoff: 1.0 });
        this.meanFilter = new MeanFilterManager(3);
        this.speedCorrector = new SpeedThresholdCorrector();
        this.zCorrector = new ZCorrector();
    }

    public setExercise(name: string) {
        if (!name) { this.currentExercise = null; return; }
        const lower = name.toLowerCase().trim();
        if (EXERCISE_CONFIGS[lower]) { this.currentExercise = lower; return; }
        const singular = lower.replace(/s$/, '');
        if (EXERCISE_CONFIGS[singular]) { this.currentExercise = singular; return; }
        const key = Object.keys(EXERCISE_CONFIGS).find(k => lower.includes(k.replace(/_/g, ' ')) || k.replace(/_/g, ' ').includes(lower));
        if (key) { this.currentExercise = key; return; }
        const firstWord = lower.split(' ')[0];
        const possible = Object.keys(EXERCISE_CONFIGS).find(k => k.startsWith(firstWord));
        this.currentExercise = possible || null;
    }

    public resetParams() {
        this.rehab.reset();
        this.oneEuroFilter.resetAll();
        this.meanFilter.resetAll();
        this.speedCorrector.reset();
        this.zCorrector = new ZCorrector();
        this.lastTimestamp = 0;
    }

    private applySmoothing(landmarks: Landmark[], timestamp: number): Landmark[] {
        let result = landmarks;
        result = this.speedCorrector.correct(result, timestamp, this.imageHeight);
        const hipCenterY = (landmarks[23]?.y + landmarks[24]?.y) / 2;
        const shoulderCenterY = (landmarks[11]?.y + landmarks[12]?.y) / 2;
        const bodyHeight = Math.abs(shoulderCenterY - hipCenterY);
        if (bodyHeight > 0) result = this.zCorrector.correctAllJoints(result as any, bodyHeight) as Landmark[];
        if (this.useOneEuroFilter && timestamp > this.lastTimestamp)
            result = this.oneEuroFilter.filterLandmarks(result, timestamp);
        if (this.useMeanFilter)
            result = this.meanFilter.filterLandmarks(result);
        this.lastTimestamp = timestamp;
        return result;
    }

    public resetFilters() {
        this.oneEuroFilter.resetAll();
        this.meanFilter.resetAll();
        this.lastTimestamp = 0;
    }

    public setFilterMode(mode: 'cpu' | 'gpu') {
        if (mode === 'cpu') {
            this.meanFilter.setWindowSize(5);
            this.oneEuroFilter.updateDefaultConfig({ beta: 0.5 });
        } else {
            this.meanFilter.setWindowSize(2);
            this.oneEuroFilter.updateDefaultConfig({ beta: 0.3 });
        }
    }

    public enableOneEuroFilter(enable: boolean) { this.useOneEuroFilter = enable; }
    public enableMeanFilter(enable: boolean) { this.useMeanFilter = enable; }
    public setImageHeight(height: number) { this.imageHeight = height; }
    public enableSpeedThreshold(enable: boolean) { this.speedCorrector.enabled = enable; }
    public enableZCorrection(enable: boolean) { this.zCorrector.tiltCorrectionEnabled = this.zCorrector.limbCorrectionEnabled = enable; }
    public enablePostureNormalization(enable: boolean) { this.usePostureNormalization = enable; }

    public async process(rawLandmarks: Landmark[], worldLandmarks: Landmark[] = []) {
        if (!rawLandmarks?.length) return null;

        const timestamp = Date.now();
        const smoothed = this.applySmoothing(rawLandmarks, timestamp);
        const normLandmarks = this.usePostureNormalization ? normalizeLandmarks(smoothed) : smoothed;

        const features = this.extractFeatures(normLandmarks);
        const probs = this.predictor.predict(features);
        const maxIdx = probs.indexOf(Math.max(...probs));
        const status = LABELS[maxIdx];
        const confidence = probs[maxIdx];

        let reps = 0, feedback = "";
        let scores = null, debug = {};

        if (this.currentExercise) {
            const result = this.rehab.process(
                this.currentExercise,
                smoothed,
                worldLandmarks,
                timestamp
            );
            if (result) {
                reps = this.rehab.getReps(this.currentExercise);
                feedback = result.feedback || "Good Form";
                scores = result.scores;
                debug = {
                    angles: { l: result.left?.angle, r: result.right?.angle },
                    stages: `${result.left?.stage}|${result.right?.stage}`
                };
            }
        } else {
            return {
                status, confidence, exercise: null, reps: 0,
                feedback: "Select an exercise", debug: {},
                scores: { isPending: true, overall: 0 }
            };
        }

        return {
            status, confidence, exercise: this.currentExercise, reps, feedback, debug,
            scores
        };
    }

    private extractFeatures(landmarks: Landmark[]): number[] {
        const raw: number[] = [];
        landmarks.forEach(lm => raw.push(lm.x, lm.y, lm.z, lm.visibility || 0));
        const get = (idx: number) => landmarks[idx];
        const pt = (lm: Landmark) => ({ x: lm.x, y: lm.y });
        const calcAng = (a: Landmark, b: Landmark, c: Landmark) => {
            const rad = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
            let ang = Math.abs(rad * 180 / Math.PI);
            if (ang > 180) ang = 360 - ang;
            return ang;
        };
        const derived = [
            calcAng(get(11), get(13), get(15)),
            calcAng(get(12), get(14), get(16)),
            calcAng(get(23), get(25), get(27)),
            calcAng(get(24), get(26), get(28)),
        ];
        return [...raw, ...derived];
    }
}