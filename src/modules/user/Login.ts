import { Resolver, Arg, Mutation, Ctx } from 'type-graphql';
import bcrypt from 'bcrypt';

import userService from '../../services/user-service';
import { UserType } from '../../types/User';
import { User } from './User';
import { MyContext } from '../../types/MyContext';
import { parseString } from '../../utils/typeguards';

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('username') username: string,
    @Arg('password') password: 'string',
    @Ctx() ctx: MyContext,
  ): Promise<UserType | null> {
    const user = await userService.findOneByUsername(username);

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(password, user.hashedPassword);

    if (!valid) {
      return null;
    }

    if (ctx.req.session === undefined) {
      throw new Error('session undefined');
    }

    ctx.req.session.userId = parseString(user.id, 'user.id');

    return user;
  }
}
