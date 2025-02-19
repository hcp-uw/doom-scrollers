import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q') ?? '';

  const results = await prisma.user.findMany({
    where: {
      username: {
        contains: query,
      },
    },
  });

  return NextResponse.json({
    results,
  });
};
