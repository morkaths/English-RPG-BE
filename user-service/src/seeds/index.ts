import mongoose from 'mongoose';
import { MONGODB_URI } from '../config/constants';
import { seedUsers } from './user.seed';

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);

    // Seed user data
    await seedUsers();

  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    await mongoose.disconnect();
  }
}

seed();

// npx ts-node src/seeds/index.ts