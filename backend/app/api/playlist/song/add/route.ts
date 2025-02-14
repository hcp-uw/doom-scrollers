import prisma from '@/lib/prisma';
import { verifySession } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

interface AddSongRequest {
  trackID: string;
  playlistId: number;
}

export const PUT = async (req: NextRequest) => {
  const { trackID, playlistId }: AddSongRequest = await req.json();

  const session = await verifySession();

  if (!session) {
    return NextResponse.json({ error: 'Invalid session.' });
  }

  const track = await prisma.song.findFirst({
    where: {
      trackID,
    },
  });

  if (!track) {
    return NextResponse.json({ error: "Track doesn't exist" }, { status: 404 });
  }

  await prisma.playlist.update({
    where: {
      id: playlistId,
    },
    data: {
      songs: {
        connect: {
          trackID,
        },
      },
    },
  });

  return NextResponse.json({ success: true });
};
