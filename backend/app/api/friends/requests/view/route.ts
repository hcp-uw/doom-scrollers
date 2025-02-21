import prisma from '@/lib/prisma';
import { verifySession } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

interface ViewRequest {
  ids: number[];
}

export const PUT = async (req: NextRequest) => {
  const { ids }: ViewRequest = await req.json();

  const session = await verifySession();

  if (!session.isAuth) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 400 });
  }

  await prisma.friendRequest.updateMany({
    where: {
      id: {
        in: ids,
      },
    },
    data: {
      read: true,
    },
  });

  return NextResponse.json({ success: true });
};
