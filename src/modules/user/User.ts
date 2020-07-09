import {
  // Resolver,
  // Arg,
  // Query,
  ObjectType,
  Field,
  ID,
  // UseMiddleware,
} from 'type-graphql';
// import userService from '../../services/userService';
// import { UserType } from '../../types/User';
// import { isAuth } from '../middleware/isAuth';
import { PracticeItem } from '../practiceItem/PracticeItem';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  lastActive: Date;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field((_type) => [PracticeItem], { nullable: true })
  practiceItems: PracticeItem[];
}

// @Resolver((_of) => User)
// export class UserResolver {
//   @Query((_returns) => User)
//   async user(@Arg('id') id: string): Promise<UserType | null> {
//     const user = await userService.findById(id);
//     if (user === undefined) {
//       throw new Error(`User not found. Id: ${id}`);
//     }
//     return user;
//   }

//   @UseMiddleware(isAuth)
//   @Query((_returns) => [User])
//   async users(): Promise<UserType[] | null> {
//     return await userService.findAll();
//   }
// }
