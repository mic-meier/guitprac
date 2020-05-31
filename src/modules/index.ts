import { buildSchema } from 'type-graphql';

import UserResolver from './user-module';

const schema = buildSchema({
  resolvers: [UserResolver],
  validate: false,
});

export default schema;
