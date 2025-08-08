import { useEffect, useState } from 'react';
import ProfileSidebar from "./TopbarSections/ProfileSidebar"
import "./TopbarSections/profilesidebar.css"
import { Menu,  } from 'react-feather';

import NotificationDropdown from './TopbarSections/Notification';
import { useSelector } from 'react-redux';
import FullscreenToggle from './TopbarSections/FullScreen';
import ThemeToggle from './TopbarSections/ThemeToggle';


const Topbar = () => {

  const { user } = useSelector(state => state.auth);
  console.log("User in Topbar:", user);
  const [showProfileSidebar, setShowProfileSidebar] = useState(false);
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const toggleSidebar = () => {
    setSidebarHidden(prev => !prev);
  };
  useEffect(() => {

    document.body.setAttribute("data-sidebar", sidebarHidden ? "hidden" : "default");
  }, [sidebarHidden]);

  return <>
    <div className="topbar-custom shadow-sm">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center">

          {/* Left side */}
          <ul className="list-unstyled topnav-menu mb-0 d-flex align-items-center gap-3">
            <li>
              <button className="button-toggle-menu nav-link" onClick={toggleSidebar}>
   <Menu size={20} className="noti-icon text-muted" />              </button>
            </li>

            <li className="d-none d-lg-block">
              <h5 className="mb-0 fw-semibold">Welcome back 👋</h5>
            </li>

            <li className="d-none d-md-block">
              <form className="app-search me-auto">
                <div className="position-relative topbar-search">
                  <input type="text" className="form-control ms-1 ps-5" placeholder="Search..." />
                  <i data-feather="search" className="fs-5 position-absolute text-muted top-50 translate-middle-y ms-3"></i>
                </div>
              </form>
            </li>
          </ul>

          {/* Right side */}
          <ul className="list-unstyled topnav-menu mb-0 d-flex align-items-center gap-3">

            <li className="d-none d-sm-flex">

              <FullscreenToggle />
            </li>

            <li className="d-none d-sm-flex">
              <ThemeToggle />


            </li>

            {/* Notifications */}
<NotificationDropdown/>



            {/* Profile */}
            <li className="dropdown notification-list topbar-dropdown">
              <a
                className="nav-link nav-user d-flex align-items-center gap-2"
                onClick={() => setShowProfileSidebar(true)}
                role="button"
              >
                <img
                  src="/img/users/user-13.jpg"
                  alt="user"
                  className="rounded-circle"
                  height="32"
                />
                <span>{user?.name}</span>
              </a>

              <div className={`profile-sidebar ${showProfileSidebar ? 'open' : ''}`}>
                <ProfileSidebar user={user} onClose={() => setShowProfileSidebar(false)} />
              </div>
            </li>

          </ul>
        </div>
      </div>
    </div>

  </>
}
export default Topbar