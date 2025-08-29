import { Router } from 'express';
import TagController from '../controllers/tag.controller';
import { authenticateToken } from '../middleware/auth';

const router = Router();

/**
 * @route   GET /api/tags
 * @desc    Get all tags
 * @access  Public
 */
router.get('/', TagController.getAll);

/**
 * @route   GET /api/tags/search?=key=...
 * @desc    Search tags
 * @access  Public
 * @query   key (string, required)
 */
router.get('/search', TagController.search);

/**
 * @route   GET /api/tags/:id
 * @desc    Get tag by ID
 * @access  Public
 */
router.get('/:id', TagController.getById);

/**
 * @route   POST /api/tags
 * @desc    Create new tag
 * @access  Private (Admin only)
 */
router.post('/', authenticateToken, TagController.create);

/**
 * @route   PUT /api/tags/:id
 * @desc    Update tag by ID
 * @access  Private (Admin only)
 */
router.put('/:id', authenticateToken, TagController.update);

/**
 * @route   DELETE /api/tags/:id
 * @desc    Delete tag by ID
 * @access  Private (Admin only)
 */
router.delete('/:id', authenticateToken, TagController.delete);


export default router;
