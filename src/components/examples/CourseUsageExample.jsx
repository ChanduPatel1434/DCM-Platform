// Example of how to use the dynamic course components in your routing

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CoursesPage from '../CoursesPage';
import DynamicCourses from '../dashboards/Admin/Addcourse/DynamicCourses';

// Example routing setup
const CourseRoutes = () => {
  return (
    <Routes>
      {/* Full courses page with hero section */}
      <Route path="/courses" element={<CoursesPage />} />
      
      {/* Just the courses section (for embedding in other pages) */}
      <Route path="/courses-section" element={<DynamicCourses />} />
    </Routes>
  );
};

// Example of embedding just the courses section in another component
const HomePage = () => {
  return (
    <div>
      {/* Other homepage content */}
      <section className="hero-section">
        <h1>Welcome to Our Platform</h1>
      </section>
      
      {/* Embed dynamic courses */}
      <DynamicCourses />
      
      {/* Other homepage content */}
    </div>
  );
};

export { CourseRoutes, HomePage };