import { NextResponse } from 'next/server';
import { PrismaClient } from '@/prisma/generated/client/client';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const prisma = new PrismaClient(); 

  try {
    const body = await req.json();
    
    // ✅ Expect birthDate instead of age
    let { name, email, password, role, birthDate, gender, id } = body;

    if (!id || id.trim() === '') {
        await prisma.$disconnect();
        return NextResponse.json({ error: "Unique ID is mandatory." }, { status: 400 });
    }
    
    const finalId = id.trim().toUpperCase();

    const alphanumericRegex = /^[A-Z0-9]+$/;
    if (!alphanumericRegex.test(finalId)) {
        await prisma.$disconnect();
        return NextResponse.json({ error: "Unique ID can only contain letters and numbers." }, { status: 400 });
    }

    let existingUser = await prisma.user.findFirst({
      where: {
        OR: [
            { email: email }, 
            { id: finalId } 
        ]
      }
    });

    if (existingUser) {
       if (existingUser.email === email) {
           await prisma.$disconnect();
           return NextResponse.json({ error: "Email is already in use." }, { status: 400 });
       }
       if (existingUser.id === finalId) {
           await prisma.$disconnect();
           return NextResponse.json({ error: "That ID is already in use. Please choose another." }, { status: 400 });
       }
    }

    // ✅ Parse birthDate
    let parsedBirthDate = null;
    if (birthDate) {
      parsedBirthDate = new Date(birthDate);
      if (isNaN(parsedBirthDate.getTime())) {
        await prisma.$disconnect();
        return NextResponse.json({ error: "Invalid birth date format. Use YYYY-MM-DD." }, { status: 400 });
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        id: finalId,
        email,
        password: hashedPassword,
        name,
        role,
        birthDate: parsedBirthDate,   // ✅ store birthDate
        gender: gender || null,
      }
    });

    const { password: _, ...safeUser } = newUser;
    
    await prisma.$disconnect();
    return NextResponse.json(safeUser, { status: 201 });

  } catch (error: any) {
    console.error("Registration Error:", error);
    await prisma.$disconnect();
    return NextResponse.json({ error: "Failed to create account", details: error.message }, { status: 500 });
  }
}