/*=================================================================
  ProfilePage.tsx - Professional Profile with Customization
=================================================================*/
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User,
  Mail,
  Building,
  Calendar,
  Edit3,
  Save,
  X,
  Camera,
  Award,
  TrendingUp,
  Target,
  Clock,
  Star,
  BarChart3,
  Settings,
  Download,
  Share2,
  Eye,
  EyeOff,
  Plus,
  Minus,
  CheckCircle,
  Zap,
  BookOpen,
  Trophy,
  Flame,
  MapPin,
  Phone,
  Globe,
  LinkedinIcon,
  Github,
  Twitter
} from 'lucide-react';
import { useDashboard } from '../../api/hooks/learner/useDashboard';
import { Card, CardContent } from '../../components/ui/card';

interface ProfileData {
  user: {
    name: string;
    email: string;
    department: string;
    role?: string;
    joinDate?: string;
    location?: string;
    phone?: string;
    bio?: string;
    website?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  skillVectors: { skill: string; proficiency: number }[];
  performanceRatings?: { area: string; score: number; date: string }[];
}

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

const skillVariants = {
  hidden: { width: 0 },
  visible: { width: '100%' }
};

export default function ProfilePage() {
  const { data, isLoading, error } = useDashboard();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>({});
  const [activeTab, setActiveTab] = useState('overview');
  const [showPrivateInfo, setShowPrivateInfo] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState('public');

  // Mock additional data for enhanced profile
  const mockStats = {
    totalHours: 142,
    completedCourses: 8,
    currentStreak: 12,
    averageScore: 87,
    rank: 23,
    certificates: 5
  };

  const mockAchievements = [
    { id: 1, title: 'Quick Learner', description: 'Completed 5 courses in a month', icon: Zap, color: 'yellow' },
    { id: 2, title: 'Skill Master', description: 'Achieved 90%+ in 3 skill areas', icon: Trophy, color: 'gold' },
    { id: 3, title: 'Consistent Learner', description: '30-day learning streak', icon: Flame, color: 'orange' },
    { id: 4, title: 'Team Player', description: 'Helped 10+ colleagues', icon: User, color: 'blue' }
  ];

  const mockActivity = [
    { id: 1, action: 'Completed React Hooks module', time: '2 hours ago', type: 'completion' },
    { id: 2, action: 'Scored 95% on JavaScript Assessment', time: '1 day ago', type: 'achievement' },
    { id: 3, action: 'Started TypeScript Learning Path', time: '3 days ago', type: 'start' },
    { id: 4, action: 'Earned "Quick Learner" badge', time: '1 week ago', type: 'badge' }
  ];

  useEffect(() => {
    if (data?.user) {
      setEditData({ ...data.user });
    }
  }, [data]);

  const handleSave = () => {
    // Here you would typically make an API call to save the data
    console.log('Saving profile data:', editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...data?.user });
    setIsEditing(false);
  };

