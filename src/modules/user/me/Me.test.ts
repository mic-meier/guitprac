import mongoose from 'mongoose';

import { createUser } from '../../../test-utils/createUser';
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

const meQuery = `
  {
    me {
      id
      firstName
      lastName
      username
      email
    }
  }
`;

describe('Me', () => {
  it('returns user if user id is in context', async () => {
    const dbUser = await createUser();

    const response = await gCall({
      source: meQuery,
      userId: dbUser.id,
    });

    expect(response).toMatchObject({
      data: {
        me: {
          id: dbUser.id,
          firstName: dbUser.firstName,
          lastName: dbUser.lastName,
          username: dbUser.username,
          email: dbUser.email,
        },
      },
    });
  });

  it('returns null if user id is not in context', async () => {
    const response = await gCall({
      source: meQuery,
    });

    expect(response).toMatchObject({
      data: {
        me: null,
      },
    });
  });
});
