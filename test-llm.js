// test-llm.js
const MODEL_API_URL = process.env.MODEL_API_URL;

// 1. Updated Mock Data matching your exact MongoDB schema
const mockData = {
    exercise_summary: [
        {
            exerciseName: 'bicep_curl',
            repsDone: 10,
            correctReps: 7,
            repsImprovement: 3,
            weight: 20,
            score: 65,
            ui_summary: {
                total_frames: 260,
                duration_seconds: '28.7'
            },
            precalculatedMetrics: {
                avgScore: 65,
                avgAccuracy: 77,
                avgDeductions: 15,
                jointStats: [
                    { name: 'Left Shoulder', min: 6, max: 170, avgUp: 165, avgDown: 10 },
                    { name: 'Right Shoulder', min: 7, max: 159, avgUp: 152, avgDown: 11 },
                    { name: 'Left Elbow', min: 1, max: 180, avgUp: 172, avgDown: 13 },
                    { name: 'Right Elbow', min: 1, max: 179, avgUp: 170, avgDown: 9 },
                    { name: 'Left Wrist', min: 27, max: 180, avgUp: 173, avgDown: 27 },
                    { name: 'Right Wrist', min: 75, max: 180, avgUp: 171, avgDown: 102 }
                ]
            }
        }
    ],
    heart_rate_summary: {
        avg: 98,
        max: 108,
        min: 90,
        sampleCount: 14,
        zoneAnalysis: [
            { name: 'Zone 1 (40-59%)', durationMinutes: 0.2 }
        ],
        sensorWarning: false
    }
};

// 2. Dynamic Prompt Builder (Parses the rich data)
function buildPrompt(data) {
    let biomechanicalPrompt = `Workout for the client:\n`;

    // Process Exercises
    data.exercise_summary.forEach((ex, idx) => {
        biomechanicalPrompt += `${idx + 1}. ${ex.exerciseName}: Score ${ex.score}/100. `;
        biomechanicalPrompt += `Reps: ${ex.correctReps}/${ex.repsDone} correct @ ${ex.weight}kg. TUT: ${ex.ui_summary.duration_seconds}s.\n`;
        
        if (ex.precalculatedMetrics && ex.precalculatedMetrics.jointStats) {
            biomechanicalPrompt += `   Joint Kinematics (degrees):\n`;
            ex.precalculatedMetrics.jointStats.forEach(joint => {
                biomechanicalPrompt += `   - ${joint.name}: Min ${joint.min}°, Max ${joint.max}°, Up Phase Avg ${joint.avgUp}°, Down Phase Avg ${joint.avgDown}°\n`;
            });
        }
    });

    // Process Heart Rate
    const hr = data.heart_rate_summary;
    if (hr && hr.avg) {
        biomechanicalPrompt += `\nHeart Rate Summary: Avg ${hr.avg} bpm, Max ${hr.max} bpm, Min ${hr.min} bpm (${hr.sampleCount} samples). `;
        if (hr.zoneAnalysis && hr.zoneAnalysis.length > 0) {
            const zones = hr.zoneAnalysis.map(z => `${z.name} for ${z.durationMinutes}m`).join(', ');
            biomechanicalPrompt += `Zones: ${zones}. `;
        }
        if (hr.sensorWarning) biomechanicalPrompt += `[Warning: Sensor data may be unreliable].`;
        biomechanicalPrompt += `\n`;
    }

    return biomechanicalPrompt;
}

const finalDataString = buildPrompt(mockData);

// 3. API Payload
const payload = {
    prompt: `Physical therapist recap (2 paragraphs, no markdown):
            1st para: Form score /100, correct vs total reps, and specific joint asymmetries (compare left vs right ROM and up/down phases). Include heart rate summary.
            2nd para: Weakest movement phase based on joint averages. Recommend 1-2 corrections (e.g., tempo, paused reps) with a brief "why". End with an encouraging data-driven statement.

            Now generate a recap for the following biomechanical sensor data using the requested format.
    
            DATA: 
            ${finalDataString}`,
    temperature: 0.4,
    max_tokens: 512
};

// 4. Benchmarking Execution
async function runBenchmark() {
    console.log(`Sending request to standalone API at: ${MODEL_API_URL}...`);
    console.log(`\nConstructed Prompt Data:\n${finalDataString}`);
    
    const startWallTime = performance.now();

    try {
        const response = await fetch(MODEL_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`API responded with status ${response.status}`);
        }

        const data = await response.json();
        const endWallTime = performance.now();

        // Adjust based on your API's specific response format
        const finalSummary = data.response || data.text || data.generated_text; 
        
        if (!finalSummary) {
             throw new Error("Could not find the generated text in the API response.");
        }

        const totalDurationSec = ((endWallTime - startWallTime) / 1000).toFixed(2);
        const estimatedTokens = Math.round(finalSummary.length / 4);
        const tokensPerSecond = (estimatedTokens / totalDurationSec).toFixed(2);

        const metricsTable = [
            { Metric: "API Endpoint", Value: MODEL_API_URL },
            { Metric: "Total Round-Trip Time", Value: `${totalDurationSec} seconds` },
            { Metric: "Estimated Output Length", Value: `${finalSummary.length} characters (~${estimatedTokens} tokens)` },
            { Metric: "Estimated Speed", Value: `~${tokensPerSecond} tokens/sec` }
        ];

        console.log("\n--- GENERATED SUMMARY ---");
        console.log(finalSummary.trim());
        console.log("-----------------------------\n");

        console.log("--- GPU API PERFORMANCE BENCHMARK ---");
        console.table(metricsTable);

    } catch (error) {
        console.error("Benchmark Failed:", error.message);
    }
}

runBenchmark();