import React, { useState, useEffect, useRef } from 'react';
import { Bell } from 'react-feather';

const notifications = [
  {
    id: 1,
    user: 'Ralph Edwards',
    time: '5 min ago',
    message: 'Completed Improve workflow in React',
    avatar: '/assets/images/users/user-5.jpg',
  },
  {
    id: 2,
    user: 'Jacob Jones',
    time: '7 min ago',
    message: "@Patryk Please make sure that you're...",
    avatar: '/assets/images/users/user-6.jpg',
  },
];

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (open && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <li className="position-relative list-unstyled d-inline-block" ref={dropdownRef}>
      <button
        className="btn position-relative p-0 border-0 bg-transparent"
        onClick={() => setOpen(!open)}
      >
        <Bell size={20} />
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {notifications.length}
        </span>
      </button>

      {open && (
        <div
          className="dropdown-menu p-3 shadow rounded mt-2"
          style={{
            display: 'block',
            position: 'absolute',
            top: '100%',
            right: '100%',
            minWidth: '300px',
            zIndex: 1050,
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="mb-0 fw-semibold">Notifications</h6>
            <button className="btn btn-sm text-primary p-0">Clear All</button>
          </div>
          <div className="overflow-auto" style={{ maxHeight: '250px' }}>
            {notifications.map(({ id, user, time, message, avatar }) => (
              <div key={id} className="d-flex gap-3 py-2 border-bottom">
                <img src={avatar} alt={user} className="rounded-circle" width={40} height={40} />
                <div>
                  <strong className="text-dark">{user}</strong>
                  <p className="mb-0 text-muted small">{message}</p>
                  <small className="text-muted">{time}</small>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-2">
            <a href="#" className="text-primary text-decoration-none small">View all</a>
          </div>
        </div>
      )}
    </li>
  );
};

export default NotificationDropdown;