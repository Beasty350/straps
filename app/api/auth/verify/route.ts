import { NextResponse } from 'next/server';
import speakeasy from 'speakeasy';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@/prisma/generated/client/client';
import { resetSessions } from '@/lib/helper/reset-store'; // shared Map

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, token, resetToken } = await req.json();

    // Validate required fields
    if (!email || !token || !resetToken) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const session = resetSessions.get(email);
    if (!session || session.token !== resetToken || session.expiresAt < Date.now()) {
      return NextResponse.json({ error: "Reset session invalid or expired" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.totpSecret) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const verified = speakeasy.totp.verify({
      secret: user.totpSecret,
      encoding: 'base32',
      token,
      window: 1,
    });

    if (!verified) {
      return NextResponse.json({ error: "Invalid authenticator code" }, { status: 401 });
    }

    // Ensure JWT_SECRET is defined
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET is not defined in environment variables');
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // Generate a short-lived JWT that allows password reset (valid 5 minutes)
    const updateToken = jwt.sign({ email }, jwtSecret, { expiresIn: '5m' });
    
    // Clean up the reset session
    resetSessions.delete(email);

    return NextResponse.json({ updateToken });
  } catch (error) {
    console.error("TOTP verification error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}