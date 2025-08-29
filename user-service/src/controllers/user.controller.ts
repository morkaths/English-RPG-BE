import { Request, Response } from 'express';
import UserService from '../services/user.service';
import { asyncHandler } from '../middleware/errorHandler';

const UserController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const users = await UserService.getAll();
    res.status(200).json({ success: true, data: users });
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    // Check if user exists
    const user = await UserService.getById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  }),

  search: asyncHandler(async (req: Request, res: Response) => {
    const { key } = req.query;
    if (!key || typeof key !== 'string') {
      return res.status(400).json({ success: false, message: 'Key query parameter is required' });
    }

    let condition: any = [
      { username: { $regex: key, $options: 'i' } },
      { email: { $regex: key, $options: 'i' } }
    ];

    const users = await UserService.find({ $or: condition });
    res.status(200).json({ success: true, data: users });
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    // Check if user exists
    const user = await UserService.getById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if email is being updated and if it already exists
    if (data.email) {
      const exited = await UserService.findOne({ email: data.email });
      if (exited && exited._id?.toString() !== id) {
        return res.status(400).json({ success: false, message: 'Email already exists' });
      }
    }

    await UserService.update(id, data);
    res.status(200).json({ success: true, message: 'User updated successfully' });
  }),

  delete: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    // Check if user exists
    const user = await UserService.getById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    await UserService.delete(id);
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  })

};

export default UserController;