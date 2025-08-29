import { Router } from 'express';
import QuizController from '../controllers/quiz.controller';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

/**
 * @route   GET /api/quizzes
 * @desc    Get all quizzes
 * @access  Public
 */
router.get('/', QuizController.getAll);

/**
 * @route   GET /api/quizzes/search?=key=...
 * @desc    Search quizzes
 * @access  Public
 * @query   key (string, required)
 */
router.get('/search', QuizController.search);

/**
 * @route   GET /api/quizzes/:id
 * @desc    Get quiz by ID
 * @access  Public
 */
router.get('/:id', QuizController.getById);

/**
 * @route   POST /api/quizzes
 * @desc    Create new quiz
 * @access  Private (Admin only)
 */
router.post('/', authenticateToken, requireAdmin, QuizController.create);

/**
 * @route   PUT /api/quizzes/:id
 * @desc    Update quiz by ID
 * @access  Private (Admin only)
 */
router.put('/:id', authenticateToken, requireAdmin, QuizController.update);

/**
 * @route   DELETE /api/quizzes/:id
 * @desc    Delete quiz by ID
 * @access  Private (Admin only)
 */
router.delete('/:id', authenticateToken, requireAdmin, QuizController.delete);

export default router;