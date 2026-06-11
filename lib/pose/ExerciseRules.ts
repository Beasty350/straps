export interface Landmark {
    x: number;
    y: number;
    z: number;
    visibility?: number;
}

export interface AnglesDict {
    [key: string]: number;
}

export type FormValidationResult = {
    valid: boolean;
    feedback: string[];
};

export type ExerciseCategory = 'upper_body' | 'lower_body' | 'full_body';

export interface ExerciseConfig {
    name: string;
    category: ExerciseCategory;
    detection: {
        shoulder_static?: [number, number];
        shoulder_down?: [number, number];
        hip_static?: [number, number];
    };
    phase_type: 'start_down' | 'start_up';
    dynamic_angles: {
        [key: string]: [number, number];
    };
    static_angles?: { [key: string]: number };
    // Optional flags for validation
    requires_full_body?: boolean;   // if true, legs must be visible
    requires_front_view?: boolean;  // if true, user must face the camera
}

export const EXERCISE_CONFIGS: { [key: string]: ExerciseConfig } = {
    // ========== UPPER BODY ==========
    bicep_curl: {
        name: "Bicep Curl",
        category: 'upper_body',
        phase_type: 'start_down',
        detection: { shoulder_static: [0, 30] },
        dynamic_angles: {
            elbow_down: [140, 180],
            elbow_up: [0, 85],
            shoulder_down: [0, 30],
            shoulder_up: [0, 60]
        },
        static_angles: { shoulder_r: 15, shoulder_l: 15 },
        requires_full_body: false
    },
    hammer_curl: {
        name: "Hammer Curl",
        category: 'upper_body',
        phase_type: 'start_down',
        detection: { shoulder_static: [0, 30] },
        dynamic_angles: {
            elbow_down: [120, 180],
            elbow_up: [0, 85],
            shoulder_down: [0, 30],
            shoulder_up: [0, 60]
        },
        static_angles: { shoulder_r: 15, shoulder_l: 15 },
        requires_full_body: false
    },
    overhead_press: {
        name: "Overhead Press",
        category: 'upper_body',
        phase_type: 'start_down',
        detection: { shoulder_down: [60, 110] },
        dynamic_angles: {
            elbow_down: [45, 110],
            elbow_up: [150, 180],
            shoulder_down: [60, 110],
            shoulder_up: [150, 180]
        },
        static_angles: {},
        requires_full_body: false
    },
    lateral_raises: {
        name: "Lateral Raises",
        category: 'upper_body',
        phase_type: 'start_down',
        detection: { shoulder_static: [0, 30] },
        dynamic_angles: {
            shoulder_down: [0, 30],
            shoulder_up: [75, 105],
            elbow_down: [150, 180],
            elbow_up: [150, 180]
        },
        static_angles: { elbow_r: 170, elbow_l: 170 },
        requires_full_body: false
    },
    front_raise: {
        name: "Front Raise",
        category: 'upper_body',
        phase_type: 'start_down',
        detection: { shoulder_static: [0, 30] },
        dynamic_angles: {
            shoulder_down: [6, 15],
            shoulder_up: [150, 165],
            elbow_down: [170, 180],
            elbow_up: [110, 115]
        },
        static_angles: { elbow_r: 160, elbow_l: 160 },
        requires_full_body: false
    },
    up_right: {
        name: "Up Right",
        category: 'upper_body',
        phase_type: 'start_down',
        detection: { shoulder_static: [0, 30] },
        dynamic_angles: {
            elbow_down: [150, 179],
            elbow_up: [80, 110],
            shoulder_down: [0, 30],
            shoulder_up: [70, 140]
        },
        static_angles: { shoulder_r: 15, shoulder_l: 15 },
        requires_full_body: false
    },
    high_pull: {
        name: "High Pull",
        category: 'upper_body',
        phase_type: 'start_down',
        detection: { shoulder_static: [0, 30] },
        dynamic_angles: {
            elbow_down: [140, 170],
            elbow_up: [20, 90],
            shoulder_down: [50, 70],
            shoulder_up: [80, 115],
            hip_down: [140, 155],
            hip_up: [160, 175]
        },
        static_angles: { shoulder_r: 15, shoulder_l: 15 },
        requires_full_body: false
    },

    // ========== LOWER BODY / FULL BODY ==========
    squat: {
        name: "Squat",
        category: 'lower_body',
        phase_type: 'start_up',
        detection: {},
        dynamic_angles: {
            hip_up: [160, 180],
            hip_down: [40, 100],
            knee_up: [160, 180],
            knee_down: [40, 100]
        },
        static_angles: { shoulder_r: 20, shoulder_l: 20 },
        requires_full_body: true
    },
    sumo_squat: {
        name: "Sumo Squat",
        category: 'lower_body',
        phase_type: 'start_up',
        detection: {},
        dynamic_angles: {
            hip_up: [160, 180],
            hip_down: [70, 110],
            knee_up: [160, 180],
            knee_down: [80, 110],
            shoulder_up: [10, 30],
            shoulder_down: [10, 30]
        },
        static_angles: { shoulder_r: 20, shoulder_l: 20 },
        requires_full_body: true,
        requires_front_view: true
    },
    deadlift: {
        name: "Deadlift",
        category: 'full_body',
        phase_type: 'start_down',
        detection: {},
        dynamic_angles: {
            hip_down: [45, 100],
            hip_up: [160, 180],
            knee_down: [60, 120],
            knee_up: [160, 180]
        },
        static_angles: { elbow_r: 160, elbow_l: 160 },
        requires_full_body: true
    },
    sumo_deadlift: {
        name: "Sumo Deadlift",
        category: 'full_body',
        phase_type: 'start_down',
        detection: {},
        dynamic_angles: {
            hip_down: [100, 125],
            hip_up: [160, 180],
            knee_down: [130, 155],
            knee_up: [160, 180],
            shoulder_down: [10, 30],
            shoulder_up: [10, 30]
        },
        static_angles: { shoulder_r: 20, shoulder_l: 20, elbow_r: 170, elbow_l: 170 },
        requires_full_body: true,
        requires_front_view: true
    },
    lunges: {
        name: "Lunges",
        category: 'lower_body',
        phase_type: 'start_up',
        detection: {},
        dynamic_angles: {
            hip_down: [45, 100],
            hip_up: [160, 180],
            knee_up: [160, 180],
            knee_down: [70, 110]
        },
        static_angles: {},
        requires_full_body: true
    },
    side_lunges: {
        name: "Side Lunges",
        category: 'lower_body',
        phase_type: 'start_up',
        detection: {},
        dynamic_angles: {
            knee_up: [160, 180],
            knee_down: [80, 120],
            hip_up: [160, 180],
            hip_down: [80, 120],
            shoulder_up: [10, 30],
            shoulder_down: [10, 30]
        },
        static_angles: { shoulder_r: 20, shoulder_l: 20 },
        requires_full_body: true
    },

    // ========== FULL BODY COMPLEX ==========
    dumbbell_thruster: {
        name: "Dumbbell Thruster",
        category: 'full_body',
        phase_type: 'start_up',
        detection: { shoulder_static: [20, 40] },
        dynamic_angles: {
            hip_down: [80, 110],
            knee_down: [80, 110],
            hip_up: [160, 180],
            knee_up: [160, 180],
            elbow_down: [20, 60],
            elbow_up: [150, 180],
            shoulder_down: [20, 50],
            shoulder_up: [140, 170]
        },
        static_angles: { shoulder_r: 15, shoulder_l: 15 },
        requires_full_body: true
    },
    dumbbell_push_clean_jerk: {
        name: "Dumbbell Push Clean and Jerk",
        category: 'full_body',
        phase_type: 'start_down',
        detection: {},
        dynamic_angles: {
            clean_elbow_down: [150, 180],
            clean_elbow_up: [60, 100],
            clean_knee_down: [150, 180],
            clean_knee_up: [120, 140],
            jerk_elbow_down: [60, 100],
            jerk_elbow_up: [150, 180],
            jerk_knee_down: [140, 160],
            jerk_knee_up: [160, 180],
            hip_down: [150, 180],
            hip_up: [160, 180]
        },
        static_angles: { shoulder_r: 15, shoulder_l: 15 },
        requires_full_body: true
    },
    dumbbell_push_jerk: {
        name: "Dumbbell Push Jerk",
        category: 'full_body',
        phase_type: 'start_down',
        detection: {},
        dynamic_angles: {
            rack_elbow: [50, 115],
            rack_knee: [160, 180],
            rack_hip: [160, 180],
            dip_knee: [130, 155],
            dip_hip: [140, 160],
            dip_elbow: [50, 115],
            drive_elbow: [115, 180],
            drive_knee: [160, 180],
            drive_hip: [160, 180],
            catch_elbow: [150, 180],
            catch_knee: [125, 150],
            catch_hip: [140, 160],
            stand_elbow: [150, 180],
            stand_knee: [160, 180],
            stand_hip: [160, 180]
        },
        static_angles: { shoulder_r: 15, shoulder_l: 15 },
        requires_full_body: true
    }
};