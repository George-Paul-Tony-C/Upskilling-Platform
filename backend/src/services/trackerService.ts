import { assessmentRepo } from '../data/repositories/assessmentRepo';

export const trackerService = {
  latestAssessment(userId: string) {
    const all = assessmentRepo.findByUser(userId);
    return all.sort((a,b)=> (b.completedAt?.getTime()||0) - (a.completedAt?.getTime()||0))[0];
  }
};