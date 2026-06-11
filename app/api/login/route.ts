import { NextResponse } from 'next/server';
import { PrismaClient } from '@/prisma/generated/client/client';
import bcrypt from 'bcryptjs'; 

export async function POST(req: Request) {
  const prisma = new PrismaClient();

  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // 1. Find the user by email
    const user = await prisma.user.findUnique({ 
      where: { email: email }
    });

    // 2. 🐛 THE BUG FIX: Also check if user.password is null!
    // If they don't exist, OR if their account has no password set, reject them.
    if (!user || !user.password) {
      await prisma.$disconnect();
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // 🚀 Now TypeScript knows user.password is definitely a string!
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      await prisma.$disconnect();
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // 3. Remove the password from the object before sending to the frontend for security
    const { password: _, ...safeUser } = user;
    
    await prisma.$disconnect();
    return NextResponse.json(safeUser, { status: 200 });

  } catch (error: any) {
    console.error("Login Route Error:", error);
    await prisma.$disconnect();
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}