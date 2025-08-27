import mongoose, { Schema, Document } from 'mongoose';

export interface IQuiz extends Document {
  lessonId: string;
  type: 'choice' | 'fill_blank' | 'matching';
  question: string;
  timeLimit?: number;
  rewardExp?: number;
  options?: { text: string; isCorrect: boolean }[];
  answers?: { text: string }[];
  pairs?: { left: string; right: string }[];
  createdAt?: Date;
  updatedAt?: Date;
}

const optionSchema = new Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean, required: true }
});

const answerSchema = new Schema({
  text: { type: String, required: true }
});

const pairSchema = new Schema({
  left: { type: String, required: true },
  right: { type: String, required: true }
});

const QuizSchema = new Schema<IQuiz>({
  lessonId: { type: String, required: true },
  type: { type: String, enum: ['choice', 'fill_blank', 'matching'], required: true },
  question: { type: String, required: true },
  timeLimit: { type: Number },
  rewardExp: { type: Number },
  options: [optionSchema],
  answers: [answerSchema],
  pairs: [pairSchema]
}, { timestamps: true });

export const QuizModel = mongoose.model<IQuiz>('Quiz', QuizSchema);