import mongoose from 'mongoose';
import { gCall } from '../../../test-utils/gCall';

import { testConn } from '../../../test-utils/testConn';

beforeAll(async () => {
  await testConn();
});

afterAll(async () => {
  await mongoose.connection.close();
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
    console.log(
      await gCall({
        source: registerMutation,
        variableValues: {
          data: {
            firstName: 'Bruce',
            lastName: 'Wayne',
            username: 'Batman',
            password: 'SelinaKyle',
            email: 'brucewayne@wayne.com',
          },
        },
      }),
    );
  });
});
