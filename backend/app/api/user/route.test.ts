import { verifySession } from '@/lib/session';
import { prismaMock } from '@/__test__/singleton';
import { User } from '@prisma/client';
import { DELETE } from './route';

jest.mock('@/lib/session', () => ({
  verifySession: jest.fn(),
  deleteSession: jest.fn(),
}));

const mockVerifySession = verifySession as jest.Mock;

test('Delete succeeds if user is authenticated', async () => {
  mockVerifySession.mockResolvedValue({
    isAuth: true,
    uid: 1,
  });

  const temporaryUser: User = {
    id: 1,
    username: 'test',
    createdAt: new Date(),
    updatedAt: new Date(),
    password: 'test',
  };
  prismaMock.user.delete.mockResolvedValue(temporaryUser);

  const res = await DELETE();
  const data = await res.json();

  expect(data.success).toBe(true);
});

test('Delete fails for an invalid session', async () => {
  mockVerifySession.mockResolvedValue({
    isAuth: false,
  });

  const res = await DELETE();
  const data = await res.json();

  expect(res.status).toEqual(400);
  expect(data.error).toBe('Invalid session');
});
