import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { AuthRequest } from '../types/request';
import UserService from '../services/user.service';
import { asyncHandler } from '../middleware/errorHandler';
import { JWT_SECRET, JWT_EXPIRES_IN } from 'src/config/constants';


const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);
};

const AuthController = {

  register: asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    // Check if user already exists
    const existingUser = await UserService.find({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: existingUser.email === email ? 'Email already registered' : 'Username already taken'
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
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        isVerified: user.isVerified,
        joinedAt: user.joinedAt
      }
    });
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    // Find user by email
    const user = await UserService.find({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = generateToken((user._id as any).toString());
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        isVerified: user.isVerified,
        joinedAt: user.joinedAt
      }
    });
  }),

  me: asyncHandler(async (req: Request, res: Response) => {
    const user = (req as AuthRequest).user;
    if (!user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    res.status(200).json({ success: true, user: user });
  }),

  // update profile
  update: asyncHandler(async (req: Request, res: Response) => {
    const id = (req as AuthRequest).user?._id?.toString();
    if (!id) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const user = await UserService.getById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const updatedUser = await UserService.update(id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user: updatedUser });
  })

};

export default AuthController;
