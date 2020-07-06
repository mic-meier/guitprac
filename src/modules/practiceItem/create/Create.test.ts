import mongoose from 'mongoose';
import faker from 'faker';

import User from '../../../models/user';
// import PracticeItem from '../../../models/practice_item';
import { gCall } from '../../../test-utils/gCall';
import { testConn } from '../../../test-utils/testConn';
import { redis } from '../../../redis';

beforeAll(async () => {
  if (redis.status === 'end') {
    await redis.connect();
  }
  await testConn();
});

afterAll(async () => {
  await mongoose.connection.close();
  redis.disconnect();
});

const createPIMutation = `
mutation CreatePracticeItem($data: PracticeItemInput!) {
  createPI(
    data: $data
  ) {
    title
    createdBy {
      username
    }
    createdAt
    updatedAt
    category
    duration
  }
}
`;
describe('Create', () => {
  it('creates a new practice item if user is logged in', async () => {
    const dbUser = await User.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      hashedPassword: faker.internet.password(),
    });

    await dbUser.save();

    const item = {
      title: 'TestItem',
      category: 'Technique',
      duration: 5,
    };

    const response = await gCall({
      source: createPIMutation,
      variableValues: {
        data: item,
      },
      userId: dbUser.id,
    });

    console.log(response);
  });
});
