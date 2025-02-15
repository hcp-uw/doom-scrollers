import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/session';
import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  const session = await verifySession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const playlist = await prisma.playlist.findUnique({
    where: { id: parseInt(id!) },
    include: {
      songs: {
        include: {
          genre: true,
        },
      },
      author: true,
    },
  });

  if (!playlist) {
    return NextResponse.json({ error: 'Playlist not found' }, { status: 404 });
  }

  if (playlist.authorId !== session.uid) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json(playlist);
};
