import prisma from '@/lib/prisma';
import { verifySession } from '@/lib/session';
import { ErrorResponse } from '@/lib/types';
import { NextRequest, NextResponse } from 'next/server';

type PutRequest = {
  trackID: string;
};

type PutResponse = {
  success: boolean;
};

export const PUT = async (
  req: NextRequest
): Promise<NextResponse<PutResponse | ErrorResponse>> => {
  const { trackID }: PutRequest = await req.json();

  const session = await verifySession();

  // If invalid session, return 400 (bad request)
  if (!session.isAuth) {
    return NextResponse.json(
      {
        error: 'Invalid session',
      },
      { status: 400 }
    );
  }

  // Find song in database, create if doesn't exist
  await prisma.song.upsert({
    where: {
      trackID,
    },
    create: {
      trackID,
      likedBy: {
        connect: {
          id: session.uid,
        },
      },
    },
    update: {
      likedBy: {
        connect: {
          id: session.uid,
        },
      },
    },
  });

  return NextResponse.json({ success: true });
};
