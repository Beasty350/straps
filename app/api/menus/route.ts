import { NextResponse } from 'next/server';
import { PrismaClient } from '@/prisma/generated/client/client';

export async function GET(request: Request) {
    const prisma = new PrismaClient(); 
    
    try {
        const userIdHeader = request.headers.get('x-user-id');
        const userId = userIdHeader || null;

        let whereClause = {};

        if (userId) {
            const user = await prisma.user.findUnique({ where: { id: userId } });
            
            if (user?.role === 'COACH') {
                whereClause = { authorId: userId };  
            } else if (user?.role === 'CLIENT') {
                if (user.coachId) {
                    whereClause = { authorId: user.coachId,
                        OR: [
                            { clientId: null },
                            { clientId: userId }
                        ] };
                } else {
                    whereClause = { authorId: "NO_COACH_ASSIGNED" };
                }
            }
        }

        const menus = await prisma.trainingMenu.findMany({ 
            where: whereClause,
            include: {
                author: {                             
                    select: { name: true, id: true }
                }
            },
            orderBy: { createdAt: 'desc' }           
        });

        await prisma.$disconnect();
        return NextResponse.json(menus);
        
    } catch (error: any) {
        console.error("GET Error:", error);
        await prisma.$disconnect();
        return NextResponse.json({ error: 'Failed to fetch menus', details: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const prisma = new PrismaClient(); 
    
    try {
        const userIdHeader = request.headers.get('x-user-id');
        const authorId = userIdHeader || null;

        if (!authorId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        
        // ✅ FIXED: Now grabbing 'name' along with the exercises
        const { name, exerciseList, exercises, clientId } = body; 
        const finalExercises = exerciseList || exercises || [];

        const newMenu = await prisma.trainingMenu.create({ 
            data: {
                name: name || "Custom Program", // ✅ Saves the name, defaults if blank
                authorId: authorId,    
                exerciseList: finalExercises,
                clientId: clientId || null 
            }
        });

        await prisma.$disconnect();
        return NextResponse.json(newMenu);
        
    } catch (error: any) {
        console.error("POST Error:", error);
        await prisma.$disconnect();
        return NextResponse.json({ error: 'Failed to create menu', details: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const prisma = new PrismaClient(); 

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        await prisma.trainingMenu.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete menu' }, { status: 500 });
    }
}