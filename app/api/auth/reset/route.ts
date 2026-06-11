import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@/prisma/generated/client/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { updateToken, newPassword } = await req.json();

  // Ensure JWT_SECRET is defined
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error('JWT_SECRET is not defined in environment variables');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  try {
    const { email } = jwt.verify(updateToken, jwtSecret) as { email: string };
    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: { email }, data: { password: hashed } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid or expired reset token" }, { status: 400 });
  } finally {
    await prisma.$disconnect();
  }
}