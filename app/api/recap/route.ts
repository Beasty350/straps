export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getMongoClient } from '@/lib/mongodb/mongodb';
import { PrismaClient } from '@/prisma/generated/client/client';
import { ObjectId } from 'mongodb';

// 🚨 CRITICAL FIX: Global Prisma Cache for Serverless
// This prevents Next.js from opening hundreds of connections and crashing with a 502 Bad Gateway.
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function POST(req: Request) {
    console.log("🟢 [API] /api/recap/session - POST Request started");
    const startTime = Date.now();

    try {
        console.log("⏳ [API] Parsing request body...");
        const body = await req.json();
        const { userId, menuId, summary, rawPoseData } = body;
        
        // Log the size of the payload to see if it's too big
        const payloadSizeMb = (JSON.stringify(body).length / (1024 * 1024)).toFixed(2);
        console.log(`✅ [API] Body parsed successfully. Size: ~${payloadSizeMb} MB`);

        if (parseFloat(payloadSizeMb) > 4.0) {
            console.warn("⚠️ WARNING: Payload size is dangerously close to serverless limits (4.5MB)!");
        }

        let insertedMongoId = null;

        // STEP 1: MONGODB
        try {
            console.log("⏳ [API] Connecting to MongoDB...");
            const mongoStartTime = Date.now();
            const client = await getMongoClient(); 
            const db = client.db("straps_sensor_data");
            console.log(`✅ [API] MongoDB Connected in ${Date.now() - mongoStartTime}ms`);
            
            console.log("⏳ [API] Inserting raw pose data...");
            const mongoResult = await db.collection("raw_pose_streams").insertOne({
                userId: String(userId),
                exercise_data: rawPoseData || [], 
                created_at: new Date()
            });
            
            insertedMongoId = mongoResult.insertedId.toString();
            console.log(`✅ [API] MongoDB Inserted. ID: ${insertedMongoId}`);
            
        } catch (mongoErr: any) {
            console.error("❌ [API] MongoDB Failed:", mongoErr.message);
            return NextResponse.json({ error: "MongoDB Failed", reason: mongoErr.message }, { status: 500 });
        }

        // STEP 2: POSTGRESQL
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
                    sessionSummary: summary || null, 
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
        console.error("❌ [API] General Route Error (Likely Payload Too Large):", error.message);
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

        const lightweightRecaps = recaps.map((recap: any) => ({
            ...recap,
            id: recap.id,
            created_at: recap.createdAt || recap.completedAt || new Date(),
            menuId: recap.menuId,
            sessionSummary: recap.sessionSummary // Contains basic reps/score info
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
            } catch (mongoErr) {}
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("❌ [API] DELETE Error:", error.message);
        return NextResponse.json({ error: 'Failed to delete recap' }, { status: 500 });
    }
}