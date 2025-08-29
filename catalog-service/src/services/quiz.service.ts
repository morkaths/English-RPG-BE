import { QuizModel, IQuiz } from '../models/quiz.model';
import { FilterQuery } from 'mongoose';

const QuizService = {
  getAll: async (): Promise<IQuiz[]> => {
    return await QuizModel.find().exec();
  },

  getById: async (id: string): Promise<IQuiz | null> => {
    return await QuizModel.findById(id).exec();
  },

  find: async (condition: FilterQuery<IQuiz>): Promise<IQuiz[] | null> => {
    return QuizModel.find(condition).exec();
  },

  findOne: async (condition: FilterQuery<IQuiz>): Promise<IQuiz | null> => {
    return QuizModel.findOne(condition).exec();
  },

  create: async (quiz: IQuiz): Promise<IQuiz> => {
    const newQuiz = new QuizModel(quiz);
    return await newQuiz.save();
  },

  update: async (id: string, quiz: Partial<IQuiz>): Promise<IQuiz | null> => {
    return await QuizModel.findByIdAndUpdate(id, quiz, { new: true, runValidators: true }).exec();
  },

  delete: async (id: string): Promise<IQuiz | null> => {
    return await QuizModel.findByIdAndDelete(id).exec();
  }
}

export default QuizService;
