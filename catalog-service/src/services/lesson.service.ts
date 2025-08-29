import { LessonModel, ILesson } from '../models/lesson.model';
import { FilterQuery } from 'mongoose';

const LessonService = {
  getAll: async (): Promise<ILesson[]> => {
    return await LessonModel.find().exec();
  },

  getById: async (id: string): Promise<ILesson | null> => {
    return await LessonModel.findById(id).exec();
  },

  find: async (condition: FilterQuery<ILesson>): Promise<ILesson[] | null> => {
    return LessonModel.find(condition).exec();
  },

  findOne: async (condition: FilterQuery<ILesson>): Promise<ILesson | null> => {
    return LessonModel.findOne(condition).exec();
  },

  create: async (lesson: ILesson): Promise<ILesson> => {
    const newLesson = new LessonModel(lesson);
    return await newLesson.save();
  },

  update: async (id: string, lesson: Partial<ILesson>): Promise<ILesson | null> => {
    return await LessonModel.findByIdAndUpdate(id, lesson, { new: true, runValidators: true }).exec();
  },

  delete: async (id: string): Promise<ILesson | null> => {
    return await LessonModel.findByIdAndDelete(id).exec();
  }
}

export default LessonService;
