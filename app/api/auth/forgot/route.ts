import { NextResponse } from 'next/server';
import { PrismaClient } from '@/prisma/generated/client/client';
import { resetSessions } from '@/lib/helper/reset-store';

const prisma = new PrismaClient();
 // email -> { token, expiresAt }

export async function POST(req: Request) {
  const { email } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.totpEnabled) {
    // Don't reveal whether email exists – security best practice
    return NextResponse.json({ message: "If the email exists and has 2FA enabled, you will be prompted for a code." });
  }

  // Generate a one-time reset token (stored, not sent to email)
  const resetToken = crypto.randomUUID();
  resetSessions.set(email, {
    token: resetToken,
    expiresAt: Date.now() + 15 * 60 * 1000, // 15 minutes
  });

  return NextResponse.json({ resetToken, requiresTOTP: true });
}