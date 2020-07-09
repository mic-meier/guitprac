import mongoose from 'mongoose';

import { createUser } from '../../../test-utils/createUser';
import { gCall } from '../../../test-utils/gCall';
import { testConn } from '../../../test-utils/testConn';
import { redis } from '../../../redis';
import practiceItemService from '../../../services/practice-item-service';

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
    category
    duration
  }
}
`;

describe('Create', () => {
  beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  it('creates a new practice item if user is logged in', async () => {
    const dbUser = await createUser();

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

    expect(response).toMatchObject({
      data: {
        createPI: {
          title: item.title,
          createdBy: {
            username: dbUser.username,
          },
          category: item.category,
          duration: item.duration,
        },
      },
    });

    const itemsInDB = await practiceItemService.findAll();
    expect(itemsInDB).toHaveLength(1);
  });

  it('does not create a new practice item if user is not logged in and responds with appropriate error', async () => {
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
    });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(response.errors![0].message).toBe('not authenticated');

    const itemsInDB = await practiceItemService.findAll();
    expect(itemsInDB).toHaveLength(0);
  });

  it('does not create a new practice item if title is missing', async () => {
    const item = {
      category: 'Technique',
      duration: 5,
    };

    const response = await gCall({
      source: createPIMutation,
      variableValues: {
        data: item,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(response.errors![0].message).toBe(
      'Variable "$data" got invalid value { category: "Technique", duration: 5 }; Field "title" of required type "String!" was not provided.',
    );

    const itemsInDB = await practiceItemService.findAll();
    expect(itemsInDB).toHaveLength(0);
  });

  it('does not create a new practice item if category is missing', async () => {
    const item = {
      title: 'TestItem',
      duration: 5,
    };

    const response = await gCall({
      source: createPIMutation,
      variableValues: {
        data: item,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(response.errors![0].message).toBe(
      'Variable "$data" got invalid value { title: "TestItem", duration: 5 }; Field "category" of required type "String!" was not provided.',
    );

    const itemsInDB = await practiceItemService.findAll();
    expect(itemsInDB).toHaveLength(0);
  });

  it('does not create a new practice item if duraation is missing', async () => {
    const item = {
      title: 'TestItem',
      category: 'Technique',
    };

    const response = await gCall({
      source: createPIMutation,
      variableValues: {
        data: item,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(response.errors![0].message).toBe(
      'Variable "$data" got invalid value { title: "TestItem", category: "Technique" }; Field "duration" of required type "Float!" was not provided.',
    );

    const itemsInDB = await practiceItemService.findAll();
    expect(itemsInDB).toHaveLength(0);
  });
});
