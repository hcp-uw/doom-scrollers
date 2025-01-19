import { prismaMock } from '@/__test__/singleton';
import { User } from '@prisma/client';
import { POST } from './route';
import { generateMockRequest } from '@/__test__/utils';
import { NextRequest } from 'next/server';

jest.mock('@/lib/session', () => ({
  createSession: jest.fn(async (x: number) => x),
}));

test('Register route returns intended user', async () => {
  const temporaryUser: User = {
    id: 1,
    username: 'test',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  prismaMock.user.findFirst.mockResolvedValue(null);
  prismaMock.user.create.mockResolvedValue(temporaryUser);

  const req = generateMockRequest(temporaryUser);
  const res = await POST(req as NextRequest);
  const data = await res.json();

  const expected = {
    ...temporaryUser,
    updatedAt: temporaryUser.updatedAt.toISOString(),
    createdAt: temporaryUser.createdAt.toISOString(),
  };

  expect(data.user).toEqual(expected);
});

test('Registration fails if user exists', async () => {
  const temporaryUser: User = {
    id: 1,
    username: 'test',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  prismaMock.user.findFirst.mockResolvedValue(temporaryUser);

  const req = generateMockRequest({ username: 'test' });
  const res = await POST(req as NextRequest);
  const data = await res.json();

  expect(res.status).toEqual(400);
  expect(data.error).toEqual('User already exists');
});
