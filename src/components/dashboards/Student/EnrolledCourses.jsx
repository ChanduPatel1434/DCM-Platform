// EnrolledCourses.jsx
import React from 'react';

const EnrolledCourses = () => {

  
  const courses = [
    { name: 'React Fundamentals', progress: 78 },
    { name: 'UI/UX Design', progress: 42 },
    { name: 'JavaScript Deep Dive', progress: 90 },
  ];

  return (
    <div className="card p-3 h-100">
      <h6 className="text-dark mb-3">Your Courses</h6>
      {courses.map((course, index) => (
        <div key={index} className="mb-2">
          <div className="d-flex justify-content-between">
            <span>{course.name}</span>
            <span>{course.progress}%</span>
          </div>
          <div className="progress">
            <div
              className="progress-bar bg-primary"
              role="progressbar"
              style={{ width: `${course.progress}%` }}
              aria-valuenow={course.progress}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      ))}
      <button className="btn btn-outline-primary mt-3 w-100">View More</button>
    </div>
  );
};

export default EnrolledCourses;