// TutorCard.jsx
import React from 'react';

const TutorCard = () => {
  const tutor = {
    name: 'Ananya Sharma',
    subject: 'UI/UX Design',
    status: 'Online',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg', // Sample image
  };

  const statusClass = tutor.status === 'Online' ? 'bg-success' : 'bg-secondary';

  return (
    <div className="card p-3 text-center h-100">
      <img
        src={tutor.avatar}
        alt="Tutor Avatar"
        className="rounded-circle mb-2"
        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
      />
      <h6 className="mb-0 text-dark">{tutor.name}</h6>
      <small className="text-muted">{tutor.subject}</small>
      <div
        className={`mt-2 badge ${statusClass} text-white`}
        style={{ fontSize: '0.75rem' }}
      >
        {tutor.status}
      </div>
      <button className="btn btn-sm btn-primary mt-3">Message Tutor</button>
    </div>
  );
};

export default TutorCard;