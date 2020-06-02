import { Resolver, Arg, Mutation } from 'type-graphql';

import userService from '../../services/userService';
import { redis } from '../../redis';
import { confirmUserPrefix } from '../constants/redisPrefixes';

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirmUser(@Arg('token') token: string): Promise<boolean> {
    const userId = await redis.get(confirmUserPrefix + token);

    if (!userId) {
      return false;
    }

    await userService.setConfirmed(userId);
    await redis.del(confirmUserPrefix + token);

    return true;
  }
}
