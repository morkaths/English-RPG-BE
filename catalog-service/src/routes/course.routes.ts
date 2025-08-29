import { Router } from 'express';
import CourseController from '../controllers/course.controller';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

/**
 * @route   GET /api/courses
 * @desc    Get all courses
 * @access  Public
 */
router.get('/', CourseController.getAll);

/**
 * @route   GET /api/courses/search?=key=...&level=...&tag=...
 * @desc    Search courses
 * @access  Public
 * @query   key (string, required), level (string[], optional), tag (string[], optional)
 */
router.get('/search', CourseController.search);

/**
 * @route   GET /api/courses/:id
 * @desc    Get course by ID
 * @access  Public
 */
router.get('/:id', CourseController.getById);

/**
 * @route   POST /api/courses
 * @desc    Create new course
 * @access  Private (Admin only)
 */
router.post('/', authenticateToken, requireAdmin, CourseController.create);

/**
 * @route   PUT /api/courses/:id
 * @desc    Update course by ID
 * @access  Private (Admin only)
 */
router.put('/:id', authenticateToken, requireAdmin, CourseController.update);

/**
 * @route   DELETE /api/courses/:id
 * @desc    Delete course by ID
 * @access  Private (Admin only)
 */
router.delete('/:id', authenticateToken, requireAdmin, CourseController.delete);

export default router;