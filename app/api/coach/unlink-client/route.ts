import { NextResponse } from 'next/server';
import { PrismaClient } from '@/prisma/generated/client/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function POST(request: Request) {
    try {
        const { clientId } = await request.json();

        if (!clientId) {
            return NextResponse.json({ error: 'Missing clientId' }, { status: 400 });
        }

        // Get the client's current coachId
        const client = await prisma.user.findUnique({
            where: { id: clientId },
            select: { coachId: true }
        });

        if (!client) {
            return NextResponse.json({ error: 'Client not found' }, { status: 404 });
        }

        if (!client.coachId) {
            return NextResponse.json({ error: 'Client has no linked coach' }, { status: 400 });
        }

        // Unlink
        await prisma.user.update({
            where: { id: clientId },
            data: { coachId: null }
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Unlink error:', error);
        return NextResponse.json(
            { error: 'Failed to unlink client', details: error.message },
            { status: 500 }
        );
    }
}