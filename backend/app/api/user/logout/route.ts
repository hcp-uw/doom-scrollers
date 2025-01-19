import { deleteSession, verifySession } from '@/lib/session';
import { NextResponse } from 'next/server';

type GetResponse = {
  success: boolean;
};

export const GET = async (): Promise<
  NextResponse<GetResponse | { error: string }>
> => {
  const currentSession = await verifySession();

  if (!currentSession.isAuth) {
    return NextResponse.json({ error: 'User not authenticated' });
  }

  await deleteSession();

  return NextResponse.json({ success: true });
};
