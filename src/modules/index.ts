import { buildSchema } from 'type-graphql';

import UserResolver from './user-module';
import { RegisterResolver } from './user/Register';
import { LoginResolver } from './user/Login';
import { MeResolver } from './user/Me';

const schema = buildSchema({
  resolvers: [UserResolver, RegisterResolver, LoginResolver, MeResolver],
});

export default schema;
