import mongoose from 'mongoose';

export interface UserType extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  hashedPassword: string;
  createdAt: Date;
  updatedAt: Date;
  lastActive: Date;
}
export type NewUserDataType = Omit<
  UserType,
  'createdAt' | 'updatedAt' | 'lastActiveAt' | 'hashedPassword'
>;

export interface UserInputData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface PracticeItemType extends mongoose.Document {
  title: string;
  createdBy: string; // TODO must be type USer
  createdAt: Date;
  updatedAt: Date;
  category: string;
  duration: number;
}

export type NewPracticeItemDataType = Omit<
  PracticeItemType,
  'createdAt' | 'updatedAt'
>;
