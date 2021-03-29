const app = require("./app");
const supertest = require("supertest");
const req = supertest(app);

describe('GET /api/items', () => {
  test('returns a json object', async done => {
    const res = await req.get('/api/items')
    expect(res.status).toBe(200);
    done();
  });
})
