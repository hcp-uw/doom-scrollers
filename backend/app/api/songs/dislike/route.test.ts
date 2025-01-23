import { prismaMock } from '@/__test__/singleton';
import { generateMockRequest } from '@/__test__/utils';
import { PUT } from './route';
import { NextRequest } from 'next/server';
import { verifySession } from '@/lib/session';

jest.mock('@/lib/session', () => ({
  verifySession: jest.fn(),
}));

const mockVerifySession = verifySession as jest.Mock;

test("Liked songs fails if session isn't valid", async () => {
  mockVerifySession.mockResolvedValue({
    isAuth: false,
  });

  prismaMock.song.upsert.mockResolvedValue({ id: 1, trackID: 'test' });

  const req = generateMockRequest({
    trackId: 'test',
  });

  const response = await PUT(req as NextRequest);
  const data = await response.json();

  expect(data.error).toEqual('Invalid session');
});

test('Liked songs succeeds for valid session', async () => {
  mockVerifySession.mockResolvedValue({
    isAuth: true,
    uid: 2,
  });

  prismaMock.song.upsert.mockResolvedValue({ id: 1, trackID: 'test' });

  const req = generateMockRequest({
    trackId: 'test',
  });

  const response = await PUT(req as NextRequest);
  const data = await response.json();

  expect(data.success).toEqual(true);
});
