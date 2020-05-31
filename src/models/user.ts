import mongoose from 'mongoose';
import { UserType } from '../types';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    lastActive: {
      type: Date,
    },
    // practiceSchedules: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'PracticeShchedule',
    //   },
    // ],
  },
  { timestamps: true },
);

const User = mongoose.model<UserType>('User', userSchema);

export default User;
