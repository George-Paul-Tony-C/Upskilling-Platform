/*===================================================================
  3. src/components/learner/KPIGrid.tsx
===================================================================*/
import { Card } from "../ui/card";
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Target, 
  TrendingUp, 
  Award,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react';

interface KPIGridProps {
  completed: number;
  total: number;
  percentage: number;
  lastScore?: number;
  streak?: number;
  timeSpent?: number; // in minutes
  isLoading?: boolean;
}

const getPerformanceColor = (percentage: number) => {
  if (percentage >= 90) return 'emerald';
  if (percentage >= 75) return 'blue';
  if (percentage >= 60) return 'indigo';
  if (percentage >= 40) return 'amber';
  return 'red';
};

const getScoreColor = (score: number) => {
  if (score >= 0.9) return 'emerald';
  if (score >= 0.8) return 'blue';
  if (score >= 0.7) return 'indigo';
  if (score >= 0.6) return 'amber';
  return 'red';
};

const formatTime = (minutes: number): string => {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { y: -4, scale: 1.02 }
};

const progressVariants = {
  hidden: { width: 0 },
  visible: { width: '100%' }
};

export default function KPIGrid({ 
  completed, 
  total, 
  percentage, 
  lastScore, 
  streak = 0,
  timeSpent = 0,
  isLoading = false 
}: KPIGridProps) {
  
  const completionColor = getPerformanceColor(percentage);
  const scoreColor = lastScore ? getScoreColor(lastScore) : 'gray';
  
  const items = [
    {
      id: 'completed',
      label: 'Modules Completed',
      value: completed,
      total: total,
      description: `${completed} of ${total} modules`,
      icon: CheckCircle,
      color: 'blue',
      showProgress: true,
      progressValue: total > 0 ? (completed / total) * 100 : 0,
      format: (val: number) => val.toString()
    },
    {
      id: 'completion',
      label: 'Path Completion',
      value: percentage,
      description: 'Overall progress',
      icon: Target,
      color: completionColor,
      showProgress: true,
      progressValue: percentage,
      format: (val: number) => `${val}%`
    },
    ...(lastScore !== undefined ? [{
      id: 'assessment',
      label: 'Last Assessment',
      value: Math.round(lastScore * 100),
      description: 'Recent performance',
      icon: Award,
      color: scoreColor,
      showProgress: false,
      progressValue: lastScore * 100,
      format: (val: number) => `${val}%`
    }] : []),
    ...(timeSpent > 0 ? [{
      id: 'time',
      label: 'Time Invested',
      value: timeSpent,
      description: 'Learning duration',
      icon: Clock,
      color: 'purple' as const,
      showProgress: false,
      progressValue: 0,
      format: (val: number) => formatTime(val)
    }] : []),
    ...(streak > 0 ? [{
      id: 'streak',
      label: 'Learning Streak',
      value: streak,
      description: 'Consecutive days',
      icon: Zap,
      color: 'orange' as const,
      showProgress: false,
      progressValue: 0,
      format: (val: number) => `${val} days`
    }] : [])
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="p-6 animate-pulse">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-5 h-5 bg-gray-200 rounded" />
                <div className="w-8 h-8 bg-gray-200 rounded-lg" />
              </div>
              <div>
                <div className="h-8 bg-gray-200 rounded w-16 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-24" />
              </div>
              <div className="w-full h-2 bg-gray-200 rounded" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item, index) => {
        const IconComponent = item.icon;
        
        return (
          <motion.div
            key={item.id}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            transition={{ 
              duration: 0.3, 
              delay: index * 0.1,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            <Card className="relative overflow-hidden border border-gray-200 bg-white hover:shadow-lg transition-all duration-300 group">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <TrendingUp size={14} className="text-gray-400" />
                  </div>
                  <div className={`p-2 rounded-lg bg-${item.color}-50 text-${item.color}-600 group-hover:scale-110 transition-transform duration-200`}>
                    <IconComponent size={20} />
                  </div>
                </div>

                {/* Main Content */}
                <div className="space-y-2 mb-4">
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-3xl font-bold text-gray-900 tracking-tight"
                  >
                    {item.format(item.value)}
                  </motion.div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {item.label}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                {item.showProgress && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500">Progress</span>
                      <span className={`font-medium text-${item.color}-600`}>
                        {Math.round(item.progressValue)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className={`h-full bg-${item.color}-500 rounded-full`}
                        variants={progressVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ 
                          duration: 1.2, 
                          delay: index * 0.2 + 0.5,
                          ease: [0.4, 0, 0.2, 1]
                        }}
                        style={{ width: `${item.progressValue}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Achievement Indicators */}
                {item.id === 'completion' && percentage === 100 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="absolute top-2 right-2"
                  >
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                      <CheckCircle size={14} className="text-white" />
                    </div>
                  </motion.div>
                )}

                {/* Streak Fire Effect */}
                {item.id === 'streak' && streak >= 7 && (
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    className="absolute top-2 right-2"
                  >
                    <div className="text-orange-500">🔥</div>
                  </motion.div>
                )}
              </div>

              {/* Accent Line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-${item.color}-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
            </Card>
          </motion.div>
        );
      })}

      {/* Summary Card (when all data available) */}
      {items.length >= 3 && (
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          transition={{ 
            duration: 0.3, 
            delay: items.length * 0.1,
            ease: [0.4, 0, 0.2, 1]
          }}
          className="sm:col-span-2 lg:col-span-1"
        >
          <Card className="relative overflow-hidden border border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-100 hover:shadow-lg transition-all duration-300 group">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Overview</h3>
                <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                  <BookOpen size={20} />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Overall Progress</span>
                  <span className="text-sm font-semibold text-blue-600">
                    {percentage >= 80 ? 'Excellent' : percentage >= 60 ? 'Good' : percentage >= 40 ? 'Fair' : 'Getting Started'}
                  </span>
                </div>

                {lastScore && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Performance</span>
                    <span className={`text-sm font-semibold text-${scoreColor}-600`}>
                      {lastScore >= 0.9 ? 'Outstanding' : lastScore >= 0.8 ? 'Great' : lastScore >= 0.7 ? 'Good' : 'Improving'}
                    </span>
                  </div>
                )}

                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">
                    {percentage === 100 
                      ? '🎉 Congratulations on completing your learning path!'
                      : completed === 0 
                      ? '🚀 Ready to start your learning journey?'
                      : `${total - completed} modules remaining to complete`
                    }
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
