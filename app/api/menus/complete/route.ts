import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const { menuId, userId } = await request.json();
        // Add userId to a completedBy array — simplest approach: 
        // store completed sessions in UserRecap which already exists,
        // so just filter in fetchMenu instead
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}