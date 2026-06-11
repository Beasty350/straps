import { NextResponse } from 'next/server';
// ✅ FIXED: Using the working custom Prisma client!
import { PrismaClient } from '@/prisma/generated/client/client';

export async function GET(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    const prisma = new PrismaClient(); // ✅ Properly initialized

    try {
        const params = await props.params;
        const id = params.id;

        const user = await prisma.user.findUnique({ 
            where: { id: id }
            // ❌ REMOVED: `include: { coach: true }` 
            // We removed this to prevent the exact same crash that broke your Login earlier!
        });

        if (!user) {
            await prisma.$disconnect();
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        await prisma.$disconnect();
        return NextResponse.json(user);

    } catch (error: any) {
        console.error("User Detail Error:", error);
        await prisma.$disconnect();
        // ✅ Super Debugger Added
        return NextResponse.json({ error: 'Internal Error', details: error.message }, { status: 500 });
    }
}