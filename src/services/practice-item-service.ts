import PracticeItem from '../models/practice_item';
import { PracticeItemType, NewPracticeItemData } from 'src/types/types';

const findById = async (id: string): Promise<PracticeItemType | null> => {
  return await PracticeItem.findById(id);
};

const findAll = async (): Promise<PracticeItemType[] | null> => {
  return await PracticeItem.find({});
};

const addNew = async (
  data: NewPracticeItemData,
): Promise<PracticeItemType | null> => {
  const newPracticeItem = new PracticeItem({
    title: data.title,
    createdBy: data.user,
    category: data.category,
    duration: data.duration,
  });
};

export default {
  findById,
  findAll,
};
