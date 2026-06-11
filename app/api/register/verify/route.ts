// app/api/register/verify/route.ts
import { NextResponse } from 'next/server';
import speakeasy from 'speakeasy';
import { PrismaClient } from '@/prisma/generated/client/client';
import { pendingRegistrations } from '@/lib/helper/pending-store';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    let email: string;
    let token: string;
    try {
      const body = JSON.parse(rawBody);
      email = body.email;
      token = body.token;
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    if (!email || !token) {
      return NextResponse.json({ error: "Email and verification code are required" }, { status: 400 });
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

    // Create user – customId is omitted because it's not in the schema
    const user = await prisma.user.create({
      data: {
        id: pending.id,
        email: pending.email,
        password: pending.password,
        name: pending.name,
        role: pending.role,
        birthDate: pending.birthDate,   // ✅
        gender: pending.gender,
        totpSecret: pending.totpSecret,
        totpEnabled: true,
      },
    });

    pendingRegistrations.delete(email);
    return NextResponse.json({ success: true, userId: user.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}