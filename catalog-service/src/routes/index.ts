import express from 'express';

import tagRoutes from './tag.routes';
import courseRoutes from './course.routes';

const router = express.Router();

// routes
router.use('/tags', tagRoutes);
router.use('/courses', courseRoutes);


export default router;