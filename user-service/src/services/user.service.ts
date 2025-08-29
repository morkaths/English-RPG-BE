import { UserModel, IUser } from '../models/user.model';
import { FilterQuery } from 'mongoose';

const UserService = {
  /**
   * Get all users.
   * @returns List of all users.
   */
  getAll: async (): Promise<IUser[]> => {
    return await UserModel.find().exec();
  },

  /**
   * Get user by ID.
   * @param id - ID of the user.
   * @returns The found user or null if not found.
   */
  getById: async (id: string): Promise<IUser | null> => {
    return await UserModel.findById(id).exec();
  },

  
  find: async (condition: FilterQuery<IUser>): Promise<IUser[]> => {
    return UserModel.find(condition).exec();
  },

  /**
  * Find user by condition.
  * @param condition - The condition to find the user.
  * @returns The found user or null if not found.
  */
  findOne: async (condition: FilterQuery<IUser>): Promise<IUser | null> => {
    return UserModel.findOne(condition).exec();
  },

  /**
   * Create a new user.
   * @param user - The user information.
   * @returns The created user.
   */
  create: async (user: IUser): Promise<IUser> => {
    const newUser = new UserModel(user);
    return await newUser.save();
  },

  /**
   * Update a user.
   * @param id - ID of the user.
   * @param user - The user information to update.
   * @returns The updated user or null if not found.
   */
  update: async (id: string, user: Partial<IUser>): Promise<IUser | null> => {
    return await UserModel.findByIdAndUpdate(id, user, { new: true, runValidators: true }).exec();
  },

  /**
   * Delete a user by ID.
   * @param id - ID of the user.
   * @returns The deleted user or null if not found.
   */
  delete: async (id: string): Promise<IUser | null> => {
    return await UserModel.findByIdAndDelete(id).exec();
  },

}

export default UserService;
