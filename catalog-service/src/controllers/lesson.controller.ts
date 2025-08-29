import { Request, Response } from 'express';
import LessonService from '../services/lesson.service';
import { asyncHandler } from '../middleware/errorHandler';

const LessonController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const lessons = await LessonService.getAll();
    res.status(200).json({ success: true, data: lessons });
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    // Check if lesson exists
    const lesson = await LessonService.getById(id);
    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Lesson not found' });
    }
    res.status(200).json({ success: true, data: lesson });
  }),

  search: asyncHandler(async (req: Request, res: Response) => {
    const { key } = req.query;
    if (!key || typeof key !== 'string') {
      return res.status(400).json({ success: false, message: 'Key query parameter is required' });
    }

    const condition: any = [
      { title: { $regex: key, $options: 'i' } },
      { content: { $regex: key, $options: 'i' } }
    ];

    const lessons = await LessonService.find({ $or: condition });
    res.status(200).json({ success: true, data: lessons });
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;

    // Check if lesson title already exists
    const existed = await LessonService.findOne({ title: data.title });
    if (existed) {
      return res.status(400).json({ success: false, message: 'Lesson title already exists' });
    }

    const lesson = await LessonService.create(data);
    res.status(201).json({ success: true, data: lesson });
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    // Check if lesson exists
    const lesson = await LessonService.getById(id);
    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Lesson not found' });
    }

    // Check if lesson title already exists
    if (data.title && data.title !== lesson.title) {
      const existed = await LessonService.findOne({ title: data.title });
      if (existed) {
        return res.status(400).json({ success: false, message: 'Lesson title already exists' });
      }
    }
    
    await LessonService.update(id, data);
    res.status(200).json({ success: true, message: 'Lesson updated successfully' });
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    // Check if lesson exists
    const lesson = await LessonService.getById(id);
    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Lesson not found' });
    }
    await LessonService.delete(id);
    res.status(200).json({ success: true, message: 'Lesson deleted successfully' });
  }),
};

export default LessonController;
