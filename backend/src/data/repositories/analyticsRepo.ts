import { mockSystemMetrics, mockDepartmentAnalytics } from '../mockData';
export const analyticsRepo = {
  system: () => mockSystemMetrics,
  departments: () => mockDepartmentAnalytics
};