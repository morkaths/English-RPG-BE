import { Router } from 'express';
import TagController from '../controllers/tag.controller';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Test route
router.get('/', (req, res) => {
  res.json({ message: 'Tag API is working!' });
});

/**
 * @route   GET /api/tags
 * @desc    Get all tags
 * @access  Public
 */
router.get('/tags', TagController.getAll);

/**
 * @route   GET /api/tags/:id
 * @desc    Get tag by ID
 * @access  Public
 */
router.get('/tags/:id', TagController.getById);

/**
 * @route   GET /api/tags/search?=key=...
 * @desc    Search tags
 * @access  Public
 * @query   key (string, required)
 */
router.get('/tags/search', TagController.search);

/**
 * @route   POST /api/tags
 * @desc    Create new tag
 * @access  Private (Admin only)
 */
router.post('/tags', authenticateToken, TagController.create);

/**
 * @route   PUT /api/tags/:id
 * @desc    Update tag by ID
 * @access  Private (Admin only)
 */
router.put('/tags/:id', authenticateToken, TagController.update);

/**
 * @route   DELETE /api/tags/:id
 * @desc    Delete tag by ID
 * @access  Private (Admin only)
 */
router.delete('/tags/:id', authenticateToken, TagController.delete);


export default router;
