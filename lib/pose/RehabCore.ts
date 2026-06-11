import { Landmark, EXERCISE_CONFIGS } from './ExerciseRules';
import {
    computeFeatures, RepFSM, Vec3, PoseFeatures,
    BicepCurlCounter, HammerCurlCounter, OverheadPressCounter,
    LateralRaiseCounter, SquatCounter, DeadliftCounter, LungeCounter,
    FrontRaiseCounter, SumoSquatCounter, SumoDeadliftCounter,
    SideLungesCounter, UpRightCounter, HighPullCounter,
    DumbbellThrusterCounter, DumbbellPushCleanJerkCounter,
    DumbbellPushJerkCounter
} from './RehabFSM';
import { calculateRangeDeviation, computeMAE, detectBodyOrientation, detectStanceWidth, isValidPushJerkOrientation, isRackPositionSideView } from './MathUtils';

const normalizeExerciseName = (input: string): string => {
    if (!input) return '';
    const clean = input.toLowerCase().trim().replace(/\s+/g, '_');

    if (clean.includes('push_jerk')) return 'dumbbell_push_jerk';
    if (clean.includes('front_raise')) return 'front_raise';
    if (clean.includes('sumo_deadlift')) return 'sumo_deadlift';
    if (clean.includes('bicep')) return 'bicep_curl';
    if (clean.includes('hammer')) return 'hammer_curl';
    if (clean.includes('overhead') || clean.includes('shoulder_press')) return 'shoulder_press';
    if (clean.includes('lateral')) return 'lateral_raises';
    if (clean.includes('sumo_squat')) return 'sumo_squat';
    if (clean.includes('squat')) return 'squat';
    if (clean.includes('deadlift')) return 'deadlift';
    if (clean.includes('side_lunges')) return 'side_lunges';
    if (clean.includes('lunge')) return 'lunges';
    if (clean.includes('up_right')) return 'up_right';
    if (clean.includes('high_pull')) return 'high_pull';
    if (clean.includes('push_clean')) return 'dumbbell_push_clean_jerk';
    if (clean.includes('thruster')) return 'dumbbell_thruster';
    return clean;
};

const COUNTER_MAP: { [key: string]: () => RepFSM[] } = {
    bicep_curl: () => [new BicepCurlCounter('left'), new BicepCurlCounter('right')],
    hammer_curl: () => [new HammerCurlCounter('left'), new HammerCurlCounter('right')],
    shoulder_press: () => [new OverheadPressCounter()],
    lateral_raises: () => [new LateralRaiseCounter()],
    front_raise: () => [new FrontRaiseCounter()],
    squat: () => [new SquatCounter()],
    sumo_squat: () => [new SumoSquatCounter()],
    deadlift: () => [new DeadliftCounter()],
    sumo_deadlift: () => [new SumoDeadliftCounter()],
    lunges: () => [new LungeCounter()],
    side_lunges: () => [new SideLungesCounter()],
    up_right: () => [new UpRightCounter()],
    high_pull: () => [new HighPullCounter()],
    dumbbell_thruster: () => [new DumbbellThrusterCounter()],
    dumbbell_push_clean_jerk: () => [new DumbbellPushCleanJerkCounter()],
    dumbbell_push_jerk: () => [new DumbbellPushJerkCounter()]
};

export class RehabCore {
    private counters: { [key: string]: RepFSM[] } = {};
    private readonly DEVIATION_THRESHOLD = 15.0;

    reset() { this.counters = {}; }

