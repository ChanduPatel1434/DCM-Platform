import { LogOut, Settings, ShieldAlert, User } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileSidebar = ({ user, activeTab, onTabChange }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: 'user' },
    { id: 'account', label: 'Account Settings', icon: 'settings' },
    { id: 'security', label: 'Security', icon: 'shield' },
  ];

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'user': return <User size={18} />;
      case 'settings': return <Settings size={18} />;
      case 'shield': return <ShieldAlert size={18} />;
      default: return <User size={18} />;
    }
  };

  return (
    <div className="profile-sidebar">
      <div className="sidebar-header">
        <div className="user-profile">
          <div className="avatar-large">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <span>{user?.name?.charAt(0)?.toUpperCase()}</span>
            )}
          </div>
          <div className="user-info">
            <h3>{user?.name || 'User Name'}</h3>
            <p>{user?.email || 'user@example.com'}</p>
            <span className="user-role">{user?.role || 'Student'}</span>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => onTabChange(item.id)}
            aria-current={activeTab === item.id ? 'page' : undefined}
          >
            <div className="nav-icon">
              {getIconComponent(item.icon)}
            </div>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button 
          className="logout-btn" 
          onClick={() => navigate('/logout')}
          aria-label="Log out"
        >
          <LogOut size={18} />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;