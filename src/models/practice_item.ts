import mongoose from 'mongoose';
import { PracticeItemType } from '../types';

const practiceItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<PracticeItemType>(
  'PracticeItem',
  practiceItemSchema,
);
