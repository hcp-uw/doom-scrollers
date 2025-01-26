import prisma from '@/lib/prisma';
import { verifySession } from '@/lib/session';
import { ErrorResponse } from '@/lib/types';
import { Genre } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

type PutRequest = {
  genreName: string;
};

type PutResponse = {
  genre: Genre;
};

export const PUT = async (
  req: NextRequest
): Promise<NextResponse<PutResponse | ErrorResponse>> => {
  const { genreName }: PutRequest = await req.json();

  const session = await verifySession();

  if (!session.isAuth) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 400 });
  }

  const genre = await prisma.genre.upsert({
    where: {
      value: genreName,
    },
    create: {
      value: genreName,
    },
    update: {
      users: {
        disconnect: {
          id: session.uid,
        },
      },
    },
  });

  return NextResponse.json({ genre });
};
