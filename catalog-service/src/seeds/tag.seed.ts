import { Tag } from '../types';
import { TagModel } from '../models/tag.model';

export async function seedTags() {

  const tags: Omit<Tag, '_id'>[] = [
    { name: "Grammar", type: "skill", color: "#f59e42" },
    { name: "Speaking", type: "skill", color: "#38bdf8" },
    { name: "Vocabulary", type: "skill", color: "#34d399" },
    { name: "Listening", type: "skill", color: "#a78bfa" },
    { name: "Reading", type: "skill", color: "#f87171" },
    { name: "Writing", type: "skill", color: "#fbbf24" },
    { name: "Pronunciation", type: "skill", color: "#10b981" },
    { name: "Communication", type: "skill", color: "#3b82f6" },
    { name: "Test", type: "topic", color: "#8b5cf6" },
    { name: "Entertainment", type: "topic", color: "#ec4899" },
  ];

  await TagModel.deleteMany({});
  await TagModel.insertMany(tags);
  console.log('Seeded tags!');
}
