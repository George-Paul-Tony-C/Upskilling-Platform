/*================================================================
  4. Wire Users page into routing
================================================================*/
// src/pages/admin/Users.tsx
import { motion } from 'framer-motion';
import { 
  Users as UsersIcon, 
  UserPlus, 
  Download, 
  Filter,
  BarChart3,
  Shield,
  BookOpen
} from 'lucide-react';
import UserTable from '../../components/admin/UserTable';
import { useUsers } from '../../api/hooks/admin/useUsers';

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

export default function UsersPage() {
  const { list } = useUsers();
  
  // Calculate user statistics
  const totalUsers = list.data?.length || 0;
  const adminUsers = list.data?.filter(user => user.role === 'admin').length || 0;
  const learnerUsers = list.data?.filter(user => user.role === 'learner').length || 0;
  const departments = list.data ? [...new Set(list.data.map(user => user.department).filter(Boolean))].length : 0;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gray-50"
    >
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Enhanced Header */}
        <motion.div variants={headerVariants}>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Title Section */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <UsersIcon size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                  <p className="text-gray-600 mt-1">
                    Manage user accounts, roles, and permissions
                  </p>
                </div>
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
              </div>
            </div>
          </div>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Users */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <UsersIcon size={20} className="text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{totalUsers}</div>
              </div>
              <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
              <p className="text-xs text-gray-500 mt-1">All registered users</p>
            </motion.div>

            {/* Admin Users */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Shield size={20} className="text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{adminUsers}</div>
              </div>
              <h3 className="text-sm font-medium text-gray-600">Administrators</h3>
              <p className="text-xs text-gray-500 mt-1">System administrators</p>
            </motion.div>

            {/* Learner Users */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <BookOpen size={20} className="text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{learnerUsers}</div>
              </div>
              <h3 className="text-sm font-medium text-gray-600">Learners</h3>
              <p className="text-xs text-gray-500 mt-1">Active learners</p>
            </motion.div>

            {/* Departments */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <BarChart3 size={20} className="text-amber-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{departments}</div>
              </div>
              <h3 className="text-sm font-medium text-gray-600">Departments</h3>
              <p className="text-xs text-gray-500 mt-1">Active departments</p>
            </motion.div>
          </div>
        </motion.div>

        {/* User Table Section */}
        <motion.div variants={itemVariants}>
          <UserTable />
        </motion.div>
      </div>
    </motion.div>
  );
}
