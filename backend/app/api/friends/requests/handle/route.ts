import prisma from '@/lib/prisma';
import { verifySession } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

interface AcceptFriendRequest {
  id: number;
}

// Accept friend request
export const PUT = async (req: NextRequest) => {
  const { id }: AcceptFriendRequest = await req.json();
  const session = await verifySession();

  if (!session.isAuth) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 400 });
  }

  const friendRequest = await prisma.friendRequest.findFirst({
    where: { id },
  });

  if (friendRequest!.toUserId !== session!.uid) {
    return NextResponse.json(
      { error: "Attempting to accept friend request that isn't for you" },
      { status: 400 }
    );
  }

  await prisma.user.update({
    where: {
      id: session.uid,
    },
    data: {
      friends: {
        connect: {
          id: friendRequest!.fromUserId,
        },
      },
    },
  });

  await prisma.friendRequest.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({ success: true });
};

interface DeclineFriendRequest {
  id: number;
}

// Decline friend request
export const DELETE = async (req: NextRequest) => {
  const { id }: DeclineFriendRequest = await req.json();
  const session = await verifySession();

  if (!session.isAuth) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 400 });
  }

  const request = await prisma.friendRequest.findFirst({
    where: {
      id,
    },
  });

  if (request!.toUserId !== session.uid!) {
    return NextResponse.json(
      { error: "Attempting to delete friend request that isn't for you" },
      { status: 400 }
    );
  }

  await prisma.friendRequest.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({ success: true });
};
