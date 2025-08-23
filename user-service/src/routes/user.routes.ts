import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

/**
 * @route   GET /api/user
 * @desc    Get all users
 * @access  Public
 */
router.get('/', UserController.getAll);

/**
 * @route   GET /api/user/:id
 * @desc    Get user by ID
 * @access  Public
 */
router.get('/:id', UserController.getById);

/**
 * @route   PUT /api/user/:id
 * @desc    Update user by ID
 * @access  Private
 */
router.put('/:id', authenticateToken, requireAdmin, UserController.update);

/**
 * @route   DELETE /api/user/:id
 * @desc    Delete user by ID
 * @access  Private
 */
router.delete('/:id', authenticateToken, requireAdmin, UserController.delete);

export default router;
