import { verifySession } from '@/lib/session';
import { GET } from './route';

jest.mock('@/lib/session', () => ({
  verifySession: jest.fn(),
  deleteSession: jest.fn(),
}));

const mockVerifySession = verifySession as jest.Mock;

test('Logout succeeds for valid session', async () => {
  mockVerifySession.mockResolvedValue({
    isAuth: true,
    uid: 2,
  });

  const res = await GET();
  const data = await res.json();

  expect(data.success).toBeTruthy();
});

test('Logout fails for invalid session', async () => {
  mockVerifySession.mockResolvedValue({
    isAuth: false,
  });
  const res = await GET();
  const data = await res.json();

  expect(data.error).toEqual('User not authenticated');
});
