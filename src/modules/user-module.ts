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
import bcrypt from 'bcrypt';
import userService from '../services/user-service';
import { UserType } from '../types';
import { UserInputError } from 'apollo-server-express';

@ObjectType()
class User {
  @Field((_type) => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  username: string;

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
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
class LoginData {
  @Field()
  username: string;

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
  async addUser(
    @Arg('newUserData') newUserData: NewUserInput,
  ): Promise<UserType | null> {
    try {
      return await userService.addNew(newUserData);
    } catch (e) {
      if (e instanceof Error) {
        throw new UserInputError(e.message, {
          invalidArgs: newUserData,
        });
      } else {
        throw e;
      }
    }
  }

  @Mutation((_returns) => User)
  async login(
    @Arg('loginData') loginData: LoginData,
  ): Promise<UserType | null> {
    const user = await userService.findOne(loginData.username);
    const passwordCorrect =
      user === null
        ? false
        : await bcrypt.compare(loginData.password, user.hashedPassword);

    if (!(user && passwordCorrect)) {
      throw new Error('Wrong credentials');
    }
    return user;
  }
}

export default UserResolver;
