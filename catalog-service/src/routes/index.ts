import express from 'express';

import tagRoutes from './tag.routes';
import courseRoutes from './course.routes';
import lessonRoutes from './lesson.routes';
import quizRoutes from './quiz.routes';

const router = express.Router();

// routes
router.use('/tags', tagRoutes);
router.use('/courses', courseRoutes);
router.use('/lessons', lessonRoutes);
router.use('/quizzes', quizRoutes);


export default router;