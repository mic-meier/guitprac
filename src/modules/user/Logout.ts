import { Resolver, Mutation, Ctx } from 'type-graphql';
import { MyContext } from '../../types/MyContext';

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext): Promise<boolean> {
    return new Promise((res, rej) => {
      if (ctx.req.session === undefined) {
        throw new Error('session undefined');
      }
      ctx.req.session.destroy((e) => {
        if (e) {
          console.log(e);
          return rej(false);
        }
        ctx.res.clearCookie('qid');
        return res(true);
      });
    });
  }
}
