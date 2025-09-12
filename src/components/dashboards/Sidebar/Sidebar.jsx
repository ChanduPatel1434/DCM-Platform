import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  Home,
  BookOpen,
  Book,
  Calendar,
  Settings,
  Users,
  LogOut,
  User, // ✅ Added missing icon
} from 'react-feather';
import { useEffect, useState } from 'react';
import { logout } from '../../../features/authSlice';

const Sidebar = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [menuItems, setMenuItems] = useState([]);

  const iconMap = {
    home: Home,
    'book-open': BookOpen,
    book: Book,
    calendar: Calendar,
    settings: Settings,
    users: Users,
    'log-out': LogOut,
    user: User, // ✅ Added to iconMap
  };

  const userMenu = [
    { label: 'Dashboard', icon: 'home', path: '/dashboard', exact: true },
    { label: 'Enrolled Courses', icon: 'book-open', path: 'mycourses' },
    { label: 'Syllabus', icon: 'book', path: 'syllabus' },
    { label: 'Classes', icon: 'calendar', path: 'calendar' },
    { label: 'Settings', icon: 'settings', path: 'settings' },
  ];

  const adminMenu = [
    { label: 'Dashboard', icon: 'home', path: '/dashboard', exact: true },
    { label: 'Students', icon: 'users', path: 'students' },
    { label: 'Courses', icon: 'book', path: 'courses' },
    { label: 'Batchs', icon: 'book-open', path: 'batchs' },
    { label: 'Live Class', icon: 'pause', path: 'liveclass' },
    { label: 'Add Admin', icon: 'user', path: 'addadmin' }, // ✅ This was causing the error
  ];

  useEffect(() => {
    if (user?.role === 'admin') {
      setMenuItems(adminMenu);
    } else {
      setMenuItems(userMenu);
    }
  }, [user?.role]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    dispatch(logout());
    window.location.href = '/login';
  };

  return (
    <aside className="app-sidebar-menu shadow-sm">
      <div className="h-100" data-simplebar>
        {/* Logo */}
        <div className="logo-box text-center">
         
        </div>

        {/* Navigation */}
        <nav id="sidebar-menu">
          <ul className="list-unstyled" id="side-menu">
            <li className="menu-title text-muted px-3 fw-bold small mb-2">
              <span className="mx-1 text-capitalize">{user?.role}</span> Menu
            </li>

            {menuItems.map(({ label, icon, path, exact }, index) => {
              const Icon = iconMap[icon] || (() => <span className="me-2">🔹</span>); // ✅ Fallback
              return (
                <li key={index} className="ms-3 mb-2">
                  <NavLink
                    to={path}
                    end={exact}
                    className={({ isActive }) =>
                      `tp-link text-decoration-none d-flex align-items-center px-3 py-2 rounded ${
                        isActive
                          ? 'menuitem-active active bg-primary text-white fw-semibold'
                          : 'text-dark'
                      }`
                    }
                  >
                    <Icon size={16} className="me-2" />
                    <span>{label}</span>
                  </NavLink>
                </li>
              );
            })}

            <li className="menu-title text-muted px-3 fw-bold small mt-4 mb-2">Account</li>
            <li className="ms-3 mb-2">
              <button
                className="text-decoration-none d-flex align-items-center px-3 py-2 text-danger bg-transparent border-0"
                onClick={handleLogout}
              >
                <LogOut size={16} className="me-2" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;