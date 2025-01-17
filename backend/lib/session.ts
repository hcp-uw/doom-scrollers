import 'server-only';

import { JWTPayload, jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

const key = new TextEncoder().encode(process.env.SECRET);

const cookie = {
  name: 'session',
  duration: 24 * 60 * 60 * 1000,
};

export async function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1day')
    .sign(key);
}

export async function decrypt(session: string | Uint8Array) {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256'],
    });

    return payload;
  } catch {
    return null;
  }
}

export async function createSession(uid: number) {
  const expires = new Date(Date.now() + cookie.duration);
  const session = await encrypt({ uid, expires });

  (await cookies()).set('session', session, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  });
}

export async function verifySession() {
  const cookie = (await cookies()).get('session')?.value;

  const session = await decrypt(cookie as string | Uint8Array);

  if (!session?.uid) {
    return { isAuth: false };
  }

  return { isAuth: true, uid: Number(session.uid) };
}

export async function deleteSession() {
  (await cookies()).delete('session');
}
