import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async () => {
  const genres = await prisma.genre.findMany();

  return NextResponse.json({ genres });
};

export const DELETE = async (req: NextRequest) => {
  const { genreName } = await req.json();

  const genre = await prisma.genre.delete({
    where: {
      value: genreName,
    },
  });

  return NextResponse.json({ genre });
};
