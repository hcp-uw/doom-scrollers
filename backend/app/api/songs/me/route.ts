import { verifySession } from '@/lib/session';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const GET = async () => {
  const session = await verifySession();

  if (!session.isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.uid,
    },
    include: {
      likedSongs: true,
    },
  });

  return NextResponse.json({
    likedSongs: user?.likedSongs,
  });
};
