import prisma from '@/lib/prisma';
import { createSession } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

type PostRequest = {
  username: string;
};

export const POST = async (req: NextRequest) => {
  const { username }: PostRequest = await req.json();

  const user = await prisma.user.create({
    data: {
      username,
    },
  });

  await createSession(user.id);

  return NextResponse.json({ user });
};
