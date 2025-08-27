import { CourseModel } from '../models/course.model';
import { LessonModel } from '../models/lesson.model';
import { TagModel } from '../models/tag.model';

export async function seedCourses() {
  // Lấy các lesson theo title
  const greetings = await LessonModel.findOne({ title: "Greetings" });
  const introducing = await LessonModel.findOne({ title: "Introducing Yourself" });
  const numbers = await LessonModel.findOne({ title: "Numbers" });
  const ordering = await LessonModel.findOne({ title: "Ordering Drinks" });

  // Lấy tag theo name
  const grammar = await TagModel.findOne({ name: "Grammar" });
  const speaking = await TagModel.findOne({ name: "Speaking" });
  const vocabulary = await TagModel.findOne({ name: "Vocabulary" });
  const reading = await TagModel.findOne({ name: "Reading" });
  const writing = await TagModel.findOne({ name: "Writing" });

  if (!greetings || !introducing || !numbers || !ordering ||
    !grammar || !speaking || !vocabulary || !reading || !writing) {
    console.error('One or more lessons or tags not found!');
    return;
  }

  const courses = [
    {
      title: "English A1",
      level: "A1",
      lessons: [greetings._id, introducing._id],
      tags: [grammar._id, speaking._id, vocabulary._id],
      description: "Beginner English course",
    },
    {
      title: "English A2",
      level: "A2",
      lessons: [numbers._id, ordering._id],
      tags: [vocabulary._id, reading._id, writing._id],
      description: "Elementary English course",
    },
    {
      title: "English B1",
      level: "B1",
      lessons: [],
      tags: [reading._id, writing._id],
      description: "Intermediate English course",
    },
    {
      title: "English C1",
      level: "C1",
      lessons: [],
      tags: [grammar._id, writing._id],
      description: "Advanced English course",
    },
    {
      title: "English C2",
      level: "C2",
      lessons: [],
      tags: [grammar._id, reading._id, writing._id],
      description: "Proficient English course",
    },
  ];
  await CourseModel.deleteMany({});
  await CourseModel.insertMany(courses);
  console.log('Seeded courses!');
}