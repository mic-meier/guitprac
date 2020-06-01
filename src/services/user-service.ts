import bcrypt from 'bcrypt';
import User from '../models/user';
import { UserType, RegisterData } from '../types/types';
import { parseString } from '../utils/typeguards';

const findById = async (id: string): Promise<UserType | null> => {
  return await User.findById(id);
};

const findAll = async (): Promise<UserType[] | null> => {
  return await User.find({});
};

const register = async (data: RegisterData): Promise<UserType> => {
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

  try {
    const savedUser = await newUser.save();
    return savedUser;
  } catch (e) {
    throw new Error(e);
  }
  // TODO create token and return user with token
};

const findOneByUsername = async (
  username: string,
): Promise<UserType | null> => {
  return await User.findOne({ username: username });
};
const findOneByEmail = async (email: string): Promise<UserType | null> => {
  return await User.findOne({ email: email });
};

export default {
  findById,
  findAll,
  register,
  findOneByUsername,
  findOneByEmail,
};
