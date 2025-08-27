import mongoose, { Document, Schema } from 'mongoose';

export interface ITag extends Document {
  name: string;
  type: 'topic' | 'skill' | 'item' | 'quest' | 'other';
  icon?: string;
  color?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const TagSchema = new Schema<ITag>({
  name: { type: String, required: true },
  type: { type: String, enum: ['topic', 'skill', 'item', 'quest', 'other'], required: true },
  icon: { type: String },
  color: { type: String }
}, { timestamps: true });

export const TagModel = mongoose.model<ITag>('Tag', TagSchema);
