import { Field, InputType } from 'type-graphql';
import { IsEmail, MinLength } from 'class-validator';
import { IsEmailAlreadyExists } from './isEmailAlreadyExist';
import { IsUsernameAlreadyExists } from './isUserNameAlreadyExists';
import { PasswordInput } from '../../shared/PasswordInput';

@InputType()
class RegisterInput extends PasswordInput {
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
}

export default RegisterInput;
