import { verifySession } from '@/lib/session';
import { ErrorResponse } from '@/lib/types';
import { Song } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getRandomSegment } from '@/lib/misc';

type GetResponse = {
  songs: Song[];
};

export const GET = async (
  req: NextRequest
): Promise<NextResponse<GetResponse | ErrorResponse>> => {
  const session = await verifySession();

  const searchParams = new URL(req.url).searchParams;
  const size = searchParams.get('size');

  if (!size) {
    return NextResponse.json({ error: 'Size is required' }, { status: 400 });
  }

  if (!session.isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.uid,
    },
    include: {
      preferences: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const songs = await prisma.song.findMany({
    where: {
      seenBy: {
        none: {
          id: session.uid,
        },
      },
      genre: {
        value: {
          in: user.preferences.map((preference) => preference.value),
        },
      },
    },
    include: {
      genre: true,
      seenBy: true,
    },
  });

  console.log('Songs found:', songs.length);

  return NextResponse.json({
    songs: getRandomSegment(songs, parseInt(size)),
  });
};
