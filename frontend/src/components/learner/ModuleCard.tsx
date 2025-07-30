/*===================================================================
  4. src/components/learner/ModuleCard.tsx
===================================================================*/
import { motion } from 'framer-motion';
import { 
  PlayCircle, 
  CheckCircle, 
  Clock, 
  BookOpen, 
  Star,
  ArrowRight,
  Lock,
  Timer,
  Award
} from 'lucide-react';
import clsx from 'clsx';

interface ModuleCardProps {
  title: string;
  status: 'completed' | 'in_progress' | 'not_started' | 'locked';
  estimatedTime: number;
  progress?: number; // 0-100 for in_progress modules
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  completionDate?: string;
  rating?: number; // 1-5 stars
  description?: string;
  isLoading?: boolean;
  onClick?: () => void;
  tags?: string[];
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'completed':
      return {
        colors: 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100',
        textColor: 'text-emerald-700',
        accentColor: 'bg-emerald-500',
        icon: CheckCircle,
        iconColor: 'text-emerald-600',
        label: 'Completed',
        actionText: 'Review'
      };
    case 'in_progress':
      return {
        colors: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
        textColor: 'text-blue-700',
        accentColor: 'bg-blue-500',
        icon: PlayCircle,
        iconColor: 'text-blue-600',
        label: 'In Progress',
        actionText: 'Continue'
      };
    case 'locked':
      return {
        colors: 'bg-gray-50 border-gray-200 hover:bg-gray-100',
        textColor: 'text-gray-500',
        accentColor: 'bg-gray-400',
        icon: Lock,
        iconColor: 'text-gray-400',
        label: 'Locked',
        actionText: 'Unlock'
      };
    default: // not_started
      return {
        colors: 'bg-white border-gray-200 hover:bg-gray-50',
        textColor: 'text-gray-600',
        accentColor: 'bg-gray-400',
        icon: BookOpen,
        iconColor: 'text-gray-500',
        label: 'Not Started',
        actionText: 'Start'
      };
  }
};

const getDifficultyConfig = (difficulty?: string) => {
  switch (difficulty) {
    case 'beginner':
      return { color: 'bg-green-100 text-green-700', dots: 1 };
    case 'intermediate':
      return { color: 'bg-amber-100 text-amber-700', dots: 2 };
    case 'advanced':
      return { color: 'bg-red-100 text-red-700', dots: 3 };
    default:
      return { color: 'bg-gray-100 text-gray-600', dots: 1 };
  }
};

const formatTime = (minutes: number): string => {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  hover: { y: -4, scale: 1.02 }
};

const progressVariants = {
  hidden: { width: 0 },
  visible: { width: '100%' }
};

export default function ModuleCard({ 
  title, 
  status, 
  estimatedTime, 
  progress = 0,
  difficulty = 'beginner',
  completionDate,
  rating,
  description,
  isLoading = false,
  onClick,
  tags = []
}: ModuleCardProps) {
  
  const statusConfig = getStatusConfig(status);
  const difficultyConfig = getDifficultyConfig(difficulty);
  const IconComponent = statusConfig.icon;

  if (isLoading) {
    return (
      <div className="p-6 rounded-xl border border-gray-200 bg-white animate-pulse">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded-lg" />
          </div>
          <div className="h-2 bg-gray-200 rounded w-full" />
          <div className="flex justify-between items-center">
            <div className="h-3 bg-gray-200 rounded w-16" />
            <div className="h-6 bg-gray-200 rounded w-20" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      transition={{ 
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }}
      onClick={onClick}
      className={clsx(
        'relative overflow-hidden rounded-xl border-2 shadow-sm transition-all duration-300 cursor-pointer group',
        statusConfig.colors,
        onClick && 'hover:shadow-lg',
        status === 'locked' && 'cursor-not-allowed opacity-75'
      )}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white to-transparent" />
      </div>

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              {/* Status Icon */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: status === 'completed' ? 360 : 0 }}
                transition={{ duration: 0.3 }}
                className={`p-1.5 rounded-lg ${statusConfig.iconColor} bg-white/50`}
              >
                <IconComponent size={20} />
              </motion.div>

              {/* Difficulty Indicator */}
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyConfig.color}`}>
                <div className="flex items-center space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full ${
                        i < difficultyConfig.dots ? 'bg-current' : 'bg-current opacity-30'
                      }`}
                    />
                  ))}
                  <span className="ml-1 capitalize">{difficulty}</span>
                </div>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate group-hover:text-gray-700 transition-colors">
              {title}
            </h3>

            {/* Description */}
            {description && (
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {description}
              </p>
            )}
          </div>

          {/* Action Button */}
          {status !== 'locked' && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <div className={`p-2 rounded-lg bg-white shadow-sm border border-gray-200 ${statusConfig.textColor}`}>
                <ArrowRight size={16} />
              </div>
            </motion.div>
          )}
        </div>

        {/* Progress Bar (for in_progress status) */}
        {status === 'in_progress' && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-gray-600">Progress</span>
              <span className="text-xs font-semibold text-blue-600">{progress}%</span>
            </div>
            <div className="w-full bg-white/50 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-blue-500 rounded-full"
                variants={progressVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 1, delay: 0.3 }}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="px-2 py-1 bg-white/60 text-xs font-medium text-gray-600 rounded-md"
              >
                {tag}
              </motion.span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-1 bg-white/60 text-xs font-medium text-gray-500 rounded-md">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Time and Status */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-gray-600">
              <Timer size={14} />
              <span className="text-sm font-medium">{formatTime(estimatedTime)}</span>
            </div>
            
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.textColor} bg-white/60`}>
              {statusConfig.label}
            </div>
          </div>

          {/* Rating (for completed modules) */}
          {status === 'completed' && rating && (
            <div className="flex items-center space-x-1">
              <Star size={14} className="text-amber-500 fill-current" />
              <span className="text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
            </div>
          )}

          {/* Completion Date */}
          {status === 'completed' && completionDate && (
            <div className="text-xs text-gray-500">
              Completed {completionDate}
            </div>
          )}
        </div>

        {/* Achievement Badge */}
        {status === 'completed' && rating && rating >= 4.5 && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute top-3 right-3"
          >
            <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
              <Award size={16} className="text-white" />
            </div>
          </motion.div>
        )}

        {/* Lock Overlay */}
        {status === 'locked' && (
          <div className="absolute inset-0 bg-gray-100/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <div className="text-center">
              <Lock size={24} className="text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-500">Complete previous modules</p>
            </div>
          </div>
        )}
      </div>

      {/* Accent Border */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 ${statusConfig.accentColor} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}
