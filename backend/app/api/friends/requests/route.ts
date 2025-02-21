import prisma from '@/lib/prisma';
import { verifySession } from '@/lib/session';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const session = await verifySession();

  if (!session.isAuth) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 400 });
  }

  const friendRequests = await prisma.friendRequest.findMany({
    where: {
      to: {
        id: session.uid,
      },
    },
    include: {
      from: true,
    },
  });

  return NextResponse.json({ friendRequests });
};
