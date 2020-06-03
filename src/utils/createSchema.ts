import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from 'graphql';

import { RegisterResolver } from '../modules/user/Register';
import { ChangePasswordResolver } from '../modules/user/ChangePassword';
import { ConfirmUserResolver } from '../modules/user/ConfirmUser';
import { ForgotPasswordResolver } from '../modules/user/ForgotPassword';
import { LoginResolver } from '../modules/user/Login';
import { MeResolver } from '../modules/user/Me';
import { UserResolver } from '../modules/user/User';

export const createSchema = async (): Promise<GraphQLSchema> =>
  await buildSchema({
    resolvers: [
      RegisterResolver,
      ChangePasswordResolver,
      ForgotPasswordResolver,
      ConfirmUserResolver,
      LoginResolver,
      MeResolver,
      UserResolver,
    ],
  });
