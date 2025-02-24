import prisma from '@/lib/prisma';
import { deleteSession, verifySession } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';
import argon2 from 'argon2';

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
      friends: true,
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

type PutRequest = {
  username: string | undefined;
  oldPassword: string | undefined;
  newPassword: string | undefined;
};

export const PUT = async (req: NextRequest) => {
  const session = await verifySession();

  if (!session.isAuth) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 400 });
  }

  const { username, oldPassword, newPassword }: PutRequest = await req.json();

  const user = await prisma.user.findFirst({
    where: {
      id: session.uid,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updatedData: any = {};

  if (username) {
    updatedData['username'] = username;
  }

  if (oldPassword && newPassword) {
    const isVerified = await argon2.verify(user!.password, oldPassword);

    if (!isVerified) {
      return NextResponse.json(
        { error: 'Incorrect password' },
        { status: 400 }
      );
    }

    updatedData['password'] = await argon2.hash(newPassword);
  }

  const newUser = await prisma.user.update({
    where: {
      id: session.uid,
    },
    data: updatedData,
  });

  return NextResponse.json({ success: true, user: newUser });
};
