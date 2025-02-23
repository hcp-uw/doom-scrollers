import prisma from '@/lib/prisma';
import { verifySession } from '@/lib/session';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const session = await verifySession();

  if (!session.isAuth) {
    return NextResponse.json({ error: 'Invalid session.' }, { status: 400 });
  }

  const user = await prisma.user.findFirst({
    where: {
      id: session.uid,
    },
    include: {
      friends: {
        include: {
          preferences: true,
          playlists: true,
          likedSongs: true,
        },
      },
    },
  });

  return NextResponse.json({ friends: user?.friends });
};
