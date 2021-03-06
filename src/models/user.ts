import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { UserType } from '../types/User';

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
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    lastActive: {
      type: Date,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    practiceItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PracticeItem',
      },
    ],
  },
  { timestamps: true },
);

userSchema.plugin(uniqueValidator);

const User = mongoose.model<UserType>('User', userSchema);

export default User;
