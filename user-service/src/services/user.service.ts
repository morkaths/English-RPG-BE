import { UserModel, IUser } from '../models/user.model';

export const getUsers = async (): Promise<IUser[]> => {
  return await UserModel.find().exec();
};
