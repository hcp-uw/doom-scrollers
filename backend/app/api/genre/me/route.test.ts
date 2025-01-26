import { verifySession } from '@/lib/session';
import { GET } from './route';
import { prismaMock } from '@/__test__/singleton';

jest.mock('@/lib/session', () => ({
  verifySession: jest.fn(),
}));

const mockVerifySession = verifySession as jest.Mock;

test("Preference retrieval fails if session isn't authenticated", async () => {
  mockVerifySession.mockResolvedValue({ isAuth: false });

  const res = await GET();
  const data = await res.json();

  expect(data.error).toEqual('Invalid session');
});

test('Preference retrieval succeeds for valid session and returns appropriately', async () => {
  mockVerifySession.mockResolvedValue({ isAuth: true, uid: 2 });

  prismaMock.user.findFirst.mockResolvedValue({
    id: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    preferences: ['genre 1'],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);

  const expectedGenres = ['genre 1'];

  const res = await GET();
  const data = await res.json();

  expect(data.genres).toEqual(expectedGenres);
});
