import React from 'react';

const UpcomingClasses = () => {
  const classes = [
    { time: '9:00 AM', title: 'React Hooks', tutor: 'Ananya Sharma' },
    { time: '11:30 AM', title: 'UI Design Principles', tutor: 'Rahul Mehra' },
    { time: '2:00 PM', title: 'Advanced JavaScript', tutor: 'Priya Verma' },
  ];

  return (
    <div className="card border-0 shadow-sm  h-100">
      <div className="card-header bg-primary text-white rounded-top">
        <h6 className="mb-0">📅 Upcoming Classes</h6>
      </div>
      <div className="card-body pt-3">
        <ul className="list-unstyled mb-0">
          {classes.map((cls, index) => (
            <li key={index} className="d-flex mb-3 align-items-start">
              <div className="bg-primary rounded-circle me-3 mt-1" style={{ width: '10px', height: '10px' }}></div>
              <div className="flex-grow-1">
                <h6 className="mb-1 text-dark">{cls.title}</h6>
                <small className="text-muted">{cls.time} • {cls.tutor}</small>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UpcomingClasses;