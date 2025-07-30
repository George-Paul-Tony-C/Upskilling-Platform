/*===================================================================
  1. src/api/hooks/admin/useDashboard.ts
===================================================================*/
import { useQuery } from '@tanstack/react-query';
import APIPATH from '../../APIPATH';
import { apiFetch } from '../../../lib/fetch';
import type { AgentStatus, SystemMetrics, DepartmentAnalytics } from '../../../types';

export interface AdminDashboardPayload {
  systemMetrics: SystemMetrics;
  departmentAnalytics: DepartmentAnalytics[];
  agentStatuses: AgentStatus[];
  totals: { learners: number; admins: number; departments: number };
}

export function useAdminDashboard() {
  return useQuery({
    queryKey: ['adminDashboard'],
    queryFn: () => apiFetch<AdminDashboardPayload>(APIPATH.ADMIN.DASHBOARD()),
    staleTime: 60 * 1_000
  });
}