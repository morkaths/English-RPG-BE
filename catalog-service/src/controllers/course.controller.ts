import { Request, Response } from 'express';
import CourseService from '../services/course.service';
import { asyncHandler } from '../middleware/errorHandler';


const CourseController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const courses = await CourseService.getAll();
    res.status(200).json({ success: true, data: courses });
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    // Check if course exists
    const course = await CourseService.getById(id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.status(200).json({ success: true, data: course });
  }),

  search: asyncHandler(async (req: Request, res: Response) => {
    const { key, level, tag } = req.query;
    if (!key || typeof key !== 'string') {
      return res.status(400).json({ success: false, message: 'Key query parameter is required' });
    }

    const orCondition: any = [
      { title: { $regex: key, $options: 'i' } },
      { description: { $regex: key, $options: 'i' } },
    ]
    let andCondition: any[] = [{ $or: orCondition }];

    // Filter by level
    if (level && Array.isArray(level)) {
      const levels = level.map(level => level.toString());
      andCondition.push({ level: { $in: levels } });
    }

    // Filter by tags
    if (tag && Array.isArray(tag)) {
      const tags = tag.map(tag => tag.toString());
      andCondition.push({ tags: { $in: tags } });
    }

    const courses = await CourseService.find({ $and: andCondition });
    res.status(200).json({ success: true, data: courses });
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;

    // Check if course name already exists
    const existed = await CourseService.findOne({ name: data.name });
    if (existed) {
      return res.status(400).json({ success: false, message: 'Course name already exists' });
    }

    const course = await CourseService.create(data);
    res.status(201).json({ success: true, data: course });
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    // Check if course exists
    const course = await CourseService.getById(id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    // Check if course name is being updated and if it already exists
    if (data.name) {
      const exited = await CourseService.findOne({ name: data.name });
      if (exited && exited._id?.toString() !== id) {
        return res.status(400).json({ success: false, message: 'Course name already exists' });
      }
    }

    await CourseService.update(id, data);
    res.status(200).json({ success: true, message: 'Course updated successfully' });
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    // Check if course exists
    const course = await CourseService.getById(id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    await CourseService.delete(id);
    res.status(200).json({ success: true, message: 'Course deleted successfully' });
  }),

}

export default CourseController;