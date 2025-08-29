import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import type { UserRequest } from '../types/request';
import { asyncHandler } from '../middleware/errorHandler';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.config';
import UserService from '../services/user.service';


const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);
};

const AuthController = {

  register: asyncHandler(async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existed = await UserService.findOne({ email });
    if (existed) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Create new user
    const user = await UserService.create({ username, email, password } as any);
    const token = generateToken((user._id as any).toString());
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        isVerified: user.isVerified
      }
    });
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    // Check if user exists
    const { email, password } = req.body;
    const user = await UserService.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = generateToken((user._id as any).toString());
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        isVerified: user.isVerified
      }
    });
  }),

  profile: asyncHandler(async (req: Request, res: Response) => {
    const user = (req as UserRequest).user;
    if (!user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    res.status(200).json({ success: true, user: user });
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const id = (req as UserRequest).user?._id?.toString();
    if (!id) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Find user by ID
    const user = await UserService.getById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update password fields
    const { newPassword, oldPassword, ...otherUpdates } = req.body;
    if (oldPassword && newPassword) {
      if (!(await user.comparePassword(oldPassword))) {
        return res.status(400).json({ success: false, message: 'Old password is incorrect' });
      }
      otherUpdates.password = newPassword;
    }

    await UserService.update(id, otherUpdates);
    res.status(200).json({ success: true, message: 'Profile updated successfully' });
  })

};

export default AuthController;
