import { NextResponse } from 'next/server';
// ✅ FIXED: Using the working custom Prisma client!
import { PrismaClient } from '@/prisma/generated/client/client';

export async function POST(request: Request) {
    const prisma = new PrismaClient(); // ✅ Properly initialized

    try {
        const userIdHeader = request.headers.get('x-user-id');
        if (!userIdHeader) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { status, confidence, details } = body;

        const log = await prisma.activityLog.create({ 
            data: {
                userId: userIdHeader,      
                timeStamp: new Date(),     
                status: status || 'Unknown',
                confidence: String(confidence),
                details: details || {}
            }
        });

        await prisma.$disconnect();
        return NextResponse.json({ success: true, id: log.id });

    } catch (error: any) {
        // ✅ Super Debugger Added
        console.error("Log Error:", error);
        await prisma.$disconnect();
        return NextResponse.json({ error: 'Failed to log', details: error.message }, { status: 500 });
    }
}

export async function GET(request: Request) {
    const prisma = new PrismaClient(); // ✅ Properly initialized

    try {
        const userIdHeader = request.headers.get('x-user-id');
        if (!userIdHeader) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const logs = await prisma.activityLog.findMany({ 
            where: { userId: userIdHeader },              
            orderBy: { timeStamp: 'desc' },               
            take: 20
        });

        await prisma.$disconnect();
        return NextResponse.json({ logs });

    } catch (error: any) {
        // ✅ Super Debugger Added
        console.error("Fetch Logs Error:", error);
        await prisma.$disconnect();
        return NextResponse.json({ error: 'Failed to fetch', details: error.message }, { status: 500 });
    }
}