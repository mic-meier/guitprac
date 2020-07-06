import mongoose from 'mongoose';
import { v4 } from 'uuid';
import { confirmUserPrefix } from '../../constants/redisPrefixes';

import User from '../../../models/user';
import { createUser } from '../../../test-utils/createUser';
import { gCall } from '../../../test-utils/gCall';
import { testConn } from '../../../test-utils/testConn';
import { redis } from '../../../redis';
import { UserType } from '../../../types/User';

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

const confirmMutation = `
mutation Confirm($token: String!) {
  confirmUser(
    token: $token
  )
}
`;

describe('ConfirmUser', () => {
  let token: string;
  let dbUser: UserType;
  beforeEach(async () => {
    dbUser = await createUser(false);

    token = v4();
    await redis.set(confirmUserPrefix + token, dbUser.id, 'ex', 60 * 60 * 24); // 1 day expiration
  });

  it('sets confirmed property of user to true if called with correct token and returns true', async () => {
    const response = await gCall({
      source: confirmMutation,
      variableValues: {
        token: token,
      },
    });

    expect(response).toMatchObject({
      data: {
        confirmUser: true,
      },
    });

    const user = await User.findOne({ email: dbUser.email });

    if (user) {
      expect(user.confirmed).toBe(true);
    }
  });

  it('does not change confirmed property of user and returns false if called with incorrect token', async () => {
    const response = await gCall({
      source: confirmMutation,
      variableValues: {
        token: 'wrong token',
      },
    });

    expect(response).toMatchObject({
      data: {
        confirmUser: false,
      },
    });

    const user = await User.findOne({ email: dbUser.email });

    if (user) {
      expect(user.confirmed).toBe(false);
    }
  });

  it('does not change confirmed property of user and returns correct error if called with missing token', async () => {
    const response = await gCall({
      source: confirmMutation,
    });

    expect(response).toHaveProperty('errors');

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(response.errors![0].message).toBe(
      'Variable "$token" of required type "String!" was not provided.',
    );

    const user = await User.findOne({ email: dbUser.email });

    if (user) {
      expect(user.confirmed).toBe(false);
    }
  });
});
