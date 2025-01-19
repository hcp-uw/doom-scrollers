import { DELETE } from './route';

jest.mock('@/lib/session', () => ({
  verifySession: jest.fn(() => ({
    isAuth: false,
  })),
  deleteSession: jest.fn(() => {}),
}));

test('Delete fails for an invalid session', async () => {
  const res = await DELETE();
  const data = await res.json();

  expect(res.status).toEqual(400);
  expect(data.error).toBe('Invalid session');
});
