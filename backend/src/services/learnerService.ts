import { userRepo } from '../data/repositories/userRepo';

export const learnerService = {
  getProfile: (id: string) => userRepo.findById(id),
  getLearningPath: (id: string) => userRepo.findById(id)?.learningPath
  // add assessment helpers later
};