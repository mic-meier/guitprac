import faker from 'faker';
import bcrypt from 'bcrypt';

import User from '../models/user';
import { UserType } from 'src/types/User';

export const createUser = async (
  confirmed = true,
  password = 'password',
): Promise<UserType> => {
  const user = await User.create({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    hashedPassword: await bcrypt.hash(password, 12),
    confirmed: confirmed,
  });

  await user.save();

  return user;
};
