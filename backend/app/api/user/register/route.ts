import prisma from '@/lib/prisma';
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
): Promise<NextResponse<PostResponse>> => {
  const { username }: PostRequest = await req.json();

  const user = await prisma.user.create({
    data: {
      username,
    },
  });

  return NextResponse.json({ user });
};
