import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const genres = await prisma.genre.findMany();

  return NextResponse.json({ genres });
};
