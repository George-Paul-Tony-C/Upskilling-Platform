import { Assessment } from '../../types';

// keyed by assessmentId
const assessments = new Map<string, Assessment>();

export const assessmentRepo = {
  create(a: Assessment) {
    assessments.set(a.id, a);
    return a;
  },
  find(id: string) {
    return assessments.get(id);
  },
  findByUser(userId: string) {
    return [...assessments.values()].filter(a => a.userId === userId);
  },
  update(id: string, patch: Partial<Assessment>) {
    const current = assessments.get(id);
    if (!current) return undefined;
    const updated = { ...current, ...patch } as Assessment;
    assessments.set(id, updated);
    return updated;
  }
};