import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { createApp } from '../../src/app';
import supertest from 'supertest';
import { connectDB } from '../../src/config/db';
import { BalanceRecord } from '../../src/models/BalanceRecord';

let mongod: MongoMemoryServer;
let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  await connectDB(mongod.getUri());
  const app = await createApp();
  request = supertest(app);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe('GraphQL Integration', () => {
  it('inserts and retrieves a balance record end-to-end', async () => {
    await BalanceRecord.create({
      datetime: new Date('2020-01-01T00:00:00Z'),
      groupId: 'G',
      type: 'T',
      value: 100,
      percentage: 1
    });

    const res = await request.post('/graphql').send({
      query: 'query { balanceByDateRange(start: "2020-01-01", end: "2020-01-02") { groupId type value percentage } }'
    });

    expect(res.status).toBe(200);
    expect(res.body.data.balanceByDateRange).toEqual([
      { groupId: 'G', type: 'T', value: 100, percentage: 1 }
    ]);
  });
});
