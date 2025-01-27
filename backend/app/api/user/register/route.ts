import prisma from '@/lib/prisma';
import { createSession } from '@/lib/session';
import { ErrorResponse } from '@/lib/types';
import { User } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import argon2 from 'argon2';

type PostRequest = {
  username: string;
  password: string;
};

type PostResponse = {
  user: User;
};

const isValidPassword = (password: string) => {
  // Simple password validation
  return password.length >= 5;
};

export const POST = async (
  req: NextRequest
): Promise<NextResponse<PostResponse | ErrorResponse>> => {
  const { username, password }: PostRequest = await req.json();

  if (!isValidPassword(password)) {
    return NextResponse.json(
      { error: 'Password is too short' },
      { status: 400 }
    );
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const hashedPassword = await argon2.hash(password);

  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  await createSession(user.id);

  return NextResponse.json({ user });
};
