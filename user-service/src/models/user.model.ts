import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  role: 'admin' | 'staff' | 'user';
  avatar?: string;
  isVerified: boolean;
  joinedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  username: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true, 
    minlength: 3, 
    maxlength: 32 
  },
  password: { 
    type: String, 
    required: true, 
    minlength: 6 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  role: { 
    type: String, 
    enum: ['admin', 'staff', 'user'], 
    default: 'user' 
  },
  avatar: { 
    type: String, 
    default: '' 
  },
  isVerified: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true });

async function hashPasswordInUpdate(this: any, next: Function) {
  let update: any = this.getUpdate();

  if (update?.$set && update.$set.password) {
    const salt = await bcrypt.genSalt(12);
    update.$set.password = await bcrypt.hash(update.$set.password, salt);
  } else if (update?.password) {
    const salt = await bcrypt.genSalt(12);
    update.password = await bcrypt.hash(update.password, salt);
  }

  this.setUpdate(update);
  next();
}

// Hash password before saving (create)
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Hash password before update (findByIdAndUpdate, findOneAndUpdate, updateOne)
UserSchema.pre('findOneAndUpdate', hashPasswordInUpdate);
UserSchema.pre('updateOne', hashPasswordInUpdate);
UserSchema.pre('updateMany', hashPasswordInUpdate);

// Compare password method
UserSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export const UserModel = mongoose.model<IUser>('User', UserSchema);
