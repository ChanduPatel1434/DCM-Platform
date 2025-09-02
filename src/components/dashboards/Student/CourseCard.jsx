// // CourseCard.jsx
// import React, { useState } from 'react';
// import { MdExpandMore, MdExpandLess } from 'react-icons/md';

// const CourseCard = ({ course }) => {
//   const [expanded, setExpanded] = useState(false);

//   const toggleDetails = () => setExpanded(!expanded);

//   return (
//     <div className="card border rounded shadow-sm">
//       <div className="card-body">
//         {/* Header */}
//         <div className="d-flex justify-content-between align-items-start">
//           <div>
//             <h6 className="text-primary mb-1">{course.name}</h6>
//             <span className="badge bg-secondary">{course.badge}</span>
//           </div>
//           <button
//             className="btn btn-sm btn-outline-secondary"
//             onClick={toggleDetails}
//             aria-label="Toggle course details"
//           >
//             {expanded ? <MdExpandLess /> : <MdExpandMore />}
//           </button>
//         </div>

//         {/* Core Info */}
//         <p className="text-muted mt-2 mb-1">Tutor: <strong>{course.tutor}</strong></p>
//         <p className="mb-2 text-muted">Next Class: {course.nextClass}</p>

//         <div className="progress mb-2" style={{ height: '6px' }}>
//           <div
//             className="progress-bar bg-success"
//             role="progressbar"
//             style={{ width: `${course.progress}%` }}
//             aria-valuenow={course.progress}
//             aria-valuemin="0"
//             aria-valuemax="100"
//           ></div>
//         </div>
//         <small className="text-muted">Progress: {course.progress}%</small>

//         {/* Expandable Section */}
//         {expanded && (
//           <div className="mt-3 bg-light rounded p-2">
//             <h6 className="text-dark mb-2">Course Details</h6>
//             <ul className="list-unstyled mb-1">
//               <li><strong>Syllabus:</strong> React Basics → Hooks → Router</li>
//               <li><strong>Assignments:</strong> 2 pending</li>
//               <li><strong>Feedback:</strong> Reviewed  ✅</li>
//               <li><strong>Resources:</strong> GitHub Repo, Figma files</li>
//             </ul>
//             <button className="btn btn-sm btn-outline-primary">Go to Course</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CourseCard;
import { motion } from "framer-motion";
import React from "react";

const CourseCard = ({ course, onJoinLive, onViewTasks }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="card shadow-sm mb-4"
    >
      <div className="card-body">
        <h5 className="card-title">{course.title}</h5>
        <p className="card-text text-muted">{course.description}</p>
        <p className="card-text">
          <strong>Batch:</strong> {course.batchName}
        </p>

        <div className="d-flex gap-2 mt-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-success"
            onClick={() => onJoinLive(course.batch_id)}
          >
            View Details
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary"
            onClick={() => onViewTasks(course.course_id)}
          >
            📋 See Tasks
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;