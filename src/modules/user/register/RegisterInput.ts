import { Field, InputType } from 'type-graphql';
import { IsEmail, MinLength } from 'class-validator';
import { IsEmailAlreadyExists } from './isEmailAlreadyExist';
import { IsUsernameAlreadyExists } from './isUserNameAlreadyExists';

@InputType()
class RegisterInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  @MinLength(3)
  @IsUsernameAlreadyExists({ message: 'Username alreaydy in use' })
  username: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExists({ message: 'email already in use' })
  email: string;

  @Field()
  password: string;
}

export default RegisterInput;
