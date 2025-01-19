import { prismaMock } from '@/__test__/singleton';
import { User } from '@prisma/client';
import { DELETE } from './route';

jest.mock('@/lib/session', () => ({
  verifySession: jest.fn(() => ({
    isAuth: true,
    uid: 2,
  })),
  deleteSession: jest.fn(() => {}),
}));

test('Delete succeeds if user is authenticated', async () => {
  const temporaryUser: User = {
    id: 1,
    username: 'test',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  prismaMock.user.delete.mockResolvedValue(temporaryUser);

  const res = await DELETE();
  const data = await res.json();

  expect(data.success).toBe(true);
});
