import User from '../models/user';
import { UserType, NewUserDataType, UserInputData } from '../types';

const findById = async (id: string): Promise<UserType | null> => {
  return await User.findById(id);
};

const findAll = async (): Promise<UserType[] | null> => {
  return await User.find({});
};

const addNew = async (data: UserInputData): Promise<UserType | null> => {
  const newUser = new User({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    hashedPassword: 'testHash', // TODO
  });

  const savedUser = await newUser.save();

  return savedUser;
};

export default {
  findById,
  findAll,
  addNew,
};
