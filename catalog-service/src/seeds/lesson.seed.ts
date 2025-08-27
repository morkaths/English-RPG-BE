import { Lesson } from '../types';
import { LessonModel } from '../models/lesson.model';

export async function seedLessons() {
  await LessonModel.deleteMany({});

  const lessons: Omit<Lesson, '_id'>[] = [
    {
      title: "Greetings",
      content: "Learn how to greet people in English.",
    },
    {
      title: "Introducing Yourself",
      content: "Learn how to introduce yourself.",
    },
    {
      title: "Numbers",
      content: "Learn numbers from 1 to 100.",
    },
    {
      title: "Ordering Drinks",
      content: "Practice offering and ordering drinks.",
    }
  ];

  await LessonModel.insertMany(lessons);
  console.log('Seeded lessons!');
}