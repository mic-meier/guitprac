import { Resolver, Arg, Mutation } from 'type-graphql';

import userService from '../../services/userService';
import { UserType } from '../../types/User';
import { User } from './User';
import RegisterInput from './register/RegisterInput';
import { sendEmail } from '../utils/sendEmail';
import { createConfirmationUrl } from '../utils/createConfirmationUrl';

@Resolver()
export class RegisterResolver {
  @Mutation(() => User)
  async register(@Arg('data') data: RegisterInput): Promise<UserType> {
    const user = await userService.register(data);

    await sendEmail(user.email, await createConfirmationUrl(user.id));

    return user;
  }
}
