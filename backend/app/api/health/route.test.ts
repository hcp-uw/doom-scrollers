import { GET } from './route';

test('Health check always returns success', async () => {
  const response = await GET();
  const body = await response.json();

  expect(body.ok).toEqual(true);
});
