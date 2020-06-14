import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';

import { PracticeItem } from './PracticeItem';
import { PracticeItemData } from '../../types/types';
import { PracticeItemType } from '../../types/PracticeItem';
import practiceItemService from '../../services/practice-item-service';
import { MyContext } from '../../types/MyContext';
import { parseString } from '../../utils/typeguards';
import PracticeItemInput from './create/CreateItemInput';

@Resolver()
export class CreatePracticeItemResolver {
  @Mutation(() => PracticeItem)
  async createPI(
    @Arg('data') data: PracticeItemInput,
    @Ctx() ctx: MyContext,
  ): Promise<PracticeItemType | null> {
    if (ctx.req.session === undefined) {
      throw new Error('Not logged in');
    }

    if (!ctx.req.session.userId) {
      throw new Error('Not logged in');
    }

    const userId: string = parseString(ctx.req.session.userId, 'userId');

    const piData: PracticeItemData = {
      ...data,
      userId,
    };
    const practiceItem = await practiceItemService.addNew(piData);

    return practiceItem;
  }
}
