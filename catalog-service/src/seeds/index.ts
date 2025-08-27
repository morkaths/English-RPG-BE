import mongoose from 'mongoose';
import { MONGODB_URI } from '../config/env.config';
import { seedTags } from './tag.seed';
import { seedLessons } from './lesson.seed';
import { seedCourses } from './course.seed';
import { seedQuizzes } from './quiz.seed';

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);

    // Seed tag data
    await seedTags();
    await seedLessons();
    await seedCourses();
    await seedQuizzes();

  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    await mongoose.disconnect();
  }
}

seed();

// npx ts-node src/seeds/index.ts