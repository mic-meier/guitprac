import mongoose from 'mongoose';

import { UserType } from './User';

export interface PracticeItemType extends mongoose.Document {
  title: string;
  createdBy: UserType;
  createdAt: Date;
  updatedAt: Date;
  category: string;
  duration: number;
}
