import { NextResponse } from 'next/server';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@/prisma/generated/client/client';
import { pendingRegistrations } from '@/lib/helper/pending-store';
import { checkRateLimit } from '@/lib/helper/rate-limit';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  // 1. Rate limiting by IP address
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
  const rateKey = `register:init:${ip}`;
  const { success, remaining, reset } = checkRateLimit(rateKey, 5, 60); // 5 attempts per minute

  if (!success) {
    return NextResponse.json(
      { error: `Too many attempts. Please try again in ${Math.ceil((reset - Date.now()) / 1000)} seconds.` },
      { status: 429 }
    );
  }

  try {
    const { email, password, name, role, customId, birthDate, gender } = await req.json();

    // Validate required fields
    if (!email || !password || !name || !role || !customId) {
      return NextResponse.json(
        { error: "Missing required fields: email, password, name, role, and customId are required." },
        { status: 400 }
      );
    }

    // Validate birthDate format (optional but recommended)
    let parsedBirthDate = null;
    if (birthDate) {
      parsedBirthDate = new Date(birthDate);
      if (isNaN(parsedBirthDate.getTime())) {
        return NextResponse.json({ error: "Invalid birth date format. Use YYYY-MM-DD." }, { status: 400 });
      }
      // Optional: ensure user is at least 13 years old
      const age = new Date().getFullYear() - parsedBirthDate.getFullYear();
      if (age < 13) {
        return NextResponse.json({ error: "You must be at least 13 years old to register." }, { status: 400 });
      }
    }

    // Check if custom ID is already taken
    const existingById = await prisma.user.findUnique({ where: { id: customId } });
    if (existingById) {
      return NextResponse.json({ error: "This ID is already taken. Please choose another." }, { status: 409 });
    }

    // Check if email already exists
    const existingByEmail = await prisma.user.findUnique({ where: { email } });
    if (existingByEmail) {
      return NextResponse.json({ error: "Email already registered." }, { status: 409 });
    }

    // Generate TOTP secret
    const secret = speakeasy.generateSecret({ name: `STRAPS:${email}` });
    const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url!);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store pending data (expires in 10 minutes)
    pendingRegistrations.set(email, {
      id: customId,                     // becomes the primary key
      email,
      password: hashedPassword,
      name,
      role,
      birthDate: parsedBirthDate,       // store as Date object (or ISO string)
      gender: gender || null,
      totpSecret: secret.base32,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    return NextResponse.json({ qrCodeUrl, secret: secret.base32 });
  } catch (error) {
    console.error("Registration init error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}