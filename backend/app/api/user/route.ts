import prisma from '@/lib/prisma';
import { deleteSession, verifySession } from '@/lib/session';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const session = await verifySession();

  if (!session.isAuth) {
    return NextResponse.json({
      isAuth: false,
    });
  }

  // Hydrate user data if authenticated
  const user = await prisma.user.findFirst({
    where: {
      id: session.uid,
    },
    // Performing a join in Prisma
    include: {
      likedSongs: true,
      preferences: true,
    },
  });

  return NextResponse.json({
    ...session,
    user,
  });
};

type DeleteResponse = {
  success: true;
};

export const DELETE = async (): Promise<
  NextResponse<DeleteResponse | { error: string }>
> => {
  const session = await verifySession();

  if (!session.isAuth) {
    return NextResponse.json(
      {
        error: 'Invalid session',
      },
      { status: 400 }
    );
  }

  await deleteSession();

  await prisma.user.delete({
    where: {
      id: session.uid,
    },
  });

  return NextResponse.json({ success: true });
};
