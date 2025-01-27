import { prismaMock } from '@/__test__/singleton';
import { User } from '@prisma/client';
import { POST } from './route';
import { generateMockRequest } from '@/__test__/utils';
import { NextRequest } from 'next/server';
import argon2 from 'argon2';

jest.mock('@/lib/session', () => ({
  createSession: jest.fn(async (x: number) => x),
}));

test('Login succeeds for existing user', async () => {
  const password = 'password';
  const hashedPassword = await argon2.hash(password);

  const temporaryUser: User = {
    id: 1,
    username: 'test',
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  prismaMock.user.findFirst.mockResolvedValue(temporaryUser);

  const req = generateMockRequest({
    username: temporaryUser.username,
    password,
  });
  const res = await POST(req as NextRequest);
  const data = await res.json();

  const expected = {
    ...temporaryUser,
    updatedAt: temporaryUser.updatedAt.toISOString(),
    createdAt: temporaryUser.createdAt.toISOString(),
  };

  expect(data.user).toEqual(expected);
  expect(data.success).toBeTruthy();
});

test('Login fails if user does not exist', async () => {
  prismaMock.user.findFirst.mockResolvedValue(null);

  const req = generateMockRequest({ username: 'test', password: 'password' });
  const res = await POST(req as NextRequest);
  const data = await res.json();

  expect(res.status).toEqual(404);
  expect(data.error).toEqual("User doesn't exist");
});

test('Login fails if password is incorrect', async () => {
  const password = 'password';
  const hashedPassword = await argon2.hash(password);

  const temporaryUser: User = {
    id: 1,
    username: 'test',
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  prismaMock.user.findFirst.mockResolvedValue(temporaryUser);

  const req = generateMockRequest({
    username: temporaryUser.username,
    password: 'incorrect password',
  });
  const res = await POST(req as NextRequest);
  const data = await res.json();

  expect(res.status).toEqual(400);
  expect(data.error).toEqual('Incorrect password');
});
