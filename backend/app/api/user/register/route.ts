import prisma from '@/lib/prisma';
import { createSession } from '@/lib/session';
import { ErrorResponse } from '@/lib/types';
import { User } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

type PostRequest = {
  username: string;
};

type PostResponse = {
  user: User;
};

export const POST = async (
  req: NextRequest
): Promise<NextResponse<PostResponse | ErrorResponse>> => {
  const { username }: PostRequest = await req.json();

  const existingUser = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const user = await prisma.user.create({
    data: {
      username,
    },
  });

  await createSession(user.id);

  return NextResponse.json({ user });
};
