/*===================================================================
  2. src/components/charts/SkillRadar.tsx
===================================================================*/
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Tooltip
} from 'recharts';

export interface SkillRadarProps {
  data: { skill: string; proficiency: number }[];
  title?: string;
  showInsights?: boolean;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const proficiencyLevel = getProficiencyLevel(value);
    
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 max-w-xs">
        <div className="text-sm font-medium text-gray-900 mb-1">
          {label}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${getProficiencyColor(value)}`} />
            <span className="text-sm text-gray-600">
              Proficiency: <span className="font-semibold text-gray-900">{value}%</span>
            </span>
          </div>
        </div>
        <div className="mt-1 text-xs text-gray-500 capitalize">
          {proficiencyLevel} Level
        </div>
      </div>
    );
  }
  return null;
};

const getProficiencyLevel = (value: number): string => {
  if (value >= 90) return 'Expert';
  if (value >= 75) return 'Advanced';
  if (value >= 60) return 'Intermediate';
  if (value >= 40) return 'Beginner';
  return 'Basic';
};

const getProficiencyColor = (value: number): string => {
  if (value >= 90) return 'bg-emerald-500';
  if (value >= 75) return 'bg-blue-500';
  if (value >= 60) return 'bg-indigo-500';
  if (value >= 40) return 'bg-amber-500';
  return 'bg-red-500';
};

const getRadarColors = (data: { skill: string; proficiency: number }[]) => {
  const averageProficiency = data.reduce((sum, item) => sum + item.proficiency, 0) / data.length;
  
  if (averageProficiency >= 80) {
    return {
      stroke: '#10b981', // Emerald
      fill: '#10b981',
      fillOpacity: 0.15
    };
  } else if (averageProficiency >= 65) {
    return {
      stroke: '#3b82f6', // Blue
      fill: '#3b82f6',
      fillOpacity: 0.15
    };
  } else if (averageProficiency >= 50) {
    return {
      stroke: '#6366f1', // Indigo
      fill: '#6366f1',
      fillOpacity: 0.15
    };
  } else {
    return {
      stroke: '#f59e0b', // Amber
      fill: '#f59e0b',
      fillOpacity: 0.15
    };
  }
};

export default function SkillRadar({ data, title = "Skill Proficiency", showInsights = true }: SkillRadarProps) {
  // Calculate insights
  const averageProficiency = data.length > 0 
    ? data.reduce((sum, item) => sum + item.proficiency, 0) / data.length 
    : 0;
  
  const strongestSkill = data.reduce((max, item) => 
    item.proficiency > max.proficiency ? item : max, 
    { skill: '', proficiency: 0 }
  );
  
  const weakestSkill = data.reduce((min, item) => 
    item.proficiency < min.proficiency ? item : min, 
    { skill: '', proficiency: 100 }
  );
  
  const expertSkills = data.filter(item => item.proficiency >= 90).length;
  const skillsNeedingWork = data.filter(item => item.proficiency < 60).length;

  const radarColors = getRadarColors(data);

  if (!data.length) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Skill Data Available</h3>
          <p className="text-gray-600 text-sm max-w-sm mx-auto">
            Complete your skills assessment to see your proficiency radar chart and personalized insights.
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Start Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600 mt-1">
              Overall proficiency across {data.length} skills
            </p>
          </div>
          
          {showInsights && (
            <div className="flex items-center space-x-4 text-sm">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">
                  {averageProficiency.toFixed(0)}%
                </div>
                <div className="text-xs text-gray-500">Average</div>
              </div>
              {expertSkills > 0 && (
                <div className="text-center">
                  <div className="text-lg font-bold text-emerald-600">{expertSkills}</div>
                  <div className="text-xs text-gray-500">Expert</div>
                </div>
              )}
              {skillsNeedingWork > 0 && (
                <div className="text-center">
                  <div className="text-lg font-bold text-amber-600">{skillsNeedingWork}</div>
                  <div className="text-xs text-gray-500">To Improve</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Chart Container */}
      <div className="p-6">
        <ResponsiveContainer width="100%" height={360}>
          <RadarChart data={data} outerRadius="75%" className="drop-shadow-sm">
            <PolarGrid 
              stroke="#e5e7eb" 
              strokeWidth={1}
              radialLines={true}
            />
            <PolarAngleAxis 
              dataKey="skill" 
              tick={{ 
                fontSize: 11, 
                fill: '#374151',
                fontWeight: 500
              }}
              className="text-gray-700"
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              tick={{ 
                fontSize: 10, 
                fill: '#6b7280'
              }}
              tickFormatter={(value) => `${value}%`}
              axisLine={false}
              tickCount={6}
            />
            <Tooltip content={<CustomTooltip />} />
            <Radar 
              dataKey="proficiency" 
              stroke={radarColors.stroke}
              fill={radarColors.fill}
              fillOpacity={radarColors.fillOpacity}
              strokeWidth={2.5}
              dot={{ 
                r: 4, 
                fill: radarColors.stroke,
                strokeWidth: 2,
                stroke: '#ffffff'
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Insights Section */}
      {showInsights && data.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Strongest Skill */}
            <div className="bg-white rounded-lg p-3 border border-emerald-200">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Strongest Skill</div>
                  <div className="text-xs text-emerald-600 font-semibold">
                    {strongestSkill.skill} ({strongestSkill.proficiency}%)
                  </div>
                </div>
              </div>
            </div>

            {/* Area for Improvement */}
            <div className="bg-white rounded-lg p-3 border border-amber-200">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Focus Area</div>
                  <div className="text-xs text-amber-600 font-semibold">
                    {weakestSkill.skill} ({weakestSkill.proficiency}%)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Proficiency Legend */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2" />
                <span className="text-gray-600">Expert (90%+)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
                <span className="text-gray-600">Advanced (75-89%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-indigo-500 rounded-full mr-2" />
                <span className="text-gray-600">Intermediate (60-74%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-amber-500 rounded-full mr-2" />
                <span className="text-gray-600">Beginner (40-59%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2" />
                <span className="text-gray-600">Basic (&lt;40%)</span>
              </div>
            </div>

            {/* Overall Assessment */}
            <div className="text-xs text-gray-500">
              {averageProficiency >= 80 ? (
                <span className="text-emerald-600 font-medium">🎯 Strong skill portfolio!</span>
              ) : averageProficiency >= 65 ? (
                <span className="text-blue-600 font-medium">📈 Good foundation, keep growing</span>
              ) : (
                <span className="text-amber-600 font-medium">🚀 Great potential for development</span>
              )}
            </div>
          </div>

          {/* Data Summary */}
          <div className="mt-3 text-xs text-gray-500 border-t border-gray-200 pt-2">
            Showing {data.length} skills • 
            Last updated {new Date().toLocaleDateString()} • 
            <span className="text-blue-600 hover:text-blue-700 cursor-pointer">View detailed breakdown</span>
          </div>
        </div>
      )}
    </div>
  );
}
