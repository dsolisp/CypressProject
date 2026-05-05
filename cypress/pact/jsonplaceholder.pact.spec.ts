import { describe, expect, test } from 'vitest';
import axios from 'axios';
import { Pact } from '@pact-foundation/pact';

describe('Pact Consumer Contract (JSONPlaceholder) @pact', () => {
  test('GET /posts/1 returns a post', async () => {
    const provider = new Pact({
      consumer: 'CypressProject',
      provider: 'JSONPlaceholder',
      dir: 'pacts',
      logLevel: 'warn',
    });

    await provider.setup();

    await provider.addInteraction({
      state: 'a post with id 1 exists',
      uponReceiving: 'a request for post 1',
      withRequest: {
        method: 'GET',
        path: '/posts/1',
      },
      willRespondWith: {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: {
          userId: 1,
          id: 1,
          title: 'hello',
          body: 'world',
        },
      },
    });

    const base = provider.mockService.baseUrl?.replace(/\/$/, '') ?? '';
    const res = await axios.get(`${base}/posts/1`);
    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty('id', 1);

    await provider.verify();
    await provider.finalize();
  });
});
