import mongoose from 'mongoose';

export interface UserType extends mongoose.Document {
  confirmed: boolean;
  firstName: string;
  lastName: string;
  username: string;
  name: string;
  email: string;
  hashedPassword: string;
  createdAt: Date;
  updatedAt: Date;
  lastActive: Date;
  id: string;
}
