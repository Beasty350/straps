import { NextResponse } from 'next/server';
// ✅ FIXED: Using the working custom Prisma client!
import { PrismaClient } from '@/prisma/generated/client/client';

export async function GET(request: Request) {
    const prisma = new PrismaClient(); // ✅ Properly initialized

    try {
        const { searchParams } = new URL(request.url);
        const coachId = searchParams.get('coachId');

        let whereClause = {};

        if (coachId) {
            whereClause = { coachId: coachId }; 
        } else {
            await prisma.$disconnect();
            return NextResponse.json([]);
        }

        const users = await prisma.user.findMany({ 
            where: whereClause,
            orderBy: { name: 'asc' }
        });

        await prisma.$disconnect();
        return NextResponse.json(users);

    } catch (error: any) {
        console.error("GET Users Error:", error);
        await prisma.$disconnect();
        // ✅ Super Debugger Added
        return NextResponse.json({ error: 'Failed to fetch users', details: error.message }, { status: 500 });
    }
}