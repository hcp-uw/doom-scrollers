import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const songs = await prisma.song.findMany({
    include: {
      likedBy: true,
      genre: true,
    },
  });

  return NextResponse.json(songs);
};
