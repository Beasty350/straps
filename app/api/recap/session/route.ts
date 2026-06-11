export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getMongoClient } from '@/lib/mongodb/mongodb';
import { PrismaClient } from '@/prisma/generated/client/client';
import { ObjectId } from 'mongodb';
import { computeHrZoneAnalysis } from '@/lib/pose/MathUtils';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Helper: compute age from birthDate
function getAgeFromBirthDate(birthDate: Date | null): number | null {
  if (!birthDate) return null;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
}

export async function POST(req: Request) {
    console.log("🟢 [API] /api/recap/session - POST Request started");
    const startTime = Date.now();

    try {
        console.log("⏳ [API] Parsing request body...");
        const body = await req.json();

        const {
            userId,
            menuId,
            sessionSummary,
            rawPoseData,
            hrSamples,
            hrSummary,
            // === NEW: Gait & ROM data ===
            gaitData,        // full metrics from gait analyzer
            gaitSummary,     // simplified summary (optional)
            romData,         // full joint ranges from ROM page
            romSummary       // simplified min/max per joint (optional)
        } = body;

        const payloadSizeMb = (JSON.stringify(body).length / (1024 * 1024)).toFixed(2);
        console.log(`✅ [API] Body parsed successfully. Size: ~${payloadSizeMb} MB`);

        if (parseFloat(payloadSizeMb) > 4.0) {
            console.warn("⚠️ WARNING: Payload size is close to serverless limits (4.5MB)!");
        }

        let insertedMongoId = null;

        // 1. Prepare lightweight exercise summary (if exercise data exists)
        const lightweightExercises = (sessionSummary?.exercises || []).map((ex: any) => ({
            exerciseName: ex.exerciseName,
            repsDone: ex.repsDone || 0,
            correctReps: ex.correctReps || 0,
            repsImprovement: ex.repsImprovement || 0,
            weight: ex.weight || 0,
            score: ex.score || 0,
            ui_summary: ex.ui_summary || {},
            precalculatedMetrics: ex.precalculatedMetrics || {}
        }));

        // 2. Heart rate zone analysis (if HR samples exist)
        let enhancedHrSummary = hrSummary || null;
        if (hrSamples && hrSamples.length > 0) {
            try {
                // Fetch birthDate instead of age
                const user = await prisma.user.findUnique({
                    where: { id: userId },
                    select: { birthDate: true }
                });
                const age = getAgeFromBirthDate(user?.birthDate || null);
                if (age !== null && typeof age === 'number') {
                    const { zones, sensorWarning } = computeHrZoneAnalysis(hrSamples, age);
                    enhancedHrSummary = {
                        ...(hrSummary || {}),
                        zoneAnalysis: zones,
                        sensorWarning
                    };
                    console.log(`✅ [API] HR zone analysis computed for user age ${age}`);
                } else {
                    console.warn("⚠️ [API] User birthDate missing, skipping HR zone analysis");
                }
            } catch (zoneErr) {
                console.error("❌ [API] HR zone analysis failed:", zoneErr);
            }
        }

        // 3. Insert into MongoDB (raw_pose_streams)
        try {
            console.log("⏳ [API] Connecting to MongoDB...");
            const mongoStartTime = Date.now();
            const client = await getMongoClient();
            const db = client.db("straps_sensor_data");
            console.log(`✅ [API] MongoDB Connected in ${Date.now() - mongoStartTime}ms`);

            // Build the document dynamically – only include fields that are provided
            const mongoDoc: any = {
                userId: String(userId),
                created_at: new Date(),
            };
            if (rawPoseData) mongoDoc.exercise_data = rawPoseData;
            if (lightweightExercises.length) mongoDoc.exercise_summary = lightweightExercises;
            if (hrSamples?.length) mongoDoc.heart_rate_samples = hrSamples;
            if (enhancedHrSummary) mongoDoc.heart_rate_summary = enhancedHrSummary;
            if (gaitData) mongoDoc.gait_data = gaitData;
            if (gaitSummary) mongoDoc.gait_summary = gaitSummary;
            if (romData) mongoDoc.rom_data = romData;
            if (romSummary) mongoDoc.rom_summary = romSummary;

            console.log("⏳ [API] Inserting into raw_pose_streams...");
            const mongoResult = await db.collection("raw_pose_streams").insertOne(mongoDoc);
            insertedMongoId = mongoResult.insertedId.toString();
            console.log(`✅ [API] MongoDB Inserted. ID: ${insertedMongoId}`);

        } catch (mongoErr: any) {
            console.error("❌ [API] MongoDB Failed:", mongoErr.message);
            return NextResponse.json({ error: "MongoDB Failed", reason: mongoErr.message }, { status: 500 });
        }

        // 4. Insert into PostgreSQL (UserRecap)
        try {
            console.log("⏳ [API] Connecting to PostgreSQL (Prisma)...");
            const prismaStartTime = Date.now();

            let safeMenuId = menuId;
            if (!safeMenuId || safeMenuId === "" || safeMenuId === "null" || safeMenuId === "undefined" || safeMenuId === "free-mode") {
                safeMenuId = null;
            }

            const newRecap = await prisma.userRecap.create({
                data: {
                    userId: String(userId),
                    menuId: safeMenuId ? String(safeMenuId) : null,
                    isCompleted: sessionSummary?.completed === true,
                    sessionDuration: sessionSummary?.session_duration || 0,
                    sessionSummary: {
                        llmOverallFeedback: sessionSummary?.llmOverallFeedback || null
                    },
                    mongodbId: insertedMongoId,
                    completedAt: new Date()
                }
            });

            console.log(`✅ [API] Postgres Inserted in ${Date.now() - prismaStartTime}ms. ID: ${newRecap.id}`);
            console.log(`🏁 [API] Request complete in ${Date.now() - startTime}ms`);

            return NextResponse.json({ success: true, recapId: newRecap.id, mongoId: insertedMongoId });

        } catch (prismaErr: any) {
            console.error("❌ [API] Prisma Failed:", prismaErr.message);
            return NextResponse.json({ error: "Prisma Schema Mismatch", reason: prismaErr.message }, { status: 500 });
        }

    } catch (error: any) {
        console.error("❌ [API] General Route Error:", error.message);
        return NextResponse.json({ error: "API Route Error", reason: error.message }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const userIdHeader = request.headers.get('x-user-id');
        const userId = userIdHeader || null;

        if (!userId) return NextResponse.json({ error: "Missing User ID" }, { status: 400 });

        let whereClause = {};

        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (user?.role === 'COACH') {
            const coachClients = await prisma.user.findMany({
                where: { coachId: userId },
                select: { id: true }
            });
            const clientIds = coachClients.map(c => c.id);
            whereClause = { userId: { in: clientIds } };
        } else if (user?.role === 'CLIENT') {
            whereClause = { userId: userId };
        }

        const recaps = await prisma.userRecap.findMany({
            where: whereClause,
            take: 50,
            include: {
                user: { select: { name: true, id: true } },
                menu: { select: { id: true, name: true } }
            },
            orderBy: { completedAt: 'desc' }
        });

        const client = await getMongoClient();
        const db = client.db("straps_sensor_data");

        const validMongoIds = recaps
            .map(s => s.mongodbId)
            .filter(id => id !== null && id !== undefined)
            .map(id => new ObjectId(id as string));

        // Fetch all needed fields from MongoDB: exercise, heart rate, gait, ROM
        const mongoDocs = await db.collection("raw_pose_streams")
            .find({ _id: { $in: validMongoIds } })
            .project({
                exercise_summary: 1,
                heart_rate_summary: 1,
                gait_summary: 1,
                rom_summary: 1,
                gait_data: 1,
                rom_data: 1
            })
            .toArray();

        const summaryMap: Record<string, any> = {};
        const hrSummaryMap: Record<string, any> = {};
        const gaitSummaryMap: Record<string, any> = {};
        const romSummaryMap: Record<string, any> = {};
        const gaitDataMap: Record<string, any> = {};
        const romDataMap: Record<string, any> = {};

        mongoDocs.forEach((doc: any) => {
            const id = doc._id.toString();
            summaryMap[id] = doc.exercise_summary || [];
            hrSummaryMap[id] = doc.heart_rate_summary || null;
            gaitSummaryMap[id] = doc.gait_summary || null;
            romSummaryMap[id] = doc.rom_summary || null;
            gaitDataMap[id] = doc.gait_data || null;
            romDataMap[id] = doc.rom_data || null;
        });

        const lightweightRecaps = recaps.map((recap: any) => ({
            ...recap,
            id: recap.id,
            created_at: recap.createdAt || recap.completedAt || new Date(),
            menuId: recap.menuId,
            sessionSummary: {
                ...(recap.sessionSummary as object || {}),
                completed: recap.isCompleted,
                session_duration: recap.sessionDuration
            },
            exerciseSummary: recap.mongodbId ? (summaryMap[recap.mongodbId] || []) : [],
            heartRateSummary: recap.mongodbId ? (hrSummaryMap[recap.mongodbId] || null) : null,
            gaitSummary: recap.mongodbId ? (gaitSummaryMap[recap.mongodbId] || null) : null,
            romSummary: recap.mongodbId ? (romSummaryMap[recap.mongodbId] || null) : null,
            gaitData: recap.mongodbId ? (gaitDataMap[recap.mongodbId] || null) : null,
            romData: recap.mongodbId ? (romDataMap[recap.mongodbId] || null) : null,
            exercise_data: []
        }));

        return NextResponse.json(lightweightRecaps);

    } catch (error: any) {
        console.error("❌ [API] GET History Error:", error.message);
        return NextResponse.json({ error: 'Failed to fetch recaps', details: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        const recap = await prisma.userRecap.findUnique({ where: { id } });

        if (!recap) {
            return NextResponse.json({ error: 'Recap not found' }, { status: 404 });
        }

        await prisma.userRecap.delete({ where: { id } });

        if (recap.mongodbId) {
            try {
                const client = await getMongoClient();
                const db = client.db("straps_sensor_data");
                await db.collection("raw_pose_streams").deleteOne({
                    _id: new ObjectId(recap.mongodbId)
                });
            } catch (mongoErr) { }
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("❌ [API] DELETE Error:", error.message);
        return NextResponse.json({ error: 'Failed to delete recap' }, { status: 500 });
    }
}