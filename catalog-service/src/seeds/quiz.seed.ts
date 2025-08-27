import { QuizModel } from '../models/quiz.model';
import { LessonModel } from '../models/lesson.model';

export async function seedQuizzes() {
  // Lấy lesson theo thứ tự bạn muốn map (ví dụ theo title)
  const lesson1 = await LessonModel.findOne({ title: "Greetings" });
  const lesson2 = await LessonModel.findOne({ title: "Introducing Yourself" });
  const lesson3 = await LessonModel.findOne({ title: "Numbers" });

  if (!lesson1 || !lesson2 || !lesson3) {
    console.error('One or more lessons not found!');
    return;
  }

  const quizzes = [
    {
      lessonId: lesson1._id,
      type: "choice",
      question: "What do you say to offer a guest a drink?",
      timeLimit: 30,
      rewardExp: 100,
      options: [
        { text: "Would you like some water?", isCorrect: true },
        { text: "Goodbye!", isCorrect: false },
      ],
    },
    {
      lessonId: lesson1._id,
      type: "fill_blank",
      question: "She is drinking ____.",
      timeLimit: 30,
      rewardExp: 100,
      answers: [
        { text: "water" }
      ]
    },
    {
      lessonId: lesson1._id,
      type: "matching",
      question: "Match the English words with their Vietnamese meanings.",
      timeLimit: 40,
      rewardExp: 120,
      pairs: [
        { left: "Water", right: "Nước" },
        { left: "Milk", right: "Sữa" },
        { left: "Tea", right: "Trà" },
      ]
    },
    {
      lessonId: lesson2._id,
      type: "choice",
      question: "How do you greet someone in the morning?",
      timeLimit: 20,
      rewardExp: 80,
      options: [
        { text: "Good morning!", isCorrect: true },
        { text: "Good night!", isCorrect: false },
        { text: "See you!", isCorrect: false },
      ],
    },
    {
      lessonId: lesson2._id,
      type: "fill_blank",
      question: "____ morning!",
      timeLimit: 20,
      rewardExp: 80,
      answers: [
        { text: "Good" }
      ]
    },
    {
      lessonId: lesson2._id,
      type: "choice",
      question: "Which sentence is used to introduce yourself?",
      timeLimit: 25,
      rewardExp: 90,
      options: [
        { text: "My name is Anna.", isCorrect: true },
        { text: "How old are you?", isCorrect: false },
        { text: "Nice to meet you.", isCorrect: false },
      ],
    },
    {
      lessonId: lesson3._id,
      type: "fill_blank",
      question: "My name is ____.",
      timeLimit: 25,
      rewardExp: 90,
      answers: [
        { text: "Anna" }
      ]
    },
    {
      lessonId: lesson3._id,
      type: "matching",
      question: "Match the English sentences with their Vietnamese meanings.",
      timeLimit: 40,
      rewardExp: 120,
      pairs: [
        { left: "My name is Anna.", right: "Tên tôi là Anna." },
        { left: "How old are you?", right: "Bạn bao nhiêu tuổi?" },
        { left: "Nice to meet you.", right: "Rất vui được gặp bạn." },
      ]
    },
    {
      lessonId: lesson3._id,
      type: "choice",
      question: "My name is ____.",
      timeLimit: 25,
      rewardExp: 90,
      options: [
        { text: "Anna", isCorrect: true },
        { text: "John", isCorrect: false },
        { text: "Mary", isCorrect: false },
      ]
    }
  ];

  await QuizModel.deleteMany({});
  await QuizModel.insertMany(quizzes);
  console.log('Seeded quizzes!');
}