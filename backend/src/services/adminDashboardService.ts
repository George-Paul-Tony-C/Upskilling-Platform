import { adminService } from './adminService';
import { agentRepo } from '../data/repositories/agentRepo';
import { analyticsRepo } from '../data/repositories/analyticsRepo';
import { userRepo } from '../data/repositories/userRepo';

export interface AdminDashboard {
  systemMetrics: ReturnType<typeof analyticsRepo.system>;
  departmentAnalytics: ReturnType<typeof analyticsRepo.departments>;
  agentStatuses: ReturnType<typeof agentRepo.list>;
  totals: {
    learners: number;
    admins: number;
    departments: number;
  };
}

export const adminDashboardService = {
  get(): AdminDashboard {
    const users = userRepo.findAll();
    return {
      systemMetrics: analyticsRepo.system(),
      departmentAnalytics: analyticsRepo.departments(),
      agentStatuses: agentRepo.list(),
      totals: {
        learners: users.filter(u => u.role === 'learner').length,
        admins: users.filter(u => u.role === 'admin').length,
        departments: new Set(users.map(u => u.department)).size
      }
    };
  }
};