/*=================================================================
  1. src/api/hooks/learner/useAssessment.ts
=================================================================*/
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import APIPATH from '../../APIPATH';
import { apiFetch } from '../../../lib/fetch';
import type { Assessment } from '../../../types';

export function useAssessment() {
  const qc = useQueryClient();

  const start = useMutation({
    mutationFn: (difficulty: 'beginner' | 'intermediate' | 'advanced') =>
      apiFetch<Assessment>(APIPATH.LEARNER.ASSESSMENT_START(), {
        method: 'POST',
        body: JSON.stringify({ difficulty })
      }),
    onSuccess: a => qc.setQueryData(['assessment', a.id], a)
  });

  const answer = useMutation({
    mutationFn: ({ assessmentId, questionId, selectedAnswer, timeSpent }: any) =>
      apiFetch<Assessment>(APIPATH.LEARNER.ASSESSMENT_ANSWER(assessmentId), {
        method: 'POST',
        body: JSON.stringify({ questionId, selectedAnswer, timeSpent })
      }),
    onSuccess: a => qc.setQueryData(['assessment', a.id], a)
  });

  const finish = useMutation({
    mutationFn: (assessmentId: string) =>
      apiFetch<Assessment>(APIPATH.LEARNER.ASSESSMENT_FINISH(assessmentId), {
        method: 'POST'
      }),
    onSuccess: a => qc.setQueryData(['assessment', a.id], a)
  });

  function useAssessmentQuery(id?: string) {
    return useQuery({
      enabled: !!id,
      queryKey: ['assessment', id],
      queryFn: () => apiFetch<Assessment>(APIPATH.LEARNER.ASSESSMENT_FINISH(id!))
    });
  }

  return { start, answer, finish, useAssessmentQuery };
}