  const getAchievementColor = (color: string) => {
    const colors = {
      yellow: 'from-yellow-400 to-yellow-600',
      gold: 'from-yellow-500 to-orange-500',
      orange: 'from-orange-400 to-red-500',
      blue: 'from-blue-400 to-indigo-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="animate-pulse">
            {/* Header Skeleton */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full" />
                <div className="space-y-3">
                  <div className="h-8 bg-gray-200 rounded w-48" />
                  <div className="h-4 bg-gray-200 rounded w-32" />
                  <div className="h-4 bg-gray-200 rounded w-40" />
                </div>
              </div>
            </div>
            
            {/* Content Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                  <div className="space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-32" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded" />
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
            <User size={32} className="text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Unavailable</h2>
          <p className="text-gray-600 mb-6">We're having trouble loading your profile. Please try again.</p>
          <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium">
            Retry
          </button>
        </motion.div>
      </div>
    );
  }

  const { user, skillVectors, performanceRatings = [] } = data as ProfileData;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-white"
    >
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        
        {/* Profile Header */}
        <motion.div variants={itemVariants}>
          <Card className="bg-white border border-gray-200 shadow-lg overflow-hidden">
            <div className="relative bottom-10">
              {/* Cover Image */}
              <div className="h-30 bg-blue-600" />
              
              {/* Profile Content */}
              <div className="relative px-7 pb-1">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  
                  {/* Profile Info */}
                  <div className="flex items-start space-x-6 -mt-13">
                    {/* Avatar */}
                    <div className="relative">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="w-24 h-24 bg-white rounded-full shadow-lg border-4 border-white flex items-center justify-center"
                      >
                        <span className="text-3xl font-bold bg-blue-800 bg-clip-text text-transparent">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </motion.div>
                      {isEditing && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700"
                        >
                          <Camera size={16} />
                        </motion.button>
                      )}
                    </div>

                    {/* User Details */}
                    <div className="flex-1 pt-4 text-white">
                      {isEditing ? (
                        <div className="space-y-3">
                          <input
                            value={editData.name || ''}
                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                            className="text-2xl font-bold bg-transparent border-b-2 border-blue-500 focus:outline-none"
                          />
                          <input
                            value={editData.bio || ''}
                            onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                            placeholder="Add a bio..."
                            className="text-gray-600 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                          />
                        </div>
                      ) : (
                        <div>
                          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                            {user.name}
                          </h1>
                          <p className="text-gray-600 mb-3">
                            {user.bio || 'Learning enthusiast passionate about technology and growth'}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Building size={16} className="mr-1" />
                              {user.department}
                            </div>
                            <div className="flex items-center">
                              <Calendar size={16} className="mr-1" />
                              Joined {user.joinDate || 'Jan 2024'}
                            </div>
                            <div className="flex items-center">
                              <MapPin size={16} className="mr-1" />
                              {user.location || 'Remote'}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3 lg:mt-4">
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowPrivateInfo(!showPrivateInfo)}
                        className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        {showPrivateInfo ? <EyeOff size={16} /> : <Eye size={16} />}
                        <span className="text-sm">{showPrivateInfo ? 'Hide' : 'Show'} Private</span>
                      </motion.button>
                    </div>

                    {isEditing ? (
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleCancel}
                          className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          <X size={16} />
                          <span>Cancel</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleSave}
                          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          <Save size={16} />
                          <span>Save</span>
                        </motion.button>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          <Share2 size={16} />
                          <span>Share</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIsEditing(true)}
                          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          <Edit3 size={16} />
                          <span>Edit Profile</span>
                        </motion.button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Stats Overview */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[
              { label: 'Total Hours', value: mockStats.totalHours, icon: Clock, color: 'blue' },
              { label: 'Completed', value: mockStats.completedCourses, icon: CheckCircle, color: 'green' },
              { label: 'Streak', value: `${mockStats.currentStreak}d`, icon: Flame, color: 'orange' },
              { label: 'Avg Score', value: `${mockStats.averageScore}%`, icon: Star, color: 'yellow' },
              { label: 'Rank', value: `#${mockStats.rank}`, icon: Trophy, color: 'purple' },
              { label: 'Certificates', value: mockStats.certificates, icon: Award, color: 'pink' }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-4 text-center">
                      <div className={`w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center bg-${stat.color}-100`}>
                        <IconComponent size={20} className={`text-${stat.color}-600`} />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Contact Information */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
                    {showPrivateInfo && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Private</span>
                    )}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {isEditing ? (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input
                            type="email"
                            value={editData.email || ''}
                            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                          <input
                            type="tel"
                            value={editData.phone || ''}
                            onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                          <input
                            type="url"
                            value={editData.website || ''}
                            onChange={(e) => setEditData({ ...editData, website: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="https://your-website.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                          <input
                            type="text"
                            value={editData.location || ''}
                            onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="City, Country"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center space-x-3">
                          <Mail size={18} className="text-gray-400" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.email}</div>
                            <div className="text-xs text-gray-500">Email</div>
                          </div>
                        </div>
                        {showPrivateInfo && (
                          <div className="flex items-center space-x-3">
                            <Phone size={18} className="text-gray-400" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{user.phone || '+1 (555) 123-4567'}</div>
                              <div className="text-xs text-gray-500">Phone</div>
                            </div>
                          </div>
                        )}
                        <div className="flex items-center space-x-3">
                          <Globe size={18} className="text-gray-400" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.website || 'Not provided'}</div>
                            <div className="text-xs text-gray-500">Website</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin size={18} className="text-gray-400" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.location || 'Remote'}</div>
                            <div className="text-xs text-gray-500">Location</div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Social Links */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Social Links</h3>
                    <div className="flex space-x-3">
                      {[
                        { icon: LinkedinIcon, url: user.linkedin, color: 'blue' },
                        { icon: Github, url: user.github, color: 'gray' },
                        { icon: Twitter, url: user.twitter, color: 'blue' }
                      ].map(({ icon: IconComponent, url, color }, index) => (
                        <motion.a
                          key={index}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          href={url || '#'}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${color}-100 text-${color}-600 hover:bg-${color}-200 transition-colors`}
                        >
                          <IconComponent size={18} />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Skills Section */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">Skills & Proficiency</h2>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {skillVectors.slice(0, 8).map((skill, index) => (
                      <motion.div
                        key={skill.skill}
                        variants={itemVariants}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-900">{skill.skill}</span>
                          <span className="text-sm text-gray-500">{Math.round(skill.proficiency)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            className={`h-2 rounded-full ${
                              skill.proficiency >= 0.8 ? 'bg-green-500' :
                              skill.proficiency >= 0.6 ? 'bg-blue-500' :
                              skill.proficiency >= 0.4 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            variants={skillVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 1, delay: index * 0.1 }}
                            style={{ width: `${skill.proficiency * 100}%` }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Performance Ratings */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">Performance Reviews</h2>
                </div>
                <CardContent className="p-6">
                  {performanceRatings.length === 0 ? (
                    <div className="text-center py-8">
                      <BarChart3 size={48} className="text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 mb-2">No performance reviews yet</p>
                      <p className="text-sm text-gray-400">Your first review will appear here once completed</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {performanceRatings.map((rating, index) => (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <div className="font-medium text-gray-900">{rating.area}</div>
                            <div className="text-sm text-gray-500">
                              {new Date(rating.date).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={16}
                                  className={`${
                                    i < rating.score ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-medium text-gray-900">{rating.score}/5</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            
            {/* Achievements */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">Achievements</h2>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {mockAchievements.map((achievement) => {
                      const IconComponent = achievement.icon;
                      return (
                        <motion.div
                          key={achievement.id}
                          whileHover={{ scale: 1.02 }}
                          className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${getAchievementColor(achievement.color)} flex items-center justify-center flex-shrink-0`}>
                            <IconComponent size={20} className="text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 text-sm">{achievement.title}</div>
                            <div className="text-xs text-gray-500 mt-1">{achievement.description}</div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div variants={itemVariants}>
              <Card className="bg-white border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {mockActivity.map((activity) => (
                      <motion.div
                        key={activity.id}
                        whileHover={{ x: 4 }}
                        className="flex items-start space-x-3"
                      >
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === 'completion' ? 'bg-green-500' :
                          activity.type === 'achievement' ? 'bg-yellow-500' :
                          activity.type === 'badge' ? 'bg-purple-500' : 'bg-blue-500'
                        }`} />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{activity.action}</div>
                          <div className="text-xs text-gray-500">{activity.time}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={itemVariants}>
              <Card className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ x: 4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center space-x-3 p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-200"
                    >
                      <Download size={18} />
                      <span className="font-medium">Download Resume</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ x: 4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center space-x-3 p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-200"
                    >
                      <Settings size={18} />
                      <span className="font-medium">Privacy Settings</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ x: 4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center space-x-3 p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-200"
                    >
                      <Share2 size={18} />
                      <span className="font-medium">Share Profile</span>
                    </motion.button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
