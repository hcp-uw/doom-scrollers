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

  if (!session.isAuth) {
    return NextResponse.json({ error: 'Invalid session' });
  }

  await prisma.song.upsert({
    where: {
      trackID,
    },
    create: {
      trackID,
    },
    update: {
      likedBy: {
        disconnect: {
          id: session.uid,
        },
      },
    },
  });

  return NextResponse.json({
    success: true,
  });
};
