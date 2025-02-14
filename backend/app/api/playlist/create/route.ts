import prisma from '@/lib/prisma';
import { verifySession } from '@/lib/session';
import { ErrorResponse } from '@/lib/types';
import { Playlist } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface CreatePlaylistRequest {
  playlistName: string;
}

interface CreatePlaylistResponse {
  playlist: Playlist;
}

export const POST = async (
  req: NextRequest
): Promise<NextResponse<CreatePlaylistResponse | ErrorResponse>> => {
  const { playlistName }: CreatePlaylistRequest = await req.json();
  const session = await verifySession();

  if (!session.isAuth) {
    return NextResponse.json({
      error: 'Invalid session.',
    });
  }

  const playlist = await prisma.playlist.create({
    data: {
      name: playlistName,
      author: {
        connect: {
          id: session.uid!,
        },
      },
    },
    include: {
      songs: true,
    },
  });

  return NextResponse.json({ playlist });
};
