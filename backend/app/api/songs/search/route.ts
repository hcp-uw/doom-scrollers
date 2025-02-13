import prisma from '@/lib/prisma';
import { Song } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface SearchSongResponse {
  songs: Song[];
}

export const GET = async (
  req: NextRequest
): Promise<NextResponse<SearchSongResponse>> => {
  const searchParams = new URL(req.url).searchParams;
  const query = searchParams.get('q') ?? '';

  const matches = await prisma.song.findMany({
    where: {
      genre: {
        value: {
          contains: query,
        },
      },
    },
  });

  return NextResponse.json({
    songs: matches,
  });
};
