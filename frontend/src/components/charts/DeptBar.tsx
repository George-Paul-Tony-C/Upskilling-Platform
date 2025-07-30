/*===================================================================
  4. src/components/charts/DeptBar.tsx – department completion rates
===================================================================*/
import type { DepartmentAnalytics } from '../../types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid,
  Cell
} from 'recharts';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const percentage = (value * 100).toFixed(1);
    
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
        <div className="text-sm font-medium text-gray-900 mb-1">
          {label}
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-sm mr-2" />
          <span className="text-sm text-gray-600">
            Completion Rate: <span className="font-semibold text-gray-900">{percentage}%</span>
          </span>
        </div>
        <div className="mt-1 text-xs text-gray-500">
          {value < 0.5 ? 'Below Average' : value > 0.8 ? 'Excellent' : 'Good Progress'}
        </div>
      </div>
    );
  }
  return null;
};

const getBarColor = (value: number, index: number) => {
  // Performance-based color coding
  if (value >= 0.9) return '#10b981'; // Emerald - Excellent
  if (value >= 0.75) return '#3b82f6'; // Blue - Good
  if (value >= 0.5) return '#f59e0b'; // Amber - Average
  return '#ef4444'; // Red - Needs Improvement
};

const formatDepartmentName = (name: string) => {
  // Truncate long department names for better display
  return name.length > 15 ? `${name.substring(0, 12)}...` : name;
};

export default function DeptBar({ data }: { data: DepartmentAnalytics[] }) {
  // Sort data by completion rate for better visualization
  const sortedData = [...data].sort((a, b) => b.completionRate - a.completionRate);
  
  // Calculate statistics for insights
  const averageRate = data.reduce((sum, dept) => sum + dept.completionRate, 0) / data.length;
  const highPerformers = data.filter(dept => dept.completionRate >= 0.8).length;
  const lowPerformers = data.filter(dept => dept.completionRate < 0.5).length;

  if (!data.length) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Department Data</h3>
          <p className="text-gray-600 text-sm">
            Department completion data will appear here once assessments are completed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Department Performance</h3>
            <p className="text-sm text-gray-600 mt-1">Completion rates by department</p>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="text-center">
              <div className="text-lg font-bold text-emerald-600">{highPerformers}</div>
              <div className="text-xs text-gray-500">High Performers</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">{(averageRate * 100).toFixed(0)}%</div>
              <div className="text-xs text-gray-500">Average Rate</div>
            </div>
            {lowPerformers > 0 && (
              <div className="text-center">
                <div className="text-lg font-bold text-red-600">{lowPerformers}</div>
                <div className="text-xs text-gray-500">Needs Support</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="p-6">
        <ResponsiveContainer width="100%" height={Math.max(320, data.length * 45)}>
          <BarChart 
            data={sortedData} 
            layout="vertical" 
            margin={{ top: 10, right: 20, left: 120, bottom: 10 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#f3f4f6" 
              horizontal={true}
              vertical={false}
            />
            <XAxis 
              type="number" 
              domain={[0, 1]} 
              tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickCount={6}
            />
            <YAxis 
              dataKey="department" 
              type="category" 
              width={110}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#374151', fontWeight: 500 }}
              tickFormatter={formatDepartmentName}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
            />
            <Bar 
              dataKey="completionRate" 
              radius={[0, 4, 4, 0]}
              maxBarSize={32}
            >
              {sortedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getBarColor(entry.completionRate, index)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend and Insights */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Performance Legend */}
          <div className="flex items-center space-x-6 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-emerald-500 rounded-sm mr-2" />
              <span className="text-gray-600">Excellent (90%+)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-sm mr-2" />
              <span className="text-gray-600">Good (75-89%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-amber-500 rounded-sm mr-2" />
              <span className="text-gray-600">Average (50-74%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-sm mr-2" />
              <span className="text-gray-600">Needs Support (&lt;50%)</span>
            </div>
          </div>

          {/* Quick Insight */}
          <div className="text-xs text-gray-500">
            {averageRate >= 0.8 ? (
              <span className="text-emerald-600 font-medium">🎉 Overall performance is excellent!</span>
            ) : averageRate >= 0.6 ? (
              <span className="text-blue-600 font-medium">📈 Good progress across departments</span>
            ) : (
              <span className="text-amber-600 font-medium">⚠️ Some departments need attention</span>
            )}
          </div>
        </div>

        {/* Data Summary */}
        <div className="mt-3 text-xs text-gray-500">
          Showing {data.length} departments • Sorted by completion rate • 
          Data refreshed {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
