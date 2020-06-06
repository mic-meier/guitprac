import mongoose from 'mongoose';
import faker from 'faker';

import User from '../../../models/user';
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

const registerMutation = `
mutation Register($data: RegisterInput!) {
  register(
    data: $data
  ) {
    id
    firstName
    lastName
    email
    username
  }
}
`;

describe('Register', () => {
  it('create user', async () => {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
    };

    const response = await gCall({
      source: registerMutation,
      variableValues: {
        data: user,
      },
    });

    expect(response).toMatchObject({
      data: {
        register: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      },
    });

    const dbUser = await User.findOne({ email: user.email });
    expect(dbUser).toBeDefined();

    if (dbUser) {
      expect(dbUser.firstName).toBe(user.firstName);
      expect(dbUser.lastName).toBe(user.lastName);
      expect(dbUser.email).toBe(user.email);
      expect(dbUser.confirmed).toBeFalsy();
      expect(dbUser.createdAt).toBeDefined();
    }
  });
});
