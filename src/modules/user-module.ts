import {
  Query,
  Resolver,
  ObjectType,
  Field,
  ID,
  Arg,
  InputType,
  Mutation,
  Root,
} from 'type-graphql';
import bcrypt from 'bcrypt';
import userService from '../services/user-service';
import { UserType } from '../types/types';
import { IsEmail } from 'class-validator';

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
  @IsEmail()
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

@Resolver((_of) => User)
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

  //   @Mutation((_returns) => User)
  //   async login(
  //     @Arg('loginData') loginData: LoginData,
  //   ): Promise<UserType | null> {
  //     const user = await userService.findOne(loginData.username);
  //     const passwordCorrect =
  //       user === null
  //         ? false
  //         : await bcrypt.compare(loginData.password, user.hashedPassword);

  //     if (!(user && passwordCorrect)) {
  //       throw new Error('Wrong credentials');
  //     }
  //     return user;
  //   }
  // }
}
export default UserResolver;
