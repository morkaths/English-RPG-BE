import { Router } from 'express';
import LessonController from '../controllers/lesson.controller';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

/**
 * @route   GET /api/lessons
 * @desc    Get all lessons
 * @access  Public
 */
router.get('/', LessonController.getAll);

/**
 * @route   GET /api/lessons/search?=key=...
 * @desc    Search lessons
 * @access  Public
 * @query   key (string, required)
 */
router.get('/search', LessonController.search);

/**
 * @route   GET /api/lessons/:id
 * @desc    Get lesson by ID
 * @access  Public
 */
router.get('/:id', LessonController.getById);

/**
 * @route   POST /api/lessons
 * @desc    Create new lesson
 * @access  Private (Admin only)
 */
router.post('/', authenticateToken, requireAdmin, LessonController.create);

/**
 * @route   PUT /api/lessons/:id
 * @desc    Update lesson by ID
 * @access  Private (Admin only)
 */
router.put('/:id', authenticateToken, requireAdmin, LessonController.update);

/**
 * @route   DELETE /api/lessons/:id
 * @desc    Delete lesson by ID
 * @access  Private (Admin only)
 */
router.delete('/:id', authenticateToken, requireAdmin, LessonController.delete);

export default router;