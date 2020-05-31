/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import bcrypt from 'bcrypt';
import User from '../models/user';
import { UserType, UserInputData } from '../types';
import { parseString } from '../utils/typeguards';

const findById = async (id: string): Promise<UserType | null> => {
  return await User.findById(id);
};

const findAll = async (): Promise<UserType[] | null> => {
  return await User.find({});
};

const addNew = async (data: UserInputData): Promise<UserType | null> => {
  const password = parseString(data.password, 'password');
  const saltrounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltrounds);
  const newUser = new User({
    firstName: data.firstName,
    lastName: data.lastName,
    username: data.username,
    email: data.email,
    hashedPassword,
  });

  const savedUser = await newUser.save();

  // TODO create token and return user with token

  return savedUser;
};

const findOne = async (username: string): Promise<UserType | null> => {
  return await User.findOne({ username: username });
};

export default {
  findById,
  findAll,
  addNew,
  findOne,
};
