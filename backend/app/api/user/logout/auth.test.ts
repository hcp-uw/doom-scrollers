import { GET } from './route';

jest.mock('@/lib/session', () => ({
  verifySession: jest.fn(() => ({
    isAuth: true,
    uid: 3,
  })),
  deleteSession: jest.fn(() => {}),
}));

test('Logout succeeds for valid session', async () => {
  const res = await GET();
  const data = await res.json();

  expect(data.success).toBeTruthy();
});
