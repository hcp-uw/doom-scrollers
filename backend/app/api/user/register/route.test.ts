import { prismaMock } from '@/__test__/singleton';
import { User } from '@prisma/client';
import { POST } from './route';
import { generateMockRequest } from '@/__test__/utils';
import { NextRequest } from 'next/server';

test('Register route returns intended user', async () => {
  const temporaryUser: User = {
    id: 1,
    username: 'test',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

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
