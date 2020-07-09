import { ObjectType, ID, Field } from 'type-graphql';

import { User } from '../user/User';

@ObjectType()
export class PracticeItem {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  category: string;

  @Field()
  duration: number;

  @Field((_type) => User)
  createdBy: User;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
