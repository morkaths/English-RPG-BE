import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  avatarUrl?: string;
  level?: number;
  exp?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: String,
  avatarUrl: String,
  level: Number,
  exp: Number
}, { timestamps: true });

export const UserModel = mongoose.model<IUser>('User', UserSchema);
