import prisma from '@/lib/prisma';
import { verifySession } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

interface RetrieveFriendsRequest {
  id: number;
}

// Get a general user's friends
// Only allow if the current user is friends with them
export const GET = async (req: NextRequest) => {
  const { id }: RetrieveFriendsRequest = await req.json();

  const session = await verifySession();

  if (!session.isAuth) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 400 });
  }

  const friend = await prisma.user.findFirst({
    where: {
      id,
    },
    include: {
      friends: true,
    },
  });

  if (!friend) {
    return NextResponse.json(
      { error: 'Requested user not found' },
      { status: 404 }
    );
  }

  if (friend.friends.filter((val) => val.id == session.uid).length == 0) {
    return NextResponse.json(
      { error: "Not authorized to access the requested user's friends" },
      { status: 401 }
    );
  }

  return NextResponse.json({ friends: friend.friends });
};
