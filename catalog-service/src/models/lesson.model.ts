import mongoose, { Schema, Document } from 'mongoose';

export interface ILesson extends Document {
  title: string;
  tags?: string[];
  content: string;
  quizzes: string[];
  resources?: string[];
  monsterId?: string;
  rewardCoins?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const LessonSchema = new Schema<ILesson>({
  title: { type: String, required: true },
  tags: [{ type: String }],
  content: { type: String, required: true },
  quizzes: [{ type: String, required: true }],
  resources: [{ type: String }],
  monsterId: { type: String },
  rewardCoins: { type: Number }
}, { timestamps: true });

export const LessonModel = mongoose.model<ILesson>('Lesson', LessonSchema);