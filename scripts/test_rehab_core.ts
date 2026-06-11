import { RehabCore } from '../lib/pose/RehabCore';
import { Landmark } from '../lib/pose/ExerciseRules';

const core = new RehabCore();

// Create dummy data for both normalized and world landmarks
const mockLandmarks: Landmark[] = Array(33).fill({ x: 0.5, y: 0.5, z: 0, visibility: 1 });
const mockWorldLandmarks: Landmark[] = Array(33).fill({ x: 0, y: 0, z: 0, visibility: 1 });

// Ensure these match the switch cases in your RepetitionCounter.ts
const exercises = [
    'bicep_curl', 
    'hammer_curl', 
    'overhead_press', 
    'lateral_raises', 
    'squat', 
    'deadlift', 
    'lunges'
];

console.log("Testing RehabCore Config Loading...");

exercises.forEach(name => {
    try {
        // Fix: Pass 4 arguments with the correct types
        // Arg 3: mockWorldLandmarks (Landmark[])
        // Arg 4: Date.now() (number)
        const result = core.process(name, mockLandmarks, mockWorldLandmarks, Date.now());
        
        if (result) {
            console.log(`[PASS] ${name} -> Processed successfully.`);
        } else {
            console.error(`[FAIL] ${name} -> Returned null (Config not found?).`);
        }
    } catch (e) {
        console.error(`[FAIL] ${name} -> Exception:`, e);
    }
});