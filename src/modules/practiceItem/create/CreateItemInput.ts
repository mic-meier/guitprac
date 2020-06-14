import { Field, InputType } from 'type-graphql';

@InputType()
class PracticeItemInput {
  @Field()
  title: string;

  @Field()
  category: string;

  @Field()
  duration: number;
}

export default PracticeItemInput;
