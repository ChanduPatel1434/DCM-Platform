import React, { useState, createContext, useContext, Suspense } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import Topbar from './Topbar/Topbar';
import useAuthCheck from '../../hooks/useAuthCheck';
import Loader from './common/Loader';
import { ModalProvider } from './Admin/Modals/ModalContext';
import ScrollToTop from '../../utils/ScrollToTop';
import { useSelector } from 'react-redux';
import QuickActions from './Extras/QuickActions';
import './dashboard.css'

// Theme Context
const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

const DashboardLayout = () => {
  const { isChecking } = useAuthCheck();
  const { user } = useSelector(state => state.auth);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  const themeClass = theme === 'dark' ? 'dark-theme' : 'light-theme';
  const sidebarClass = isSidebarOpen ? 'sidebar-open' : 'sidebar-closed';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* ADD DASHBOARD CONTAINER WRAPPER HERE */}
      <div className="dashboard-app-container">
        <div className={`dashboard-layout ${themeClass}`}>
          <ModalProvider>
            <Topbar
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
              currentPath={location.pathname}
            />
            {!isChecking && (
              <div className={`dashboard-content ${sidebarClass}`}>
                <Sidebar
                  isOpen={isSidebarOpen}
                  currentPath={location.pathname}
                />
                <main className="main-content">
                  <Suspense fallback={<Loader message="Loading module..." />}>
                    <ScrollToTop/>
                    <Outlet />
                    {user?.role === "admin" ? (
                      <div><QuickActions/></div>
                    ) : (<div></div>)}
                  </Suspense>
                </main>
              </div>
            )}
          </ModalProvider>
        </div>
      </div>
      
     
    </ThemeContext.Provider>
  );
};

export default DashboardLayout;