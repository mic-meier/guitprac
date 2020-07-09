import { Resolver, Mutation, Arg, Ctx, UseMiddleware } from 'type-graphql';

import { PracticeItem } from './PracticeItem';
import { PracticeItemData } from '../../types/types';
import { PracticeItemType } from '../../types/PracticeItem';
import practiceItemService from '../../services/practice-item-service';
import { MyContext } from '../../types/MyContext';
import { parseString } from '../../utils/typeguards';
import PracticeItemInput from './create/CreateItemInput';
import { isAuth } from '../middleware/isAuth';

@Resolver()
export class CreatePracticeItemResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => PracticeItem)
  async createPI(
    @Arg('data') data: PracticeItemInput,
    @Ctx() ctx: MyContext,
  ): Promise<PracticeItemType | null> {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const userId: string = parseString(ctx.req.session!.userId, 'userId');

    const piData: PracticeItemData = {
      ...data,
      userId,
    };
    const practiceItem = await practiceItemService.addNew(piData);

    return practiceItem;
  }
}
