/*===================================================================
  3. src/components/admin/AnalyticsCards.tsx (KPI summary)
===================================================================*/
import type { SystemMetrics } from '../../types';
import { Card } from '../ui/card';

const getMetricIcon = (label: string) => {
  switch (label) {
    case 'Total Users':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      );
    case 'Active Users':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'Completed Assessments':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'Learning Paths':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      );
    default:
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      );
  }
};

const getMetricColor = (label: string) => {
  switch (label) {
    case 'Total Users':
      return 'text-blue-600 bg-blue-50';
    case 'Active Users':
      return 'text-emerald-600 bg-emerald-50';
    case 'Completed Assessments':
      return 'text-purple-600 bg-purple-50';
    case 'Learning Paths':
      return 'text-amber-600 bg-amber-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

const formatNumber = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toLocaleString();
};

export default function AnalyticsCards({ m }: { m: SystemMetrics }) {
  const items = [
    { 
      label: 'Total Users', 
      value: m.totalUsers,
      description: 'Registered users'
    },
    { 
      label: 'Active Users', 
      value: m.activeUsers,
      description: 'Last 30 days' 
    },
    { 
      label: 'Completed Assessments', 
      value: m.completedAssessments,
      description: 'All time total'
    },
    { 
      label: 'Learning Paths', 
      value: m.generatedPaths,
      description: 'Generated paths'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <Card 
          key={item.label} 
          className="relative overflow-hidden border border-gray-200 bg-white hover:shadow-md transition-all duration-200 group"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${getMetricColor(item.label)}`}>
                {getMetricIcon(item.label)}
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900 tracking-tight">
                {formatNumber(item.value)}
              </p>
              <p className="text-sm font-medium text-gray-900">
                {item.label}
              </p>
              <p className="text-xs text-gray-500">
                {item.description}
              </p>
            </div>
          </div>
          
          {/* Subtle accent line */}
          <div className={`absolute bottom-0 left-0 right-0 h-1 ${getMetricColor(item.label).split(' ')[1]} opacity-20`} />
        </Card>
      ))}
    </div>
  );
}
