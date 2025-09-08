const request = require('supertest');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'src', 'data', 'test.sqlite');

process.env.DB_FILE = DB_PATH;

const { initDb, getDb } = require('../src/shared/db');
let app;

beforeAll(async () => {
  if (fs.existsSync(DB_PATH)) fs.unlinkSync(DB_PATH);
  await initDb();
  app = require('../src/server');
});

afterAll(async () => {
  const db = getDb();
  await db.close();
});

test('can create entry and prevent duplicate email in same month', async () => {
  const res1 = await request(app).post('/api/lottery/entries').send({ name: 'Alice', email: 'a@example.com' });
  expect(res1.status).toBe(201);
  const res2 = await request(app).post('/api/lottery/entries').send({ name: 'Alice2', email: 'a@example.com' });
  expect(400).toBe(res2.status);
});

test('draw returns 404 when no participants in month', async () => {
  // use a far future date to ensure no entries
  const res = await request(app).post('/api/lottery/draw').send({ at: '2100-01-01T00:00:00.000Z' });
  expect(res.status).toBe(404);
});

test('draw picks a winner when participants exist', async () => {
  // create an entry with current timestamp
  const res1 = await request(app).post('/api/lottery/entries').send({ name: 'Bob', email: 'b@example.com' });
  expect(res1.status).toBe(201);
  const draw = await request(app).post('/api/lottery/draw').send({});
  expect(draw.status).toBe(200);
  expect(draw.body.email).toBeDefined();
});
