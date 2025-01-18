import prisma from '@/lib/prisma';
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

  return NextResponse.json({ user });
};
