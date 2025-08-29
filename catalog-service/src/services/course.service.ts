import { CourseModel, ICourse } from '../models/course.model';
import { FilterQuery } from 'mongoose';

const CourseService = {
  /**
   * Get all courses.
   * @returns List of all courses.
   */
  getAll: async (): Promise<ICourse[]> => {
    return await CourseModel.find().exec();
  },

  /**
   * Get course by ID.
   * @param id - ID of the course.
   * @returns The found course or null if not found.
   */
  getById: async (id: string): Promise<ICourse | null> => {
    return await CourseModel.findById(id).exec();
  },

  
  find: async (condition: FilterQuery<ICourse>): Promise<ICourse[] | null> => {
    return CourseModel.find(condition).exec();
  },

  /**
   * Find course by condition.
   * @param condition - The condition to find the course.
   * @returns The found course or null if not found.
   */
  findOne: async (condition: FilterQuery<ICourse>): Promise<ICourse | null> => {
    return CourseModel.findOne(condition).exec();
  },

  /**
   * Create a new course.
   * @param course - The course information.
   * @returns The created course.
   */
  create: async (course: ICourse): Promise<ICourse> => {
    const newCourse = new CourseModel(course);
    return await newCourse.save();
  },

  /**
   * Update a course.
   * @param id - ID of the course.
   * @param course - The course information to update.
   * @returns The updated course or null if not found.
   */
  update: async (id: string, course: Partial<ICourse>): Promise<ICourse | null> => {
    return await CourseModel.findByIdAndUpdate(id, course, { new: true, runValidators: true }).exec();
  },

  /**
   * Delete a course by ID.
   * @param id - ID of the course.
   * @returns The deleted course or null if not found.
   */
  delete: async (id: string): Promise<ICourse | null> => {
    return await CourseModel.findByIdAndDelete(id).exec();
  }
}

export default CourseService;
