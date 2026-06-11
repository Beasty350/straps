import { NextResponse } from 'next/server';
// ✅ FIXED: Using the working custom Prisma client
import { PrismaClient } from '@/prisma/generated/client/client';

export async function POST(request: Request) {
    const prisma = new PrismaClient();
    
    try {
        const body = await request.json();
        const { coachId, clientId } = body;

        // 1. Validate inputs
        if (!coachId || !clientId) {
            await prisma.$disconnect();
            return NextResponse.json({ error: 'Coach ID and Client ID are required' }, { status: 400 });
        }

        // 2. Verify the client actually exists and is a CLIENT
        const targetClient = await prisma.user.findUnique({
            where: { id: clientId }
        });

        if (!targetClient) {
            await prisma.$disconnect();
            return NextResponse.json({ error: 'Client ID not found in the system' }, { status: 404 });
        }

        if (targetClient.role !== 'CLIENT') {
            await prisma.$disconnect();
            return NextResponse.json({ error: 'That ID belongs to a Coach, not a Client' }, { status: 400 });
        }

        // 3. Link the Client to the Coach
        const updatedClient = await prisma.user.update({
            where: { id: clientId },
            data: { coachId: coachId }
        });

        await prisma.$disconnect();
        return NextResponse.json({ success: true, client: updatedClient });

    } catch (error: any) {
        console.error("Link Client Error:", error);
        await prisma.$disconnect();
        return NextResponse.json({ error: 'Failed to link client', details: error.message }, { status: 500 });
    }
}