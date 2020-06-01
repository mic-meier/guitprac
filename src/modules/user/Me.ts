import { Resolver, Query, Ctx } from 'type-graphql';
import { User } from '../user-module';
import { MyContext } from '../../types/MyContext';
import userService from '../../services/user-service';
import { UserType } from '../../types/User';

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<UserType | null> {
    if (ctx.req.session === undefined) {
      return null;
    }
    if (!ctx.req.session.userId) {
      return null;
    }
    return await userService.findById(ctx.req.session.userId);
  }
}
