import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Test route
router.get('/', (req, res) => {
  res.json({ message: 'Auth API is working!' });
});

/**
 * @route   POST /api/auth/register
 * @desc    Register new user
 * @access  Public
 */
router.post('/register', AuthController.register);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', AuthController.login);

/**
 * @route   GET /api/auth/profile
 * @desc    Get current user
 * @access  Private
 */
router.get('/profile', authenticateToken, AuthController.profile);

/**
 * @route   PUT /api/auth/update-profile
 * @desc    Update current user
 * @access  Private
 */
router.put('/update-profile', authenticateToken, AuthController.update);

export default router;
