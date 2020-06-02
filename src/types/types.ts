import mongoose from 'mongoose';

// export interface UserType extends mongoose.Document {
//   confirmed: any;
//   firstName: string;
//   lastName: string;
//   username: string;
//   name: string;
//   email: string;
//   hashedPassword: string;
//   createdAt: Date;
//   updatedAt: Date;
//   lastActive: Date;
//   id: string;
// }
export interface RegisterData {
  firstName: string;
  lastName: string;
  username: string;
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
