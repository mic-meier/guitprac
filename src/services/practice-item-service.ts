import PracticeItem from '../models/practice_item';
import { PracticeItemType } from '../types/PracticeItem';
import { PracticeItemData } from '../types/types';
import userService from './userService';

const findById = async (id: string): Promise<PracticeItemType | null> => {
  return await PracticeItem.findById(id);
};

const findAll = async (): Promise<PracticeItemType[] | null> => {
  return await PracticeItem.find({});
};

const addNew = async (
  data: PracticeItemData,
): Promise<PracticeItemType | null> => {
  const newPracticeItem = new PracticeItem({
    title: data.title,
    createdBy: data.userId,
    category: data.category,
    duration: data.duration,
  });
  try {
    const user = await userService.findById(data.userId);
    const savedItem = await newPracticeItem.save();
    if (user) {
      user.practiceItems = user.practiceItems.concat(savedItem._id);
      await user.save();
    } else {
      throw new Error('user not in context');
    }
    const itemToReturn = await PracticeItem.findById(savedItem._id).populate(
      'createdBy',
    );
    return itemToReturn;
  } catch (e) {
    throw new Error(e);
  }
};

export default {
  findById,
  findAll,
  addNew,
};
