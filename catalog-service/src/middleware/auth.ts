
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.config';

// Middleware to authenticate JWT
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'No authentication token provided' });

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
    (req as any).user = { _id: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  
  // Kiểm tra xem đã xác thực token chưa
  if (!user) {
    return res.status(401).json({ success: false, message: 'You need to log in first' });
  }

  // Kiểm tra role
  if (user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Access denied' });
  }

  next();
};