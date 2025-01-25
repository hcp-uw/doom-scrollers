import prisma from '@/lib/prisma';
import { verifySession } from '@/lib/session';
import { ErrorResponse } from '@/lib/types';
import { Genre } from '@prisma/client';
import { NextResponse } from 'next/server';

type GetResponse = {
  genres: Genre[];
};

export const GET = async (): Promise<
  NextResponse<GetResponse | ErrorResponse>
> => {
  const session = await verifySession();

  if (!session.isAuth) {
    return NextResponse.json({ error: 'Invalid session' });
  }

  const user = await prisma.user.findFirst({
    where: {
      id: session.uid,
    },
    include: {
      preferences: true,
    },
  });

  return NextResponse.json({ genres: user!.preferences });
};
