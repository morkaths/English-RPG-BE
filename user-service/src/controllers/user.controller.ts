import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { AuthRequest } from '../types/request';
import UserService from '../services/user.service';
import { asyncHandler } from '../middleware/errorHandler';

const UserController = {
    getAll: asyncHandler(async (req: Request, res: Response) => {
        const users = await UserService.getAll();
        res.status(200).json({ success: true, users });
    }),

    getById: asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const user = await UserService.getById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, user });
    }),

    find: asyncHandler(async (req: Request, res: Response) => {
        const { key } = req.query;
        if (!key || typeof key !== 'string') {
            return res.status(400).json({ success: false, message: 'Key query parameter is required' });
        }

        let condition: any = [
            { username: key },
            { email: key }
        ];

        const user = await UserService.find({ $or: condition });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, user });
    }),

    update: asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const updates = req.body;

        const user = await UserService.getById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        await UserService.update(id, updates);
        res.status(200).json({ success: true, message: 'User updated successfully' });
    }),

    delete: asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const user = await UserService.getById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        await UserService.delete(id);
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    })

};

export default UserController;