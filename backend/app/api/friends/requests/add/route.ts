import prisma from '@/lib/prisma';
import { verifySession } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

interface AddFriendRequest {
  to: number;
}

export const POST = async (req: NextRequest) => {
  const { to }: AddFriendRequest = await req.json();

  const session = await verifySession();

  if (!session.isAuth) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 400 });
  }

  const result = await prisma.friendRequest.create({
    data: {
      from: {
        connect: {
          id: session.uid!,
        },
      },
      to: {
        connect: {
          id: to,
        },
      },
      read: false,
    },
  });

  return NextResponse.json({ result });
};
