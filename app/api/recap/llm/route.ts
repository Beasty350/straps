import { NextResponse } from 'next/server';
import { PrismaClient } from '@/prisma/generated/client/client';
import { getMongoClient } from '@/lib/mongodb/mongodb';
import { ObjectId } from 'mongodb';

export const maxDuration = 300;

const prisma = new PrismaClient();
const OLLAMA_URL = process.env.OLLAMA_API_URL!;

export async function POST(req: Request) {
    try {
        const { recapId } = await req.json();

        // 1. Fetch the base recap from Postgres
        const recap = await prisma.userRecap.findUnique({
            where: { id: recapId },
            include: { user: true, menu: true }
        });

        if (!recap) {
            return NextResponse.json({ error: "Recap data not found" }, { status: 404 });
        }

        // 2. Fetch exercise summary AND heart rate summary from MongoDB
        let exercises: any[] = [];
        let hrSummary: any = null;

        if (recap.mongodbId) {
            try {
                const client = await getMongoClient();
                const db = client.db("straps_sensor_data");
                const mongoData = await db.collection("raw_pose_streams").findOne(
                    { _id: new ObjectId(recap.mongodbId) },
                    { projection: { exercise_summary: 1, heart_rate_summary: 1 } }  // ← also fetch HR summary
                );
                exercises = mongoData?.exercise_summary || [];
                hrSummary = mongoData?.heart_rate_summary || null;
            } catch (e) {
                console.error("Failed to fetch data from Mongo for LLM", e);
            }
        }

        if (!exercises || exercises.length === 0) {
            return NextResponse.json({ error: "No biomechanical data found in session" }, { status: 404 });
        }

        // 3. 🧠 Build the prompt (exercise data + optional HR data)
        const userName = recap.user?.name || 'the client';
        const userGender = recap.user?.gender ? ` (${recap.user.gender})` : '';
        let biomechanicalPrompt = `Workout for ${userName}${userGender}:\n`;

        // Add exercises (first 3)
        exercises.slice(0, 3).forEach((ex, idx) => {
            const mainJoint = ex.precalculatedMetrics?.jointStats?.[0];
            const rom = mainJoint ? `${Math.round(mainJoint.min)}-${Math.round(mainJoint.max)}°` : 'N/A';
            biomechanicalPrompt += `${idx+1}. ${ex.exerciseName}: score ${Math.round(ex.score)}/100, ${ex.repsDone || ex.reps || 0} reps @ ${ex.weight || 0}kg, TUT ${ex.ui_summary?.duration_seconds || '?'}s, ROM ${rom}\n`;
        });

        // Add heart rate data if available
        if (hrSummary && hrSummary.avg) {
            biomechanicalPrompt += `\nHeart rate summary: average ${hrSummary.avg} bpm, max ${hrSummary.max} bpm, min ${hrSummary.min} bpm based on ${hrSummary.sampleCount || '?'} samples.\n`;
        } else {
            biomechanicalPrompt += `\nHeart rate data: not available for this session.\n`;
        }

        // 4. Send the perfectly formatted text to Llama 3
        const llmPayload = {
            model: "gemma4", // Or whatever model name you are using in Ollama
            prompt: `Physical therapist recap (2 paragraphs, no markdown):
                    1st para: Form score /100, ROM values (degrees) for primary joints, main issue.
                    ${hrSummary ? 'Include heart rate summary: average, max, min.' : ''}
                    2nd para: Weakest movement phase (descent/ascent/lockout). Recommend 1-2 exercise types (e.g., tempo, paused reps) with brief "why". End encouraging data-driven statement.

                    --- Example 1 (good form, high score) ---
                    Form score: 92/100. Primary joints: left knee ROM 105° (target 100–110°), right knee 108°. Main issue: slight asymmetry – right knee lags 3° in flexion. Heart rate average 132 bpm, peak 158 bpm.
                    Weakest phase: descent – right knee collapses inward during the last 20° of flexion. Recommendation: add tempo squats (3‑0‑3 count) and banded knee track drills to improve neuromuscular control and symmetric loading. Continue this pattern and you'll reach 95+ in two weeks.

                    --- Example 2 (low score, major corrections needed) ---
                    Form score: 68/100. Primary joints: left elbow ROM 45–130° (target 0–85° for up phase, 140–180° for down). Main issue: incomplete range of motion – stops 25° above full extension and 10° short of full flexion. Heart rate average 148 bpm, max 172 bpm.
                    Weakest phase: lockout – fails to fully extend elbows, reducing time under tension. Recommendation: implement isometric holds at end range (5 seconds) and slow eccentric hammer curls to strengthen the brachialis. Consistent work on end‑range strength will rapidly close the ROM gap.

                    Now generate a recap for the following data using the same two‑paragraph format. Omit heart rate section if no HR data is provided.
            
            DATA: ${biomechanicalPrompt}`,
            stream: false,
            options: {
                temperature: 0.4,        // Lower = more deterministic, higher = more creative (0.0–1.0)
                top_p: 0.9,              // Nucleus sampling: 0.9 means consider top 90% probability mass
                top_k: 40,               // Limits to top K tokens (common values 40–60)
                repeat_penalty: 1.1,     // Discourages repetition (1.0 = no penalty, >1.0 penalizes repetition)
                num_predict: 512,        // Max tokens to generate (adjust as needed)
                stop: ["\n---", "```"]   // Stop sequences (optional)
            }
        };

        const ollamaRes = await fetch(OLLAMA_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(llmPayload)
        });

        const ollamaData = await ollamaRes.json();
        const finalSummary = ollamaData.response;

        // 5. Save the generated summary back to Postgres
        const existingSummary = recap.sessionSummary as any || {};
        await prisma.userRecap.update({
            where: { id: recapId },
            data: {
                sessionSummary: {
                    ...existingSummary,
                    llmOverallFeedback: finalSummary
                }
            }
        });

        return NextResponse.json({ success: true, summary: finalSummary });

    } catch (error) {
        console.error("LLM Generation Error:", error);
        return NextResponse.json({ success: false, error: "Failed to generate AI summary" }, { status: 500 });
    }
}