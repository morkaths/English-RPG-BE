import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  level: string; // A1, A2, B1, B2, C1, C2
  lessons: string[];
  tags?: string[];
  thumbnail?: string;
  description?: string;
  rewardCoins?: number;
  rewardItems?: { id: string; quantity: number }[];
  createdAt?: Date;
  updatedAt?: Date;
}

const CourseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  level: { type: String, required: true },
  lessons: [{ type: String, required: true }],
  tags: [{ type: String }],
  thumbnail: { type: String },
  description: { type: String },
  rewardCoins: { type: Number },
  rewardItems: [
    {
      id: { type: String, required: true },
      quantity: { type: Number, required: true }
    }
  ]
}, { timestamps: true });

export const CourseModel = mongoose.model<ICourse>('Course', CourseSchema);