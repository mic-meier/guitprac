import { Resolver, Arg, Mutation, Ctx } from 'type-graphql';
import bcrypt from 'bcrypt';

import userService from '../../services/userService';
import { redis } from '../../redis';
import { forgotPasswordPrefix } from '../constants/redisPrefixes';
import { ChangePasswordInput } from './changePassword/ChangePasswordInput';
import { UserType } from '../../types/User';
import { User } from './User';
import { MyContext } from '../../types/MyContext';

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg('data') { token, password }: ChangePasswordInput,
    @Ctx() ctx: MyContext,
  ): Promise<UserType | null> {
    const userId = await redis.get(forgotPasswordPrefix + token);

    if (!userId) {
      return null;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await userService.changePassword(userId, hashedPassword);

    if (ctx.req.session === undefined) {
      throw new Error('session undefined');
    }

    if (user) {
      ctx.req.session.userId = user.id; // login user
    }

    return user;
  }
}
