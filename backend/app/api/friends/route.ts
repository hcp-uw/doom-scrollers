import prisma from '@/lib/prisma';
import { verifySession } from '@/lib/session';
import { NextResponse } from 'next/server';

// Get current user's friends
export const GET = async () => {
  const session = await verifySession();

  if (!session.isAuth) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 400 });
  }

  const user = prisma.user.findFirst({
    where: {
      id: session.uid,
    },
    include: {
      friends: true,
    },
  });

  return NextResponse.json({ friends: user.friends });
};
