import prisma from '@/lib/prisma';
import { verifySession } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

interface RemoveFriendRequest {
  friendId: number;
}

export const PUT = async (req: NextRequest) => {
  const { friendId }: RemoveFriendRequest = await req.json();

  const session = await verifySession();

  if (!session.isAuth) {
    return NextResponse.json({ error: 'Invalid session.' });
  }

  const friend = await prisma.user.findFirst({
    where: {
      id: friendId,
    },
  });

  if (!friend) {
    return NextResponse.json(
      { error: 'User to friend not found' },
      { status: 404 }
    );
  }

  const response = await prisma.user.update({
    where: {
      id: session.uid,
    },
    data: {
      friends: {
        disconnect: {
          id: friendId,
        },
      },
    },
    include: {
      friends: true,
    },
  });

  return NextResponse.json({ user: response });
};
