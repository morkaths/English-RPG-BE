import express from 'express';
import userRoutes from './user.routes';

const router = express.Router();

// public routes
router.use('/users', userRoutes);

export default router;