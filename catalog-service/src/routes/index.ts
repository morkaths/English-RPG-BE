import express from 'express';

import tagRoutes from './tag.routes';

const router = express.Router();

// routes
router.use('/tags', tagRoutes);

export default router;