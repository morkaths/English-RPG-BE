import { Request, Response } from 'express';
import QuizService from '../services/quiz.service';
import { asyncHandler } from '../middleware/errorHandler';

const QuizController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const quizzes = await QuizService.getAll();
    res.status(200).json({ success: true, data: quizzes });
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const quiz = await QuizService.getById(id);
    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }
    res.status(200).json({ success: true, data: quiz });
  }),

  search: asyncHandler(async (req: Request, res: Response) => {
    const { key } = req.query;
    if (!key || typeof key !== 'string') {
      return res.status(400).json({ success: false, message: 'Key query parameter is required' });
    }
    const condition: any = [
      { question: { $regex: key, $options: 'i' } }
    ];
    const quizzes = await QuizService.find({ $or: condition });
    res.status(200).json({ success: true, data: quizzes });
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    // Optionally check for duplicate question in the same lesson
    const existed = await QuizService.findOne({ question: data.question, lessonId: data.lessonId });
    if (existed) {
      return res.status(400).json({ success: false, message: 'Quiz question already exists for this lesson' });
    }
    const quiz = await QuizService.create(data);
    res.status(201).json({ success: true, data: quiz });
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    const quiz = await QuizService.getById(id);
    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }
    // Optionally check for duplicate question in the same lesson
    if (data.question && (data.question !== quiz.question || data.lessonId !== quiz.lessonId)) {
      const existed = await QuizService.findOne({ question: data.question, lessonId: data.lessonId || quiz.lessonId });
      if (existed) {
        return res.status(400).json({ success: false, message: 'Quiz question already exists for this lesson' });
      }
    }
    await QuizService.update(id, data);
    res.status(200).json({ success: true, message: 'Quiz updated successfully' });
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const quiz = await QuizService.getById(id);
    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }
    await QuizService.delete(id);
    res.status(200).json({ success: true, message: 'Quiz deleted successfully' });
  }),
};

export default QuizController;