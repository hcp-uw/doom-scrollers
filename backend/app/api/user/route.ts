import prisma from '@/lib/prisma';
import { verifySession } from '@/lib/session';
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
