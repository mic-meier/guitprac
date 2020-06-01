import { Resolver, Arg, Mutation } from 'type-graphql';

import userService from '../../services/user-service';
import { UserType } from '../../types/User';
import { User } from './User';
import RegisterInput from './register/RegisterInput';

@Resolver()
export class RegisterResolver {
  @Mutation(() => User)
  async register(@Arg('data') data: RegisterInput): Promise<UserType> {
    const user = await userService.register(data);

    return user;
  }
}
