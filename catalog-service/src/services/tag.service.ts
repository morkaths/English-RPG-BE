import { TagModel, ITag } from '../models/tag.model';
import { FilterQuery } from 'mongoose';

const TagService = {
  /**
   * Get all tags.
   * @returns List of all tags.
   */
  getAll: async (): Promise<ITag[]> => {
    return await TagModel.find().exec();
  },

  /**
   * Get tag by ID.
   * @param id - ID of the tag.
   * @returns The found tag or null if not found.
   */
  getById: async (id: string): Promise<ITag | null> => {
    return await TagModel.findById(id).exec();
  },

  find: async (condition: FilterQuery<ITag>): Promise<ITag[]> => {
    return TagModel.find(condition).exec();
  },

  /**
   * Search tag by condition.
   * @param condition - The condition to find the tag.
   * @returns The found tag or null if not found.
   */
  findOne: async (condition: FilterQuery<ITag>): Promise<ITag | null> => {
    return TagModel.findOne(condition).exec();
  },

  /**
   * Create a new tag.
   * @param tag - The tag to create.
   * @returns The created tag.
   */
  create: async (tag: ITag): Promise<ITag> => {
    const newTag = new TagModel(tag);
    return await newTag.save();
  },

  /**
   * Update a tag by ID.
   * @param id - ID of the tag.
   * @param tag - The tag to update.
   * @returns The updated tag or null if not found.
   */
  update: async (id: string, tag: Partial<ITag>): Promise<ITag | null> => {
    return await TagModel.findByIdAndUpdate(id, tag, { new: true, runValidators: true }).exec();
  },

  /**
   * Delete a tag by ID.
   * @param id - ID of the tag.
   * @returns The deleted tag or null if not found.
   */
  delete: async (id: string): Promise<ITag | null> => {
    return await TagModel.findByIdAndDelete(id).exec();
  }
}

export default TagService;
