// ────────────────────────────────────────────────────────────────────────────────
// Catalog Service: Quản lý nội dung, danh mục
// ────────────────────────────────────────────────────────────────────────────────
// Gắn thẻ
export interface Tag {
  _id: string;
  name: string;
  type: 'topic' | "skill" | 'item' | 'quest' | 'other';
  icon?: string;
  color?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
// Nhân vật
export interface Character {
  _id: string;
  name: string;
  figure: string;
  hp: number;
  atk: number;
  def: number;
  critRate?: number;
  critDamage?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
// Khóa học
export interface Course {
  _id: string;
  title: string;
  level: string; // A1, A2, B1, B2, C1, C2
  lessons: string[]; // Lesson._id[]
  tags?: string[]; //Tag._id[]
  thumbnail?: string;
  description?: string;
  rewardCoins?: number;
  rewardItems?: { id: string; quantity: number }[];
  createdAt?: Date;
  updatedAt?: Date;
}
// Bài học
export interface Lesson {
  _id: string;
  title: string;
  content: string;
  tags?: string[];
  resources?: string[];
  monsterId?: string; // Character._id
  rewardCoins?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
// Câu hỏi
export interface BaseQuiz {
  _id: string;
  lessonId: string; // Lesson._id
  type: 'choice' | 'fill_blank' | 'matching';
  question: string;
  timeLimit?: number; // seconds
  rewardExp?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ChoiceQuiz extends BaseQuiz {
  type: 'choice';
  options: { _id: string; text: string; isCorrect: boolean }[];
}

export interface FillBlankQuiz extends BaseQuiz {
  type: 'fill_blank';
  answers: { _id: string; text: string }[]
}

export interface MatchingQuiz extends BaseQuiz {
  type: 'matching';
  pairs: { _id:string; left: string; right: string }[];
}

export type Quiz = ChoiceQuiz | FillBlankQuiz | MatchingQuiz;