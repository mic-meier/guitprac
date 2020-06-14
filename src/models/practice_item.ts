import mongoose from 'mongoose';
import { PracticeItemType } from '../types/PracticeItem';

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

const PracticeItem = mongoose.model<PracticeItemType>(
  'PracticeItem',
  practiceItemSchema,
);

export default PracticeItem;
