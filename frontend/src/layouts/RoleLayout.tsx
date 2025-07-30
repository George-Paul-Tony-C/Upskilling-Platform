import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';

export default function RoleLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load saved sidebar state
  useEffect(() => {
    const savedState = localStorage.getItem('sidebar-collapsed');
    if (savedState !== null) {
      setIsSidebarCollapsed(JSON.parse(savedState));
    }
  }, []);

  // Save sidebar state
  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', JSON.stringify(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  const mainContentVariants = {
    expanded: { marginLeft: 0 },
    collapsed: { marginLeft: 0 },
    mobile: { marginLeft: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Enhanced Navbar with sidebar controls */}
      <Navbar 
        onMobileMenuClick={() => setIsMobileSidebarOpen(true)}
        isMobileSidebarOpen={isMobileSidebarOpen}
      />

      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          isMobileOpen={isMobileSidebarOpen}
          setIsMobileOpen={setIsMobileSidebarOpen}
        />

        {/* Main Content Area */}
        <motion.main
          variants={mainContentVariants}
          animate={
            window.innerWidth >= 1024
              ? isSidebarCollapsed
                ? 'collapsed'
                : 'expanded'
              : 'mobile'
          }
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="flex-1 min-h-0 bg-gray-50 lg:ml-0"
          style={{
            marginLeft: window.innerWidth >= 1024 ? (isSidebarCollapsed ? 64 : 240) : 0
          }}
        >
          {/* Content Container */}
          <div className="h-full overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="p-6 max-w-full mx-auto"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Scroll to Top Button */}
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200 z-40 flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </motion.button>
          </div>
        </motion.main>
      </div>

      {/* Loading Overlay for Route Transitions */}
      <AnimatePresence>
        {/* Add loading state if needed */}
      </AnimatePresence>
    </div>
  );
}