    private validateExerciseType(configKey: string, features: PoseFeatures, landmarks: Landmark[]): string | null {
        const stanceWidth = detectStanceWidth(landmarks);
        const minKneeAngle = Math.min(features.leftKnee, features.rightKnee);
        const isLegsBent = minKneeAngle < 130;
        const minElbowAngle = Math.min(features.leftElbow, features.rightElbow);
        const isElbowsBent = minElbowAngle < 110;
        const isArmsStraight = minElbowAngle > 140;
        const isHandsOverhead = (features.leftWristY < features.noseY) || (features.rightWristY < features.noseY);
        const isHandsLow = (features.leftWristY > features.leftShoulderY) && (features.rightWristY > features.rightShoulderY);
        const diffElbow = Math.abs(features.leftElbow - features.rightElbow);
        const isAlternating = diffElbow > 40;
        const isSimultaneous = diffElbow < 20;

        // Push Jerk
        if (configKey === 'dumbbell_push_jerk') {
            const orientationCheck = isValidPushJerkOrientation(landmarks);
            if (!orientationCheck.valid) return orientationCheck.reason;
            const isRack = isRackPositionSideView(landmarks);
            if (!isRack && this.getReps(configKey) === 0) return "Start with dumbbells at shoulders (rack position)";
            return null;
        }

        // Front Raise
        if (configKey === 'front_raise') {
            const isElbowsStraight = minElbowAngle > 150;
            if (isLegsBent) return "Stand straight for Front Raise";
            if (!isElbowsStraight) return "Keep elbows straight";
            return null;
        }

        // Sumo Deadlift
        if (configKey === 'sumo_deadlift') {
            const orientation = detectBodyOrientation(landmarks);
            if (stanceWidth < 0.12) return "Widen your stance for Sumo Deadlift";
            if (orientation !== 'front') return "Face the camera for Sumo Deadlift";
            return null;
        }

        // Sumo Squat
        if (configKey === 'sumo_squat') {
            const orientation = detectBodyOrientation(landmarks);
            if (stanceWidth < 0.12) return "Wider stance for Sumo Squat";
            if (orientation !== 'front') return "Face the camera for Sumo Squat";
            return null;
        }

        // Side Lunges
        if (configKey === 'side_lunges') {
            const kneeDiff = Math.abs(features.leftKnee - features.rightKnee);
            const bothBent = features.leftKnee < 130 && features.rightKnee < 130;
            if (bothBent && kneeDiff < 20) return "Bend one knee to the side, keep the other straight";
            return null;
        }

        // Bicep Curl
        if (configKey === 'bicep_curl') {
            if (isLegsBent) return "Stand straight for Bicep Curl";
            if (isHandsOverhead) return "Keep arms down";
            if (isArmsStraight && !isHandsLow) return "Bend your elbows";
            if (isAlternating) return "Move both arms together";
            return null;
        }

        // Hammer Curl
        if (configKey === 'hammer_curl') {
            if (isLegsBent) return "Stand straight for Hammer Curl";
            if (isHandsOverhead) return "Keep arms down";
            if (isArmsStraight && !isHandsLow) return "Bend your elbows";
            if (isSimultaneous && isElbowsBent) return "Alternate arms for Hammer Curl";
            return null;
        }

        // Overhead Press
        if (configKey === 'shoulder_press') {
            if (isLegsBent) return "Stand straight for Overhead Press";
            if (isHandsLow && isElbowsBent) return "Push weight up, don't curl";
            return null;
        }

        // Lateral Raises
        if (configKey === 'lateral_raises') {
            if (isLegsBent) return "Stand straight for Lateral Raises";
            if (isHandsOverhead) return "Stop at shoulder height";
            if (isElbowsBent) return "Keep arms straight";
            return null;
        }

        // Squat
        if (configKey === 'squat') {
            const orientation = detectBodyOrientation(landmarks);
            if (orientation !== 'side') return "Turn sideways for Squat";
            if (!isLegsBent && isElbowsBent) return "Bend your knees";
            const diffKnee = Math.abs(features.leftKnee - features.rightKnee);
            if (isLegsBent && diffKnee > 30) return "Keep knees symmetrical";
            return null;
        }

        // Deadlift
        if (configKey === 'deadlift') {
            const orientation = detectBodyOrientation(landmarks);
            if (orientation !== 'side') return "Turn sideways for Deadlift";
            return null;
        }

        // Lunges
        if (configKey === 'lunges') {
            const diffKnee = Math.abs(features.leftKnee - features.rightKnee);
            if (isLegsBent && diffKnee < 15) return "Step one foot forward/back for Lunge";
            return null;
        }

        return null;
    }

    private calculateDeviation(configKey: string, features: PoseFeatures, fsmState: "LOW" | "HIGH"): { mae: number; details: string[] } {
        const config = EXERCISE_CONFIGS[configKey];
        if (!config || !config.dynamic_angles) return { mae: 0, details: [] };

        let targetSuffix = '';
        if (config.phase_type === 'start_down') {
            targetSuffix = (fsmState === 'HIGH') ? '_up' : '_down';
        } else {
            targetSuffix = (fsmState === 'HIGH') ? '_down' : '_up';
        }

        const errors: number[] = [];
        const details: string[] = [];

        for (const [key, range] of Object.entries(config.dynamic_angles)) {
            if (key.endsWith(targetSuffix)) {
                const prefix = key.replace(targetSuffix, '');
                let val = 0;
                if (prefix.includes('elbow')) val = (features.leftElbow + features.rightElbow) / 2;
                else if (prefix.includes('knee')) val = (features.leftKnee + features.rightKnee) / 2;
                else if (prefix.includes('hip')) val = (features.leftHip + features.rightHip) / 2;
                else if (prefix.includes('shoulder')) val = (features.leftShoulderJoint + features.rightShoulderJoint) / 2;
                else continue;

                const err = calculateRangeDeviation(val, range as [number, number]);
                if (err > 0) {
                    errors.push(err);
                    details.push(`${key} dev ${err.toFixed(0)}°`);
                }
            }
        }

        return { mae: computeMAE(errors), details };
    }

