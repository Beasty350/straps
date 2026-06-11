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

        if (!id) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        const menu = await prisma.trainingMenu.findUnique({ 
            where: { id: id }
        });

        if (!menu) {
            await prisma.$disconnect();
            return NextResponse.json({ error: 'Menu not found' }, { status: 404 });
        }

        await prisma.$disconnect();
        return NextResponse.json(menu);
        
    } catch (error: any) {
        console.error("GET Menu Detail Error:", error);
        await prisma.$disconnect();
        // ✅ Super Debugger Added
        return NextResponse.json({ error: 'Failed to fetch menu', details: error.message }, { status: 500 });
    }
}