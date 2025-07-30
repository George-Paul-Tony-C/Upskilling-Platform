import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../api/hooks/useAuth';
import { 
  Home, 
  User, 
  Book, 
  Users, 
  ChevronLeft, 
  ChevronRight,
  Settings,
  BarChart3,
  FileText,
  Award,
  BookOpen
} from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

const linkVariants = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -20, opacity: 0 }
};

const sidebarVariants = {
  expanded: { width: 240 },
  collapsed: { width: 64 }
};

export default function Sidebar({ 
  isCollapsed, 
  setIsCollapsed, 
  isMobileOpen, 
  setIsMobileOpen 
}: SidebarProps) {
  const { role, user } = useAuth();
  const [hovering, setHovering] = useState(false);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);

  const adminLinks = [
    { to: '/admin', label: 'Dashboard', icon: Home },
    { to: '/admin/users', label: 'Users', icon: Users },
    { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/admin/reports', label: 'Reports', icon: FileText },
    { to: '/admin/settings', label: 'Settings', icon: Settings }
  ];

  const learnerLinks = [
    { to: '/learner', label: 'Dashboard', icon: Home },
    { to: '/learner/profile', label: 'Profile', icon: User },
    { to: '/learner/assessment', label: 'Assessment', icon: Book },
    { to: '/learner/learning-paths', label: 'Learning Paths', icon: BookOpen },
    { to: '/learner/achievements', label: 'Achievements', icon: Award }
  ];

  const links = role === 'admin' ? adminLinks : learnerLinks;

  // Only show labels when expanded OR (collapsed AND hovering with delay)
  const shouldShowLabels = !isCollapsed || hovering;

  // Close mobile sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMobileOpen && !(e.target as Element).closest('aside')) {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileOpen, setIsMobileOpen]);

  // Handle hover with delay to prevent accidental expansion
  const handleMouseEnter = (e: React.MouseEvent) => {
    // Don't trigger hover expansion if clicking on toggle button
    if ((e.target as Element).closest('[data-toggle-button]')) {
      return;
    }

    if (isCollapsed) {
      const timer = setTimeout(() => {
        setHovering(true);
      }, 3500); // 300ms delay before expansion on hover
      setHoverTimer(timer);
    } else {
      setHovering(true);
    }
  };

  const handleMouseLeave = () => {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      setHoverTimer(null);
    }
    setHovering(false);
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
      }
    };
  }, [hoverTimer]);

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        animate={isCollapsed ? 'collapsed' : 'expanded'}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={clsx(
          'fixed inset-y-0 left-0 z-40 bg-white border-r border-gray-200 shadow-xl lg:shadow-lg',
          'transform transition-transform duration-300 ease-in-out',
          'lg:static lg:translate-x-0',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          'overflow-hidden'
        )}
        style={{ width: isCollapsed && !hovering ? 64 : 240 }}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 relative z-10">
          <AnimatePresence >
            {shouldShowLabels && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center space-x-3"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  AI
                </div>
                <div className="font-semibold text-gray-900 text-sm">
                  AI Upskill
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Toggle Button */}
          <motion.button
            data-toggle-button="true"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsCollapsed(!isCollapsed);
              // Clear any pending hover timer when manually toggling
              if (hoverTimer) {
                clearTimeout(hoverTimer);
                setHoverTimer(null);
              }
              setHovering(false);
            }}
            className="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200 relative z-20 bg-white shadow-sm border border-gray-200"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronLeft size={16} className="text-gray-600" />
            </motion.div>
          </motion.button>

          {/* Mobile Close Button */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <ChevronLeft size={16} className="text-gray-600" />
          </button>
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <AnimatePresence>
              {shouldShowLabels && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 min-w-0"
                >
                  <div className="font-medium text-gray-900 text-sm truncate">
                    {user?.name || 'User Name'}
                  </div>
                  <div className="text-xs text-gray-500 capitalize truncate">
                    {role} • Online
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <AnimatePresence >
            {links.map(({ to, label, icon: Icon }, index) => (
              <motion.div
                key={to}
                variants={linkVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    clsx(
                      'group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 relative',
                      'hover:bg-gray-100 hover:shadow-sm',
                      isActive
                        ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                        : 'text-gray-700 hover:text-gray-900'
                    )
                  }
                  onClick={() => setIsMobileOpen(false)}
                  title={!shouldShowLabels ? label : undefined} // Show tooltip when collapsed
                >
                  {({ isActive }) => (
                    <>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={clsx(
                          'flex-shrink-0',
                          isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
                        )}
                      >
                        <Icon size={18} />
                      </motion.div>
                      
                      <AnimatePresence >
                        {shouldShowLabels && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="ml-3 truncate"
                          >
                            {label}
                          </motion.span>
                        )}
                      </AnimatePresence>

                      {/* Active Indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute left-0 w-1 h-6 bg-white rounded-r-full"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </motion.div>
            ))}
          </AnimatePresence>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <AnimatePresence>
            {shouldShowLabels ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="text-xs text-gray-500 text-center"
              >
                <div className="mb-1">Version 1.8</div>
                <div>© 2025 AI Upskill</div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full" title="System Online" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>
    </>
  );
}
