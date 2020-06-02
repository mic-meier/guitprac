import { buildSchema } from 'type-graphql';

import { UserResolver } from './user/User';
import { RegisterResolver } from './user/Register';
import { LoginResolver } from './user/Login';
import { MeResolver } from './user/Me';
import { ConfirmUserResolver } from './user/ConfirmUser';

const schema = buildSchema({
  resolvers: [
    UserResolver,
    RegisterResolver,
    LoginResolver,
    MeResolver,
    ConfirmUserResolver,
  ],
});

export default schema;
