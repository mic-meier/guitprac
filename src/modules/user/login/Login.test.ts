import mongoose from 'mongoose';
import faker from 'faker';

import { gCall } from '../../../test-utils/gCall';
import { testConn } from '../../../test-utils/testConn';
import { redis } from '../../../redis';
import { UserType } from 'src/types/User';
import { createUser } from '../../../test-utils/createUser';

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

const loginMutation = `
  mutation Login($username: String!, $password: String!) {
    login(
      username: $username,
      password: $password
    ) {
      id
      firstName
      lastName
      email
      username
    }
  }
`;

const loginMissingUsername = `
mutation Login($username: String!, $password: String!) {
  login(
    password: $password
  ) {
    id
    firstName
    lastName
    email
    username
  }
}
`;

const loginMissingPassword = `
mutation Login($username: String!, $password: String!) {
  login(
    username: $username
  ) {
    id
    firstName
    lastName
    email
    username
  }
}
`;

describe('Login', () => {
  let dbUser: UserType;
  let password: string;

  beforeEach(async () => {
    password = faker.internet.password();
    dbUser = await createUser(true, password);
  });

  it('returns user if username and password are provided, and password is correct', async () => {
    const response = await gCall({
      source: loginMutation,
      variableValues: {
        username: dbUser.username,
        password: password,
      },
    });

    expect(response).toMatchObject({
      data: {
        login: {
          id: dbUser.id,
          firstName: dbUser.firstName,
          lastName: dbUser.lastName,
          email: dbUser.email,
          username: dbUser.username,
        },
      },
    });
  });

  it('returns null if username and password are provided, but username does not exist', async () => {
    const response = await gCall({
      source: loginMutation,
      variableValues: {
        username: 'wrongusername',
        password: password,
      },
    });

    expect(response).toMatchObject({
      data: {
        login: null,
      },
    });
  });

  it('returns null if username and password are provided, but password is incorrect', async () => {
    const response = await gCall({
      source: loginMutation,
      variableValues: {
        username: dbUser.username,
        password: 'wrongpassword',
      },
    });

    expect(response).toMatchObject({
      data: {
        login: null,
      },
    });
  });

  it('returns correct error if username is not provided', async () => {
    const response = await gCall({
      source: loginMissingUsername,
      variableValues: {
        password: password,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(response.errors![0].message).toBe(
      'Field "login" argument "username" of type "String!" is required, but it was not provided.',
    );
  });

  it('returns correct error if password is not provided', async () => {
    const response = await gCall({
      source: loginMissingPassword,
      variableValues: {
        username: dbUser.username,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(response.errors![0].message).toBe(
      'Field "login" argument "password" of type "String!" is required, but it was not provided.',
    );
  });
});
