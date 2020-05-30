import mongoose from 'mongoose';

const practiceScheduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  changed: {
    type: Date,
    default: Date.now,
  },
});

const PracticeSchedule = mongoose.model(
  'PracticeSchedule',
  practiceScheduleSchema,
);

export default PracticeSchedule;
