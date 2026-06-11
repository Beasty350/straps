import { NextResponse } from 'next/server';
import { PrismaClient } from '@/prisma/generated/client/client';
import { getMongoClient } from '@/lib/mongodb/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    const prisma = new PrismaClient(); 
    
    const { searchParams } = new URL(request.url);
    const fetchTelemetry = searchParams.get('telemetry') === 'true';

    try {
        const params = await props.params;
        const id = params.id; 

        if (!id) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        const recap: any = await prisma.userRecap.findUnique({ 
            where: { id: id },
            include: { menu: true }
        });

        if (!recap) {
            await prisma.$disconnect();
            return NextResponse.json({ error: 'Recap not found' }, { status: 404 });
        }

        // Re‑inject from the Prisma columns so the frontend detail page stays happy
        recap.sessionSummary = {
            ...(recap.sessionSummary || {}),
            completed: recap.isCompleted,
            session_duration: recap.sessionDuration 
        };

        // Initialise heart rate fields
        recap.heart_rate_summary = null;
        recap.heartRateSummary = null;
        recap.heart_rate_samples = [];

        if (recap.mongodbId) {
            try {
                const client = await getMongoClient();
                const db = client.db("straps_sensor_data");
                const objectId = new ObjectId(recap.mongodbId as string);

                // Build projection to always get heart_rate_summary, optionally samples
                const projection: any = { exercise_summary: 1, heart_rate_summary: 1 };
                if (fetchTelemetry) {
                    projection.exercise_data = 1;
                    projection.heart_rate_samples = 1;
                }

                const mongoData = await db.collection("raw_pose_streams").findOne(
                    { _id: objectId },
                    { projection }
                );

                if (mongoData) {
                    recap.exerciseSummary = mongoData.exercise_summary || [];
                    recap.heart_rate_summary = mongoData.heart_rate_summary || null;
                    recap.heartRateSummary = mongoData.heart_rate_summary || null; // camelCase alias
                    
                    if (fetchTelemetry) {
                        recap.exercise_data = mongoData.exercise_data || [];
                        recap.details = mongoData.exercise_data || [];
                        recap.heart_rate_samples = mongoData.heart_rate_samples || [];
                    } else {
                        recap.exercise_data = [];
                        recap.details = [];
                        // heart_rate_samples already empty above
                    }
                } else {
                    recap.exerciseSummary = [];
                    recap.exercise_data = [];
                }

            } catch (e) {
                console.error("MongoDB Fetch Error:", e);
                recap.exerciseSummary = [];
                recap.exercise_data = [];
                recap.heart_rate_summary = null;
                recap.heartRateSummary = null;
            }
        } else {
            recap.exerciseSummary = [];
            recap.exercise_data = [];
        }

        await prisma.$disconnect();
        return NextResponse.json(recap);

    } catch (error: any) {
        console.error("GET Recap Detail Error:", error);
        await prisma.$disconnect();
        return NextResponse.json({ error: 'Failed to fetch recap', details: error.message }, { status: 500 });
    }
}