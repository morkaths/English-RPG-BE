import { UserModel, IUser } from '../models/user.model';
import { FilterQuery } from 'mongoose';

const User = {
  /**
   * Lấy tất cả người dùng.
   * @returns Danh sách tất cả người dùng.
   */
  getAll: async (): Promise<IUser[]> => {
    return await UserModel.find().exec();
  },

  /**
   * Lấy người dùng theo ID.
   * @param id - ID của người dùng.
   * @returns Người dùng được tìm thấy hoặc null nếu không tìm thấy.
   */
  getById: async (id: string): Promise<IUser | null> => {
    return await UserModel.findById(id).exec();
  },

  /**
   * Tìm kiếm người dùng theo điều kiện.
   * @param condition - Điều kiện để tìm kiếm người dùng.
   * @returns Người dùng được tìm thấy hoặc null nếu không tìm thấy.
   */
  find: async (condition: FilterQuery<IUser>): Promise<IUser | null> => {
    return UserModel.findOne(condition);
  },

  /**
   * Tạo người dùng mới.
   * @param user - Thông tin người dùng.
   * @returns Người dùng được tạo.
   */
  create: async (user: IUser): Promise<IUser> => {
    const newUser = new UserModel(user);
    return await newUser.save();
  },

  /**
   * Cập nhật thông tin người dùng.
   * @param id - ID của người dùng.
   * @param user - Thông tin người dùng cần cập nhật.
   * @returns Người dùng được cập nhật hoặc null nếu không tìm thấy.
   */
  update: async (id: string, user: Partial<IUser>): Promise<IUser | null> => {
    return await UserModel.findByIdAndUpdate(id, user, { new: true, runValidators: true }).exec();
  },

  /**
   * Xóa người dùng theo ID.
   * @param id - ID của người dùng.
   * @returns Người dùng đã bị xóa hoặc null nếu không tìm thấy.
   */
  delete: async (id: string): Promise<IUser | null> => {
    return await UserModel.findByIdAndDelete(id).exec();
  }
}

export default User;
