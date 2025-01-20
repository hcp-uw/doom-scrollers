import { GET } from './route';

jest.mock('@/lib/session', () => ({
  verifySession: jest.fn(() => ({
    isAuth: false,
  })),
  deleteSession: jest.fn(() => {}),
}));

test('Logout fails for invalid session', async () => {
  const res = await GET();
  const data = await res.json();

  expect(data.error).toEqual('User not authenticated');
});
