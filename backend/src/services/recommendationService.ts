import { userRepo } from '../data/repositories/userRepo';
import { LearningPath } from '../types';

export const recommendationService = {
  getPath(userId: string): LearningPath | undefined {
    return userRepo.findById(userId)?.learningPath;
  }
};