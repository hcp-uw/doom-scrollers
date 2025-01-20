import prisma from '@/lib/prisma';
import { createSession } from '@/lib/session';
import { User } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

type PostRequest = {
  username: string;
};

type PostResponse = {
  success: boolean;
  user: User;
};

// Make sure to call Firebase auth in frontend after to ensure correct password
// This route only ensures that the user exists within our system, nothing else
export const POST = async (
  req: NextRequest
): Promise<NextResponse<PostResponse | { error: string }>> => {
  const { username }: PostRequest = await req.json();

  const existingUser = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (!existingUser) {
    return NextResponse.json({ error: "User doesn't exist" }, { status: 404 });
  }

  await createSession(existingUser.id);

  return NextResponse.json({ success: true, user: existingUser });
};
