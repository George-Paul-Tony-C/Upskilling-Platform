import { userRepo } from '../data/repositories/userRepo';
import { agentRepo } from '../data/repositories/agentRepo';
import { analyticsRepo } from '../data/repositories/analyticsRepo';

export const adminService = {
  listUsers: () => userRepo.findAll(),
  agentStatus: () => agentRepo.list(),
  analytics: () => ({ system: analyticsRepo.system(), departments: analyticsRepo.departments() })
};