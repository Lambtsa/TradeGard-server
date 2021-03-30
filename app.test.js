require('dotenv').config();
const mongoose = require("mongoose");
const app = require("./app");
const supertest = require("supertest");
const req = supertest(app);
const databaseName = "test";
const Item = require('./src/database/schemas/item'); 
const { populateDatabase } = require('./src/database/mock/mockItems.js');

/*
  Setup
*/
beforeAll(async () => {
  const uri = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_URL}/${databaseName}?retryWrites=true&w=majority`;
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
});

beforeEach(async () => {
  await populateDatabase();
})

afterEach(async () => {
  await Item.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

/*
  Tests
*/

describe('GET /api/items', () => {
  
  test('returns a 200 and a json', async done => {
    const res = await req.get("/api/items");
    expect(res.status).toBe(200);
    expect(res.type).toBe('application/json');
    done();
  });

  test('returns 3 items from mock data', async done => {
    const res = await req.get("/api/items");
    expect(res.body).toBeTruthy();
    expect(res.body).toHaveLength(3);
    done();
  });

  test('returns an array of items', async done => {
    const res = await req.get("/api/items");
    expect(res.body[0]).toHaveProperty('_id');
    expect(res.body[0]).toHaveProperty('itemTitle');
    expect(res.body[0]).toHaveProperty('itemDescription');
    expect(res.body[0]).toHaveProperty('itemImages');
    expect(res.body[0]).toHaveProperty('itemLikes');
    done();
  });

  test('returns items when a category is queried', async done => {
    const res = await req.get('/api/items?category=clothes');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty('itemTitle');
    expect(res.body[0]['itemDescription']).toBe('nice jacket');
    done();
  })
});

describe('POST /api/items', () => {
  const newItem = {
    "item": {
        "itemTitle": "random stuff",
        "itemDescription": "random description",
        "itemImages": ["random url"],
        "itemCategory": "furniture",
        "itemOwner": "Dave"
    }
  };

  test("returns a 201 when given a valid item", async done => {
    const res = await req
      .post("/api/items")
      .send(newItem);
    expect(res).toBeTruthy();
    expect(res.status).toBe(201);
    expect(res.type).toBe('application/json')
    done();
  });

  test("returns a 400 when given an invalid item", async done => {
    const res = await req
      .post("/api/items")
      .send('wrong item');
    expect(res).toBeTruthy();
    expect(res.status).toBe(400);
    done();
  });

  test("returns a json object", async done => {
    const res = await req
      .post("/api/items")
      .send(newItem);
    const addedItem = await Item.findOne({ itemTitle: "random stuff" });
    expect(addedItem).toBeTruthy();
    expect(addedItem.itemDescription).toEqual('random description');
    expect(addedItem.itemOwner).toStrictEqual('Dave');
    expect(addedItem.itemImages).toHaveLength(1);
    done();
  });
});

describe('GET /api/items/:id', () => {
  test('returns 404 when given the wrong id', async done => {
    const res = await req
      .get('/api/items/wrongId');
    expect(res).toBeTruthy();
    expect(res.status).toBe(404);
    done();
  });
});
