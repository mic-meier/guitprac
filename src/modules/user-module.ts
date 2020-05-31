import {
  Query,
  Resolver,
  ObjectType,
  Field,
  ID,
  Arg,
  InputType,
  Mutation,
} from 'type-graphql';
import userService from '../services/user-service';
import { UserType } from 'src/types';

@ObjectType()
class User {
  @Field((_type) => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  enail: string;

  @Field()
  hashedPassword: string;

  @Field()
  lastActive: Date;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
class NewUserInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@Resolver(User)
class UserResolver {
  @Query((_returns) => User)
  async user(@Arg('id') id: string): Promise<UserType | null> {
    const user = await userService.findById(id);
    if (user === undefined) {
      throw new Error(`User not found. Id: ${id}`);
    }
    return user;
  }

  @Query((_returns) => [User])
  users(): Promise<UserType[] | null> {
    return userService.findAll();
  }

  @Mutation((_returns) => User) // TODO add authentication
  addUser(
    @Arg('newUserData') newUserData: NewUserInput,
  ): Promise<UserType | null> {
    return userService.addNew(newUserData);
  }
}

export default UserResolver;
