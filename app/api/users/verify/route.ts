import { NextResponse } from 'next/server';
import speakeasy from 'speakeasy';
import { PrismaClient } from '@/prisma/generated/client/client';
import { pendingRegistrations } from '@/lib/helper/pending-store';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, token } = await req.json();

    if (!email || !token) {
      return NextResponse.json({ error: "Email and token are required" }, { status: 400 });
    }

    const pending = pendingRegistrations.get(email);
    if (!pending || pending.expiresAt < Date.now()) {
      return NextResponse.json({ error: "Registration session expired. Please start over." }, { status: 400 });
    }

    const verified = speakeasy.totp.verify({
      secret: pending.totpSecret,
      encoding: 'base32',
      token,
      window: 1,
    });

    if (!verified) {
      return NextResponse.json({ error: "Invalid authenticator code" }, { status: 400 });
    }

    // Create user – using the user‑provided ID as the primary key
    const user = await prisma.user.create({
      data: {
        id: pending.id,               // custom ID becomes the primary key
        email: pending.email,
        password: pending.password,
        name: pending.name,
        role: pending.role,
        totpSecret: pending.totpSecret,
        totpEnabled: true,
        birthDate: pending.birthDate,  // ✅ store the birth date
        gender: pending.gender || null,
      },
    });

    // Clean up pending registration
    pendingRegistrations.delete(email);

    return NextResponse.json({ success: true, userId: user.id });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}