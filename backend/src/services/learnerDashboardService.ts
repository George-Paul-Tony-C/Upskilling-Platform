import { userRepo } from '../data/repositories/userRepo';
import { assessmentRepo } from '../data/repositories/assessmentRepo';
import { LearningPath, User } from '../types';

export interface LearnerDashboard {
  user: Pick<User, 'id' | 'name' | 'email' | 'department' | 'workflowStatus'>;
  skillVectors: { skill: string; proficiency: number; confidence: number }[];
  learningPath?: LearningPath;
  progressMetrics: {
    completedModules: number;
    totalModules: number;
    completionPercentage: number;
  };
  lastAssessment?: {
    id: string;
    score: number;
    completedAt?: Date;
  };
  performanceRatings: User['skillProfile'] extends undefined ? [] : NonNullable<User['skillProfile']>['performanceRatings'];
}

export const learnerDashboardService = {
  get(userId: string): LearnerDashboard | undefined {
    const user = userRepo.findById(userId);
    if (!user) return undefined;

    const skillVectors = user.skillProfile?.skills.map(({ skill, proficiency, confidence }) => ({
      skill,
      proficiency,
      confidence
    })) ?? [];

    const lp = user.learningPath;
    const completedModules = lp?.modules.filter(m => m.status === 'completed').length ?? 0;
    const totalModules = lp?.modules.length ?? 0;

    const assessments = assessmentRepo.findByUser(userId);
    const last = assessments.sort((a,b) => (b.completedAt?.getTime()||0) - (a.completedAt?.getTime()||0))[0];

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        department: user.department,
        workflowStatus: user.workflowStatus
      },
      skillVectors,
      learningPath: lp,
      progressMetrics: {
        completedModules,
        totalModules,
        completionPercentage: lp?.completionPercentage ?? 0
      },
      lastAssessment: last ? { id: last.id, score: last.score, completedAt: last.completedAt } : undefined,
      performanceRatings: user.skillProfile?.performanceRatings ?? []
    };
  }
};