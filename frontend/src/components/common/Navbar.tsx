import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Bell, Search, Settings, User, LogOut, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../api/hooks/useAuth';

export default function Navbar() {
  const { logout, role, user } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowUserMenu(false);
      setShowNotifications(false);
      setShowSearch(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setShowUserMenu(false);
    logout();
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/admin')) return 'Admin Dashboard';
    if (path.includes('/learner')) return 'Learning Hub';
    if (path.includes('/assessment')) return 'Assessment';
    if (path.includes('/learning-path')) return 'Learning Path';
    return 'AI Upskill';
  };

  const notifications = [
    { id: 1, title: 'New assessment available', time: '2m ago', unread: true },
    { id: 2, title: 'Learning path updated', time: '1h ago', unread: true },
    { id: 3, title: 'Achievement unlocked', time: '3h ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
            : 'bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 shadow-xl'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Toggle */}
              <motion.label
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                htmlFor="sidebar-toggle"
                className="sm:hidden cursor-pointer p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
              >
                <Menu size={20} className={isScrolled ? 'text-gray-700' : 'text-white'} />
              </motion.label>

              {/* Brand */}
              <Link to={role === 'admin' ? '/admin' : '/learner'}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center space-x-3"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                    isScrolled ? 'bg-blue-600 text-white' : 'bg-white/20 text-white'
                  }`}>
                    AI
                  </div>
                  <span className={`font-bold text-lg hidden sm:block ${
                    isScrolled ? 'text-gray-900' : 'text-white'
                  }`}>
                    AI Upskill
                  </span>
                </motion.div>
              </Link>

              {/* Page Title - Hidden on mobile */}
              <div className="hidden lg:block">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`text-sm font-medium ${
                    isScrolled ? 'text-gray-600' : 'text-white/80'
                  }`}
                >
                  / {getPageTitle()}
                </motion.div>
              </div>
            </div>

            {/* Center Section - Search (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <motion.div
                layout
                className="relative w-full"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`relative transition-all duration-200 ${
                    showSearch ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <Search
                    size={18}
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                      isScrolled ? 'text-gray-400' : 'text-white/60'
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="Search..."
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowSearch(true);
                    }}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                      isScrolled
                        ? 'bg-gray-100 text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-blue-500'
                        : 'bg-white/10 text-white placeholder-white/60 focus:bg-white/20 focus:ring-2 focus:ring-white/50'
                    } focus:outline-none`}
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-2">
              
              {/* Search Icon (Mobile) */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
                  isScrolled ? 'hover:bg-gray-100 text-gray-700' : 'hover:bg-white/10 text-white'
                }`}
              >
                <Search size={18} />
              </motion.button>

              {/* Notifications */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowNotifications(!showNotifications);
                  }}
                  className={`relative p-2 rounded-lg transition-colors duration-200 ${
                    isScrolled ? 'hover:bg-gray-100 text-gray-700' : 'hover:bg-white/10 text-white'
                  }`}
                >
                  <Bell size={18} />
                  {unreadCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium"
                    >
                      {unreadCount}
                    </motion.div>
                  )}
                </motion.button>

                {/* Notifications Dropdown */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.1 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="p-4 border-b border-gray-100">
                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {notifications.map((notification) => (
                          <motion.div
                            key={notification.id}
                            whileHover={{ backgroundColor: '#f9fafb' }}
                            className="p-4 border-b border-gray-50 cursor-pointer"
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`w-2 h-2 rounded-full mt-2 ${
                                notification.unread ? 'bg-blue-500' : 'bg-gray-300'
                              }`} />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                  {notification.title}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {notification.time}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <div className="p-3 bg-gray-50">
                        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                          View all notifications
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Role Badge */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`hidden sm:flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  isScrolled
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-white/20 text-white'
                }`}
              >
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  role === 'admin' ? 'bg-purple-400' : 'bg-green-400'
                }`} />
                {role}
              </motion.div>

              {/* User Menu */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowUserMenu(!showUserMenu);
                  }}
                  className={`flex items-center space-x-2 p-2 rounded-lg transition-colors duration-200 ${
                    isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm ${
                    isScrolled ? 'bg-blue-600 text-white' : 'bg-white/20 text-white'
                  }`}>
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <motion.div
                    animate={{ rotate: showUserMenu ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown
                      size={14}
                      className={isScrolled ? 'text-gray-600' : 'text-white/80'}
                    />
                  </motion.div>
                </motion.button>

                {/* User Dropdown */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.1 }}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {user?.name || 'User'}
                            </p>
                            <p className="text-sm text-gray-500">
                              {user?.email || 'user@example.com'}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="py-2">
                        <motion.button
                          whileHover={{ backgroundColor: '#f9fafb' }}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700"
                        >
                          <User size={16} />
                          <span>Profile</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ backgroundColor: '#f9fafb' }}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700"
                        >
                          <Settings size={16} />
                          <span>Settings</span>
                        </motion.button>
                      </div>

                      <div className="border-t border-gray-100">
                        <motion.button
                          whileHover={{ backgroundColor: '#fef2f2' }}
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-600"
                        >
                          <LogOut size={16} />
                          <span>Sign out</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Backdrop blur effect when dropdowns are open */}
      <AnimatePresence>
        {(showUserMenu || showNotifications) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/5 backdrop-blur-sm z-40"
            onClick={() => {
              setShowUserMenu(false);
              setShowNotifications(false);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