    private generateStageFeedback(configKey: string, fsmState: "LOW" | "HIGH", reps: number): string {
        let feedback = "";
        switch (configKey) {
            case 'bicep_curl':
            case 'hammer_curl':
                feedback = fsmState === 'HIGH' ? "CURL UP!" : "LOWER DOWN!";
                break;
            case 'shoulder_press':
                feedback = fsmState === 'HIGH' ? "PRESS UP!" : "LOWER DOWN!";
                break;
            case 'lateral_raises':
                feedback = fsmState === 'HIGH' ? "RAISE!" : "LOWER!";
                break;
            case 'front_raise':
                feedback = fsmState === 'HIGH' ? "FRONT RAISE!" : "LOWER DOWN!";
                break;
            case 'squat':
                feedback = fsmState === 'HIGH' ? "SQUAT DOWN!" : "STAND UP!";
                break;
            case 'sumo_squat':
                feedback = fsmState === 'HIGH' ? "SUMO SQUAT!" : "STAND UP!";
                break;
            case 'deadlift':
                feedback = fsmState === 'HIGH' ? "STAND UP!" : "HINGE DOWN!";
                break;
            case 'sumo_deadlift':
                feedback = fsmState === 'HIGH' ? "STAND UP!" : "LOWER WIDE!";
                break;
            case 'lunges':
                feedback = fsmState === 'HIGH' ? "LUNGE!" : "PUSH UP!";
                break;
            case 'side_lunges':
                feedback = fsmState === 'HIGH' ? "SIDE LUNGE!" : "PUSH BACK!";
                break;
            case 'up_right':
                feedback = fsmState === 'HIGH' ? "UP RIGHT!" : "LOWER!";
                break;
            case 'high_pull':
                feedback = fsmState === 'HIGH' ? "HIGH PULL!" : "LOWER!";
                break;
            case 'dumbbell_thruster':
                feedback = fsmState === 'HIGH' ? "THRUSTER!" : "LOWER!";
                break;
            case 'dumbbell_push_clean_jerk':
                feedback = fsmState === 'HIGH' ? "CLEAN & JERK!" : "RESET!";
                break;
            case 'dumbbell_push_jerk':
                feedback = fsmState === 'HIGH' ? "JERK!" : "RACK!";
                break;
            default:
                feedback = fsmState === 'HIGH' ? "UP!" : "DOWN!";
        }
        if (reps > 0) feedback += ` (${reps})`;
        return feedback;
    }

    public process(exerciseName: string, landmarks: Landmark[], worldLandmarks: Landmark[] = [], frameTime: number = 0) {
        const configKey = normalizeExerciseName(exerciseName);
        if (!this.counters[configKey]) {
            const factory = COUNTER_MAP[configKey];
            if (!factory) return null;
            this.counters[configKey] = factory();
        }
        const counters = this.counters[configKey];

        const vecLandmarks: Vec3[] = landmarks.map(l => ({ x: l.x, y: l.y, z: l.z || 0, visibility: l.visibility }));
        const vecWorld: Vec3[] = worldLandmarks.map(l => ({ x: l.x, y: l.y, z: l.z || 0, visibility: l.visibility }));
        const features = computeFeatures(vecLandmarks, vecWorld, frameTime || Date.now());

        const results = counters.map(c => c.update(features));
        const mainCounter = counters[0];
        const fsmState = mainCounter ? mainCounter.state : "LOW";
        const deviation = this.calculateDeviation(configKey, features, fsmState);
        const wrongExerciseWarning = this.validateExerciseType(configKey, features, landmarks);

        let leftAngle = 0, rightAngle = 0;
        if (['squat', 'sumo_squat', 'sumo_deadlift', 'lunges', 'side_lunges'].includes(configKey)) {
            leftAngle = features.leftKnee; rightAngle = features.rightKnee;
        } else if (configKey === 'deadlift') {
            leftAngle = features.leftHip; rightAngle = features.rightHip;
        } else if (['lateral_raises', 'front_raise'].includes(configKey)) {
            leftAngle = (0.5 - features.leftShoulderY) * 180;
            rightAngle = (0.5 - features.rightShoulderY) * 180;
        } else {
            leftAngle = features.leftElbow; rightAngle = features.rightElbow;
        }

        const reps = this.getReps(exerciseName);
        let feedback = wrongExerciseWarning || (deviation.details.length > 0 ? `Fix form: ${deviation.details.join(", ")}` : this.generateStageFeedback(configKey, fsmState, reps));
        if (!feedback) feedback = "Keep going";

        return {
            left: { stage: mainCounter?.state === 'HIGH' ? 'UP' : 'DOWN', angle: leftAngle, reps: counters[0]?.reps || 0 },
            right: { stage: counters[1]?.state === 'HIGH' ? 'UP' : 'DOWN', angle: rightAngle, reps: counters[1]?.reps || 0 },
            feedback,
            scores: { deviation_mae: deviation.mae, isDeviating: deviation.details.length > 0, details: deviation.details }
        };
    }

    public getReps(exName: string): number {
        const configKey = normalizeExerciseName(exName);
        const counters = this.counters[configKey];
        if (!counters) return 0;
        if (configKey === 'hammer_curl') return Math.min(...counters.map(c => c.reps));
        return Math.max(...counters.map(c => c.reps));
    }
}