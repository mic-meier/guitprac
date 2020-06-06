import bcrypt from 'bcrypt';
import User from '../models/user';
import { RegisterData } from '../types/types';
import { UserType } from '../types/User';
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
};

const findOneByUsername = async (
  username: string,
): Promise<UserType | null> => {
  return await User.findOne({ username: username });
};
const findOneByEmail = async (email: string): Promise<UserType | null> => {
  return await User.findOne({ email: email });
};

const setConfirmed = async (id: string): Promise<void> => {
  await User.updateOne({ _id: id }, { confirmed: true });
};

const changePassword = async (
  id: string,
  hashedPassword: string,
): Promise<UserType | null> => {
  return await User.findByIdAndUpdate(id, { hashedPassword: hashedPassword });
};

export default {
  findById,
  findAll,
  register,
  findOneByUsername,
  findOneByEmail,
  setConfirmed,
  changePassword,
};
