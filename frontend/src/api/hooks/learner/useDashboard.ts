/*===================================================================
  1. src/api/hooks/learner/useDashboard.ts
===================================================================*/
import { useQuery } from '@tanstack/react-query';
import APIPATH from '../../APIPATH';
import { apiFetch } from '../../../lib/fetch';

export interface LearnerDashboard {
  user: {
    id: string;
    name: string;
    email: string;
    department: string;
    workflowStatus: { currentStep: number; learningInProgress: boolean };
  };
  skillVectors: { skill: string; proficiency: number; confidence: number }[];
  learningPath?: {
    modules: {
      id: string;
      title: string;
      status: 'completed' | 'in_progress' | 'not_started';
      estimatedTime: number;
    }[];
    completionPercentage: number;
  };
  progressMetrics: {
    completedModules: number;
    totalModules: number;
    completionPercentage: number;
  };
  lastAssessment?: { id: string; score: number };
}

export function useDashboard() {
  return useQuery({
    queryKey: ['learnerDashboard'],
    queryFn: () => apiFetch<LearnerDashboard>(APIPATH.LEARNER.DASHBOARD()),
    staleTime: 60 * 1_000 // 1 minute
  });
}
