// CourseCard.jsx
import React, { useState } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

const CourseCard = ({ course }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleDetails = () => setExpanded(!expanded);

  return (
    <div className="card border rounded shadow-sm">
      <div className="card-body">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h6 className="text-primary mb-1">{course.name}</h6>
            <span className="badge bg-secondary">{course.badge}</span>
          </div>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={toggleDetails}
            aria-label="Toggle course details"
          >
            {expanded ? <MdExpandLess /> : <MdExpandMore />}
          </button>
        </div>

        {/* Core Info */}
        <p className="text-muted mt-2 mb-1">Tutor: <strong>{course.tutor}</strong></p>
        <p className="mb-2 text-muted">Next Class: {course.nextClass}</p>

        <div className="progress mb-2" style={{ height: '6px' }}>
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: `${course.progress}%` }}
            aria-valuenow={course.progress}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <small className="text-muted">Progress: {course.progress}%</small>

        {/* Expandable Section */}
        {expanded && (
          <div className="mt-3 bg-light rounded p-2">
            <h6 className="text-dark mb-2">Course Details</h6>
            <ul className="list-unstyled mb-1">
              <li><strong>Syllabus:</strong> React Basics → Hooks → Router</li>
              <li><strong>Assignments:</strong> 2 pending</li>
              <li><strong>Feedback:</strong> Reviewed  ✅</li>
              <li><strong>Resources:</strong> GitHub Repo, Figma files</li>
            </ul>
            <button className="btn btn-sm btn-outline-primary">Go to Course</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;