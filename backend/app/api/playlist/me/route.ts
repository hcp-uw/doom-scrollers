import prisma from '@/lib/prisma';
import { verifySession } from '@/lib/session';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const session = await verifySession();

  if (!session.isAuth) {
    return NextResponse.json({ error: 'Invalid session.' });
  }

  const playlists = await prisma.playlist.findMany({
    where: {
      authorId: session.uid!,
    },
  });

  return NextResponse.json({ playlists });
};
