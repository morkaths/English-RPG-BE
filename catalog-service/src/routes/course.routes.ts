import { Router } from 'express';
import CourseController from '../controllers/course.controller';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Test route
router.get('/', (req, res) => {
  res.json({ message: 'Course API is working!' });
});

/**
 * @route   GET /api/courses
 * @desc    Get all courses
 * @access  Public
 */
router.get('/courses', CourseController.getAll);

/**
 * @route   GET /api/courses/:id
 * @desc    Get course by ID
 * @access  Public
 */
router.get('/courses/:id', CourseController.getById);

/**
 * @route   GET /api/courses/search?=key=...&level=...&tag=...
 * @desc    Search courses
 * @access  Public
 * @query   key (string, required), level (string[], optional), tag (string[], optional)
 */
router.get('/courses/search', CourseController.search);

/**
 * @route   POST /api/courses
 * @desc    Create new course
 * @access  Private (Admin only)
 */
router.post('/courses', authenticateToken, CourseController.create);

/**
 * @route   PUT /api/courses/:id
 * @desc    Update course by ID
 * @access  Private (Admin only)
 */
router.put('/courses/:id', authenticateToken, CourseController.update);

/**
 * @route   DELETE /api/courses/:id
 * @desc    Delete course by ID
 * @access  Private (Admin only)
 */
router.delete('/courses/:id', authenticateToken, CourseController.delete);

export default router;