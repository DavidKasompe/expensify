import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
    }

    const passwordHash = await hash(password, 10);

    const user = await db.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: 'FIELD_OFFICER', // Default role for new signups
      },
    });

    await db.auditLog.create({
      data: {
        userId: user.id,
        action: 'USER_CREATED',
        entityType: 'User',
        entityId: user.id,
      },
    });

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
