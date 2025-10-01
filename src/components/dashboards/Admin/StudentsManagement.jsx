import { Outlet, Link, useLocation,useMatch } from "react-router-dom";
import { Users, UserCheck, UserX, Shield, } from 'lucide-react';


const AssignStudents = () => {
   const matchAll = useMatch("/dashboard/students");
  const matchUnassigned = useMatch("/dashboard/students/unassigned");
  const matchAssigned = useMatch("/dashboard/students/assigned")
 
  const tabs = [
    {
      path: "",
      label: "All Students",
      icon: Users,
      active: !!matchAll
    },
    {
      path: "unassigned", 
      label: "Unassigned Students",
      icon: UserX,
      active: !!matchUnassigned
    },
    {
      path: "assigned",
      label: "Assigned Students",
      icon: UserCheck,
      active: !!matchAssigned
    },
  ];

  return (
    <div className="assign-students-container">
      {/* Header Section */}
      <div className="assign-students-header">
        <div className="header-content">
          <h2>
            <Users size={28} />
            Student Management
          </h2>
          <p>Manage student data ,courses and batch  assignments efficiently</p>
        </div>
        <div className="admin-badge">
          <Shield size={16} />
          Admin Panel
        </div>
      </div>

      {/* Enhanced Tab Navigation */}
      <div className="tab-navigation">
        <ul className="tab-list">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <li key={tab.path} className="tab-item">
                <Link 
                  to={tab.path} 
                  className={`tab-link ${tab.active ? 'active' : ''}`}
                >
                  <IconComponent size={20} />
                  <span>{tab.label}</span>
                  {tab.active && (
                    <span className="tab-badge">Active</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Alternative Compact Tab Style (Uncomment to use) */}
      
      {/* <div className="compact-tabs">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <Link 
              key={tab.path}
              to={tab.path} 
              className={`compact-tab ${tab.active ? 'active' : ''}`}
            >
              <IconComponent size={18} />
              <span style={{ marginLeft: '0.5rem' }}>{tab.label}</span>
            </Link>
          );
        })}
      </div>
      */}

      {/* Content Area */}
      <div className="tab-content-area">
        <Outlet />
      </div>
    </div>
  );
};

export default AssignStudents;