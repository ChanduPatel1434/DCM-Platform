import React, { useState } from 'react';
import { useCourses } from '../../../hooks/useCourses';

const CoursePlatform = () => {
  const { courses } = useCourses();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter courses based on category and search query
  const filteredCourses = courses?.filter(course => {
    const matchesCategory = activeFilter === 'All' || course.category === activeFilter;
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }) || [];

  // Get unique categories for filters
  const categories = ['All', ...new Set(courses?.map(course => course.category) || [])];

  return (
    <div className="course-platform">
      {/* Search Bar */}
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search for courses, subjects, or instructors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button>Search</button>
      </div>  
      
      {/* Courses Section */}
      <section className="courses-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Courses</h2>
            <p>Handpicked selection of our most popular and highest-rated courses</p>
          </div>

          <div className="filters">
            {categories.map(category => (
              <button 
                key={category}
                className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="row">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        :root {
          --primary: #2c3e50;
          --secondary: #8e44ad;
          --accent: #e67e22;
          --light: #f9f9f9;
          --dark: #2c3e50;
          --gray: #95a5a6;
          --shadow-sm: 0 4px 6px rgba(0, 0, 0, 0.05);
          --shadow-md: 0 10px 15px rgba(0, 0, 0, 0.1);
          --border-radius: 8px;
          --transition: all 0.3s ease;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .search-bar {
          max-width: 600px;
          margin: 2rem auto;
          position: relative;
        }

        .search-bar input {
          width: 100%;
          padding: 1rem 1.5rem;
          border-radius: 50px;
          border: none;
          font-size: 1rem;
          box-shadow: var(--shadow-sm);
        }

        .search-bar button {
          position: absolute;
          right: 5px;
          top: 5px;
          background: var(--accent);
          color: white;
          border: none;
          border-radius: 50px;
          padding: 0.8rem 1.5rem;
          cursor: pointer;
          transition: var(--transition);
        }

        .search-bar button:hover {
          background: #d35400;
        }

        /* Courses Section */
        .courses-section {
          padding: 2rem 0;
        }

        .section-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .section-header h2 {
          font-size: 2rem;
          position: relative;
          display: inline-block;
          padding-bottom: 0.5rem;
          font-family: 'poppins', serif;
        }

        .section-header h2::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: var(--accent);
        }

        .filters {
          display: flex;
          justify-content: center;
          gap: 0.8rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 0.5rem 1.2rem;
          background: white;
          border: 1px solid #ddd;
          border-radius: 50px;
          cursor: pointer;
          transition: var(--transition);
        }

        .filter-btn:hover, .filter-btn.active {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }

        .row {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .row {
            grid-template-columns: 1fr;
          }
          
          .filters {
            gap: 0.5rem;
          }
          
          .filter-btn {
            padding: 0.4rem 1rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

// Course Card Component
const CourseCard = ({ course }) => {
  const instructorInitials = course?.instructor
    ?.split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase() || '';

  return (
    <div className="course-card">
      <div className="card-img-container">
        <img src={course?.imageUrl} alt={course?.name} />
        <span className="card-category">{course?.category}</span>
      </div>
      <div className="card-body">
        <h3 className="card-title">{course?.name}</h3>
        <p className="card-description">{course?.description}</p>
        
        <div className="card-meta">
          <span>📺 {course?.totalLessons} lessons</span>
          <span>⏱️ {course?.duration}</span>
        </div>
        
        <div className="card-footer">
          <div className="instructor">
            <div className="instructor-avatar">{instructorInitials}</div>
            <span>{course?.instructor}</span>
          </div>
          <div className="price">{course?.price}rs</div>
        </div>
        
        <div className="card-actions">
          <button className="btn btn-primary">Add to Cart</button>
          <button className="btn btn-outline">View Details</button>
        </div>
      </div>

      <style jsx>{`
        .course-card {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .course-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        }

        .card-img-container {
          height: 180px;
          overflow: hidden;
          position: relative;
        }

        .card-img-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.3s ease;
        }

        .course-card:hover .card-img-container img {
          transform: scale(1.05);
        }

        .card-category {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: #8e44ad;
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .card-body {
          padding: 1.2rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .card-title {
          font-size: 1.2rem;
          margin-bottom: 0.8rem;
          font-family: 'Playfair Display', serif;
        }

        .card-description {
          color: #95a5a6;
          margin-bottom: 1.2rem;
          flex-grow: 1;
        }

        .card-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1.2rem;
          font-size: 0.9rem;
          color: #95a5a6;
        }

        .card-meta span {
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
        }

        .instructor {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .instructor-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #e67e22;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 0.7rem;
        }

        .price {
          font-weight: 600;
          color: #2c3e50;
        }

        .card-actions {
          display: flex;
          gap: 0.8rem;
          margin-top: 1.2rem;
        }

        .btn {
          padding: 0.5rem 1rem;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          text-decoration: none;
          font-size: 0.9rem;
        }

        .btn-primary {
          background: #2c3e50;
          color: white;
        }

        .btn-primary:hover {
          background: #1e2a36;
        }

        .btn-outline {
          background: transparent;
          border: 1px solid #2c3e50;
          color: #2c3e50;
        }

        .btn-outline:hover {
          background: #2c3e50;
          color: white;
        }

        @media (max-width: 768px) {
          .card-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default CoursePlatform;