import { v4 as uuid } from 'uuid';
import { assessmentRepo } from '../data/repositories/assessmentRepo';
import { Question, Assessment } from '../types';

// mock question bank – replace with real DB later
const QUESTION_BANK: Question[] = [
  { id: 'q1', text: 'What is React?', options: ['Library','Framework','Language','OS'], correctAnswer: 0, skill: 'React', difficulty: 1 },
  { id: 'q2', text: 'Promise.resolve(5) returns?', options: ['number','promise','string','array'], correctAnswer: 1, skill: 'JavaScript', difficulty: 1 }
];

export const assessmentService = {
  start(userId: string, difficulty: 'beginner'|'intermediate'|'advanced'): Assessment {
    const selected = QUESTION_BANK.filter(q => q.difficulty <= (difficulty==='beginner'?1: difficulty==='intermediate'?2:3)).slice(0,5);
    const id = uuid();
    const a: Assessment = {
      id, userId, questions: selected, responses: [], score: 0, difficulty
    };
    return assessmentRepo.create(a);
  },
  answer(assessmentId: string, questionId: string, selectedAnswer: number, timeSpent: number) {
    const a = assessmentRepo.find(assessmentId);
    if (!a) return undefined;
    const q = a.questions.find(q => q.id === questionId);
    if (!q) return undefined;
    const isCorrect = selectedAnswer === q.correctAnswer;
    a.responses.push({ questionId, selectedAnswer, timeSpent, isCorrect });
    return assessmentRepo.update(assessmentId, a);
  },
  finish(assessmentId: string) {
    const a = assessmentRepo.find(assessmentId);
    if (!a) return undefined;
    const correct = a.responses.filter(r => r.isCorrect).length;
    const score = correct / a.questions.length;
    return assessmentRepo.update(assessmentId, { score, completedAt: new Date() });
  }
};