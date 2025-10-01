import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useModal } from '../Admin/Modals/ModalContext';
import {
  Home,
  BookOpen,
  Video,
  MessageSquare,
  Users,
  Layers,
  UserPlus,
  Settings,
  FileText
} from 'lucide-react';

const Sidebar = ({ isOpen, currentPath }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector(state => state.auth);
  const { modalType } = useModal();

  const userRole = user?.role || 'student';

  // Common menu items for all roles
  const commonMenuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'home',
      path: '/dashboard',
      roles: ['student', 'admin', 'instructor']
    }
  ];

  // Student-specific menu items
  const studentMenuItems = [
    {
      id: 'courses',
      label: 'Courses',
      icon: 'book',
      path: '/dashboard/browsercourses',
      roles: ['student']
    },
    {
      id: 'live-sessions',
      label: 'Live Sessions',
      icon: 'video',
      path: '/dashboard/live-session',
      roles: ['student']
    },
    {
      id: 'questions',
      label: 'Q&A Forum',
      icon: 'message',
      path: '/dashboard/ask-questions',
      roles: ['student']
    }
  ];

  // Admin-specific menu items
  const adminMenuItems = [
    {
      id: 'students',
      label: 'Student Management',
      icon: 'users',
      path: '/dashboard/students',
      roles: ['admin']
    },
    {
      id: 'courses-admin',
      label: 'Course Management',
      icon: 'book',
      path: '/dashboard/courses',
      roles: ['admin']
    },
    {
      id: 'live-sessions',
      label: 'Live Sessions',
      icon: 'video',
      path: '/dashboard/zoom',
      roles: ['admin']
    },
    {
      id: 'batches',
      label: 'Batch Management',
      icon: 'layers',
      path: '/dashboard/batchs',
      roles: ['admin']
    },
    {
      id: 'add-admin',
      label: 'Add Admin',
      icon: 'user-plus',
      path: '/dashboard/addadmin',
      roles: ['admin']
    }
  ];

  // Instructor-specific menu items
  const instructorMenuItems = [
    {
      id: 'instructor-courses',
      label: 'My Courses',
      icon: 'book',
      path: '/dashboard/instructor-courses',
      roles: ['instructor']
    },
    {
      id: 'instructor-sessions',
      label: 'My Sessions',
      icon: 'video',
      path: '/dashboard/instructor-sessions',
      roles: ['instructor']
    }
  ];

  // Combine all menu items based on user role
  const allMenuItems = [
    ...commonMenuItems,
    ...studentMenuItems,
    ...adminMenuItems,
    ...instructorMenuItems
  ];

  // Filter menu items based on user role
  const menuItems = allMenuItems.filter(item => 
    item.roles.includes(userRole)
  );

  const isActive = (path) => {
    return currentPath === path;
  };

  // Don't render sidebar if any modal is open
  if (modalType) {
    return null;
  }

  const getIconComponent = (iconName) => {
    const iconProps = { size: 20 };
    
    switch (iconName) {
      case 'home':
        return <Home {...iconProps} />;
      case 'book':
        return <BookOpen {...iconProps} />;
      case 'video':
        return <Video {...iconProps} />;
      case 'file':
        return <FileText {...iconProps} />;
      case 'message':
        return <MessageSquare {...iconProps} />;
      case 'users':
        return <Users {...iconProps} />;
      case 'layers':
        return <Layers {...iconProps} />;
      case 'user-plus':
        return <UserPlus {...iconProps} />;
      default:
        return <Home {...iconProps} />;
    }
  };

  return (
    <div className="dashboard-app-container">
      <div className={`sidebar ${isOpen ? 'open' : 'closed'} `}>
        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${isActive(item.path) ? 'active' : ''} btn `}
              onClick={() => navigate(item.path)}
              type="button"
            >
              <div className="nav-icon">
                {getIconComponent(item.icon)}
              </div>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;