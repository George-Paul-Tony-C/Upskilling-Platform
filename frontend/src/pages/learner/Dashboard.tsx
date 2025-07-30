/*===================================================================
  5. src/pages/learner/Dashboard.tsx – Fixed and Enhanced Version
===================================================================*/
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen,
  Target,
  Award,
  TrendingUp,
  Clock,
  Star,
  Zap,
  Calendar,
  Play,
  CheckCircle,
  ArrowRight,
  Trophy,
  Flame,        // ✅ Fixed: Changed from Fire to Flame
  Users,
  Bell,
  Settings,
  Download,
  RefreshCw,
  ChevronRight,
  Plus,
  BarChart3,
  Brain,
  Lightbulb,
  Heart
} from 'lucide-react';
import SkillRadar from '../../components/charts/SkillRadar';
import KPIGrid from '../../components/learner/KPIGrid';
import ModuleCard from '../../components/learner/ModuleCard';
import { useDashboard } from '../../api/hooks/learner/useDashboard';
import { Card, CardContent } from '../../components/ui/card';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  }
};

const headerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  }
};

export default function LearnerDashboard() {
  const { data, isLoading, error, refetch } = useDashboard();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getMotivationalMessage = (progress: number) => {
    if (progress >= 90) return "Outstanding progress! You're almost there! 🎉";
    if (progress >= 75) return "Excellent work! Keep up the momentum! 🚀";
    if (progress >= 50) return "Great progress! You're halfway there! 💪";
    if (progress >= 25) return "Good start! Keep building your skills! 📚";
    return "Welcome to your learning journey! Let's get started! ✨";
  };

  // Mock data for enhanced features
  const mockNotifications = [
    { id: 1, title: 'New module available: Advanced React Patterns', type: 'new', time: '2h ago' },
    { id: 2, title: 'Quiz reminder: JavaScript Fundamentals due tomorrow', type: 'reminder', time: '4h ago' },
    { id: 3, title: 'Achievement unlocked: Week Streak Champion!', type: 'achievement', time: '1d ago' }
  ];

  const mockUpcomingDeadlines = [
    { id: 1, title: 'React Hooks Assessment', dueDate: '2024-01-15', priority: 'high' },
    { id: 2, title: 'TypeScript Project Submission', dueDate: '2024-01-18', priority: 'medium' }
  ];

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Skeleton */}
          <div className="animate-pulse">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full" />
                  <div className="space-y-2">
                    <div className="h-6 bg-gray-200 rounded w-48" />
                    <div className="h-4 bg-gray-200 rounded w-32" />
                  </div>
                </div>
                <div className="flex space-x-3">
                  <div className="h-10 bg-gray-200 rounded w-24" />
                  <div className="h-10 bg-gray-200 rounded w-24" />
                </div>
              </div>
            </div>
          </div>

          {/* Content Skeletons */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-lg" />
                    <div className="w-4 h-4 bg-gray-200 rounded" />
                  </div>
                  <div>
                    <div className="h-8 bg-gray-200 rounded w-16 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl border border-red-200 shadow-xl p-8 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <BookOpen size={32} className="text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Dashboard Unavailable
          </h2>
          <p className="text-gray-600 mb-6">
            We're having trouble loading your learning dashboard. Please try refreshing the page.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen"
    >
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* Enhanced Personal Header */}
        <motion.div variants={headerVariants}>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
            <div className="bg-white  p-2">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                
                {/* Personal Welcome Section */}
                <div className="flex items-center space-x-6">
                  {/* User Avatar */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-2xl font-bold bg-white bg-clip-text text-transparent">
                        {data.user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    {/* Online Status */}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-50" />
                  </motion.div>

                  {/* Welcome Text */}
                  <div className="text-black">
                    <h1 className="text-xl lg:text-2xl font-bold mb-1">
                      {getGreeting()}, {data.user.name}! 👋
                    </h1>
                    <p className="text-gray-700 text-sm lg:text-base">
                      {getMotivationalMessage(data.progressMetrics.completionPercentage)}
                    </p>
                  </div>
                </div>

                {/* Action Buttons & Stats */}
                <div className="flex items-center space-x-4">
                  {/* Streak Counter */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center"
                  >
                    <div className="flex items-center space-x-2 text-black">
                      <Flame size={18} className="text-orange-500" />
                      <div>
                        <div className="text-lg font-bold">7</div>
                        <div className="text-xs opacity-90">Day Streak</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Refresh Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-blue-900 hover:bg-white/30 transition-colors"
                  >
                    <motion.div
                      animate={{ rotate: isRefreshing ? 360 : 0 }}
                      transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0, ease: "linear" }}
                    >
                      <RefreshCw size={18} />
                    </motion.div>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="p-4 bg-gradient-to-r from-gray-50 to-indigo-50 border-t border-gray-200">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{data.progressMetrics.completionPercentage}%</div>
                  <div className="text-xs text-gray-500">Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{data.progressMetrics.completedModules}</div>
                  <div className="text-xs text-gray-500">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">
                    {data.lastAssessment ? Math.round(data.lastAssessment.score) : 0}%
                  </div>
                  <div className="text-xs text-gray-500">Last Score</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">12h</div>
                  <div className="text-xs text-gray-500">This Week</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced KPI Grid */}
        <motion.div variants={itemVariants}>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your Progress</h2>
            <p className="text-gray-600 text-sm">Track your learning journey and achievements</p>
          </div>
          <KPIGrid
            completed={data.progressMetrics.completedModules}
            total={data.progressMetrics.totalModules}
            percentage={data.progressMetrics.completionPercentage}
            lastScore={data.lastAssessment?.score}
            streak={7}
            timeSpent={720}
          />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Left Column - Main Content */}
          <div className="xl:col-span-2 space-y-8">
            
            {/* Learning Path Modules */}
            {data.learningPath && (
              <motion.div variants={itemVariants}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Your Learning Path</h2>
                    <p className="text-gray-600 text-sm mt-1">Continue your personalized learning journey</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                  >
                    View All
                  </motion.button>
                </div>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.learningPath.modules.slice(0, 6).map((module, index) => (
                    <motion.div
                      key={module.id}
                      variants={itemVariants}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ModuleCard 
                        title={module.title} 
                        status={module.status} 
                        estimatedTime={module.estimatedTime}
                        difficulty={index % 3 === 0 ? 'beginner' : index % 3 === 1 ? 'intermediate' : 'advanced'}
                        description={`Module ${index + 1} in your learning path`}
                        tags={['React', 'JavaScript', 'Frontend']}
                        onClick={() => console.log(`Navigate to module ${module.id}`)}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Skill Profile */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                        <Brain size={20} className="text-indigo-600" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">Skill Profile</h2>
                        <p className="text-sm text-gray-600">Your competency across different areas</p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
                <CardContent className="p-0">
                  <SkillRadar 
                    data={data.skillVectors.map(v => ({ skill: v.skill, proficiency: v.proficiency * 100 }))} 
                    title="Skill Competency Radar"
                    showInsights={true}
                  />
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            
            {/* Quick Actions */}
            <motion.div variants={itemVariants}>
              <Card className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ x: 4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-between p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-200 group"
                    >
                      <div className="flex items-center space-x-3">
                        <Play size={18} />
                        <span className="font-medium">Take Assessment</span>
                      </div>
                      <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ x: 4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-between p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-200 group"
                    >
                      <div className="flex items-center space-x-3">
                        <BookOpen size={18} />
                        <span className="font-medium">Continue Learning</span>
                      </div>
                      <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ x: 4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-between p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-200 group"
                    >
                      <div className="flex items-center space-x-3">
                        <Trophy size={18} />
                        <span className="font-medium">View Achievements</span>
                      </div>
                      <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Upcoming Deadlines */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h3>
                    <Calendar size={18} className="text-gray-400" />
                  </div>
                  <div className="space-y-3">
                    {mockUpcomingDeadlines.map((deadline) => (
                      <motion.div
                        key={deadline.id}
                        whileHover={{ x: 4 }}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 text-sm">{deadline.title}</div>
                          <div className="text-xs text-gray-500 mt-1">Due {deadline.dueDate}</div>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${
                          deadline.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                        }`} />
                      </motion.div>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="w-full mt-4 text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                  >
                    View All Deadlines
                  </motion.button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Achievement Showcase */}
            <motion.div variants={itemVariants}>
              <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
                      <Trophy size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Latest Achievement</h3>
                      <p className="text-sm text-gray-600">Keep up the great work!</p>
                    </div>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-lg p-4 border border-yellow-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                        <Flame size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Week Streak Champion</div>
                        <div className="text-sm text-gray-600">7 days of consistent learning</div>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="w-full mt-4 text-yellow-700 hover:text-yellow-800 text-sm font-medium"
                  >
                    View All Achievements
                  </motion.button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Learning Recommendations */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Lightbulb size={16} className="text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Recommended for You</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="p-3 bg-purple-50 rounded-lg border border-purple-200 cursor-pointer hover:bg-purple-100 transition-colors"
                    >
                      <div className="font-medium text-gray-900 text-sm">Advanced React Patterns</div>
                      <div className="text-xs text-gray-600 mt-1">Based on your JavaScript skills</div>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="p-3 bg-blue-50 rounded-lg border border-blue-200 cursor-pointer hover:bg-blue-100 transition-colors"
                    >
                      <div className="font-medium text-gray-900 text-sm">TypeScript Fundamentals</div>
                      <div className="text-xs text-gray-600 mt-1">Enhance your development skills</div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Footer Actions */}
        <motion.div variants={itemVariants} className="text-center py-6">
          <p className="text-sm text-gray-500 mb-4">
            Dashboard updates automatically • Last refreshed: {currentTime.toLocaleTimeString()}
          </p>
          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
            >
              📊 View Analytics
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
            >
              ⚙️ Customize Dashboard
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
