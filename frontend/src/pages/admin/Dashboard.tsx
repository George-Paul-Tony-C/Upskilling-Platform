/*===================================================================
  5. src/pages/admin/Dashboard.tsx – wired up
===================================================================*/
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RefreshCw, 
  Download, 
  Filter, 
  Calendar,
  TrendingUp,
  Users,
  Activity,
  BarChart3,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { useAdminDashboard } from '../../api/hooks/admin/useDashboard';
import AnalyticsCards from '../../components/admin/AnalyticsCards';
import AgentStatusTable from '../../components/admin/AgentStatusTable';
import DeptBar from '../../components/charts/DeptBar';
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

export default function AdminDashboard() {
  const { data, isLoading, error, refetch } = useAdminDashboard();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulated refresh functionality
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setLastUpdated(new Date());
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
      setLastUpdated(new Date());
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [refetch]);

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Skeleton */}
          <div className="animate-pulse">
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="h-8 bg-gray-200 rounded w-64 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-48" />
              </div>
              <div className="flex space-x-3">
                <div className="h-10 bg-gray-200 rounded w-24" />
                <div className="h-10 bg-gray-200 rounded w-24" />
              </div>
            </div>
          </div>

          {/* KPI Cards Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
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

          {/* Charts Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-48 mb-4" />
              <div className="h-64 bg-gray-200 rounded" />
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-32 mb-4" />
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-200 rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl border border-red-200 shadow-xl p-8 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle size={32} className="text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Dashboard Unavailable
          </h2>
          <p className="text-gray-600 mb-6">
            We're having trouble loading the dashboard data. Please try refreshing the page.
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

  // Calculate system health status
  const totalAgents = data.agentStatuses?.length || 0;
  const healthyAgents = data.agentStatuses?.filter(agent => agent.status === 'active').length || 0;
  const systemHealth = totalAgents > 0 ? (healthyAgents / totalAgents) * 100 : 100;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gray-50"
    >
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Enhanced Header */}
        <motion.div variants={headerVariants} className="relative">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Title Section */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <BarChart3 size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                  <p className="text-gray-600 mt-1">
                    System overview and analytics • Last updated {lastUpdated.toLocaleTimeString()}
                  </p>
                </div>
              </div>

              {/* Actions & Status */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* System Health Indicator */}
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    systemHealth >= 90 ? 'bg-emerald-500' : 
                    systemHealth >= 70 ? 'bg-amber-500' : 'bg-red-500'
                  }`} />
                  <span className="text-sm font-medium text-gray-700">
                    System {systemHealth >= 90 ? 'Healthy' : systemHealth >= 70 ? 'Warning' : 'Critical'}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({healthyAgents}/{totalAgents} agents active)
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Filter size={16} className="mr-2" />
                    Filters
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Download size={16} className="mr-2" />
                    Export
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200"
                  >
                    <motion.div
                      animate={{ rotate: isRefreshing ? 360 : 0 }}
                      transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0, ease: "linear" }}
                    >
                      <RefreshCw size={16} className="mr-2" />
                    </motion.div>
                    Refresh
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* KPI Cards Section */}
        <motion.div variants={itemVariants}>
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">System Overview</h2>
            <p className="text-gray-600 text-sm">Key performance indicators and system metrics</p>
          </div>
          <AnalyticsCards m={data.systemMetrics} />
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Department Analytics - Takes 2 columns */}
          <motion.div variants={itemVariants} className="xl:col-span-2">
            <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <TrendingUp size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Department Performance</h2>
                      <p className="text-sm text-gray-600">Completion rates across departments</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
              <CardContent className="p-0">
                <DeptBar data={data.departmentAnalytics} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Stats Sidebar */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* System Status Card */}
            <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Activity size={20} className="text-emerald-600" />
                  </div>
                  <CheckCircle size={20} className="text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">System Status</h3>
                <p className="text-sm text-gray-600 mb-3">All systems operational</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Uptime</span>
                  <span className="font-semibold text-emerald-700">99.9%</span>
                </div>
              </CardContent>
            </Card>

            {/* Active Users Card */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users size={20} className="text-blue-600" />
                  </div>
                  <span className="text-2xl font-bold text-blue-700">
                    {data.systemMetrics.activeUsers}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Active Users</h3>
                <p className="text-sm text-gray-600">Currently online</p>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ x: 4 }}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between group"
                  >
                    <span className="text-sm font-medium text-gray-700">Create User</span>
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      →
                    </motion.div>
                  </motion.button>
                  <motion.button
                    whileHover={{ x: 4 }}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between group"
                  >
                    <span className="text-sm font-medium text-gray-700">System Settings</span>
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      →
                    </motion.div>
                  </motion.button>
                  <motion.button
                    whileHover={{ x: 4 }}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between group"
                  >
                    <span className="text-sm font-medium text-gray-700">View Reports</span>
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      →
                    </motion.div>
                  </motion.button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Agent Status Table */}
        <motion.div variants={itemVariants}>
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">System Monitoring</h2>
            <p className="text-gray-600 text-sm">Real-time agent status and performance metrics</p>
          </div>
          <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Activity size={18} className="text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Agent Monitor</h2>
                    <p className="text-sm text-gray-600">Live system agent performance</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-gray-600">Live</span>
                </div>
              </div>
            </div>
            <CardContent className="p-0">
              <AgentStatusTable agents={data.agentStatuses} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer with last updated info */}
        <motion.div
          variants={itemVariants}
          className="text-center py-6 border-t border-gray-200"
        >
          <p className="text-sm text-gray-500">
            Dashboard automatically refreshes every 5 minutes • 
            Last updated: {lastUpdated.toLocaleString()} • 
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={handleRefresh}
              className="text-blue-600 hover:text-blue-700 font-medium ml-1"
            >
              Refresh now
            </motion.button>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
