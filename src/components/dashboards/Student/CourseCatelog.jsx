import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCoursesCategoryQuery } from '../../../Services/admin/coursesCategoryServices';
import { useGetStudentEnrolledCoursesQuery } from '../../../Services/student/enrollFormServices';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useAddItemMutation } from '../../../Services/student/cartServices';
import { useUnenrolledCourses } from '../../../hooks/useUnenrolledcourses';
import { 
  Clock, 
  BookOpen, 
  ShoppingCart, 
  Search 
} from 'lucide-react';


// Icon Components
const ClockIcon = () => <Clock size={14} />;
const BookIcon = () => <BookOpen size={14} />;
const ShoppingCartIcon = () => <ShoppingCart size={16} />;
const SearchIcon = () => <Search size={18} />;

const CourseCard = ({ course, handleAdd, isAdded }) => {
  const navigate = useNavigate();
  const instructorInitials = course.instructor
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();

  return (
    <div className="course-card">
      <div className="card-image">
        <img src={course.thumbnail} alt={course.name} />
        <div className="category-badge">{course.category}</div>
        <div className="live-badge">LIVE</div>
      </div>
      
      <div className="card-content m-0 px-4 pt-2">
        <h3 className="course-title">{course.name}</h3>
        <p className="course-description">{course.description}</p>
        
        <div className="course-meta">
          <div className="meta-item">
            <ClockIcon />
            <span>{course.duration}</span>
          </div>
          <div className="meta-item">
            <BookIcon />
            <span>{course.totalLessons} lessons</span>
          </div>
        </div>
        
        <div className="instructor">
          <div className="instructor-avatar">
            {instructorInitials}
          </div>
          <span className="instructor-name">{course.instructor}</span>
        </div>
      </div>
      
      <div className="card-footer">
        <div className="course-price">₹{course.price}</div>
        
        <div className="card-actions">
          <button 
            className="btn-outline btn btn-sm"
            onClick={() => navigate(`/dashboard/course/details`)}
          >
            View Details
          </button>
          <button 
            className={`btn-primary btn  btn-sm ${isAdded ? 'added' : ''}`}
            onClick={() => handleAdd(course._id)}
            disabled={isAdded}
          >
            {isAdded ? 'Added to Cart!' : 'Add to Cart'}
            {!isAdded && <ShoppingCartIcon />}
          </button>
        </div>
      </div>
    </div>
  );
};

const CourseCatalog = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useSelector(state => state.auth);
  
  // Get enrolled courses
  const { 
    data: enrolledCourses, 
    isLoading: enrolledLoading, 
    error: enrolledError 
  } = useGetStudentEnrolledCoursesQuery(user?.id, {
    skip: !user
  });

  const enrolledIds = enrolledCourses?.data?.map(c => c.course?._id) || [];
  
  // Get unenrolled courses
  const { 
    courses, 
    isLoading: coursesLoading, 
    error: coursesError 
  } = useUnenrolledCourses(enrolledIds);
  
  // Add to cart mutation
  const [addItem, { isLoading: addingToCart }] = useAddItemMutation();
  
  

  // Handle adding to cart
  const handleAdd = async (courseId) => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }
    try {
      await addItem({ userId: user.id, courseId }).unwrap();
      toast.success('Added to cart!');
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('Failed to add to cart');
    }
  };
  
  // Filter courses based on category and search query
  const filteredCourses = courses?.filter(course => {
    const matchesCategory = activeFilter === 'All' || course.category === activeFilter;
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Loading state
  if (enrolledLoading || coursesLoading) {
    return (
      <div className="course-catalog">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading courses...</p>
        </div>
      </div>
    );
  }

  // Error states
  if (enrolledError || coursesError ) {
    return (
      <div className="course-catalog">
        <div className="error-container">
          <h3>Something went wrong</h3>
          <p>Unable to load courses. Please try again later.</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="course-catalog">
      <div className="catalog-header">
        <div className="header-content">
          <h1>Live Course Catalog</h1>
          <p>Browse and enroll in our interactive live classes</p>
        </div>
        
        <div className="header-actions">
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search courses, instructors, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchIcon />
          </div>
        </div>
      </div>

      {/* <div className="catalog-filters">
        <div className="filter-buttons">
          <button 
            key="All"
            className={`filter-btn ${activeFilter === 'All' ? 'active' : ''}`}
            onClick={() => setActiveFilter('All')}
          >
            All
          </button>
          {categories?.map(category => (
            <button 
              key={category._id || category}
              className={`filter-btn ${activeFilter === category.name ? 'active' : ''}`}
              onClick={() => setActiveFilter(category.name)}
            >
              {category.name || category}
            </button>
          ))}
        </div>
        
        <div className="results-count">
          {filteredCourses?.length || 0} {filteredCourses?.length === 1 ? 'course' : 'courses'} found
        </div>
      </div> */}

      <div className="courses-grid">
        {filteredCourses?.map(course => (
          <CourseCard 
            key={course._id} 
            course={course} 
            handleAdd={handleAdd}
            isAdded={false}
          />
        ))}
      </div>

      {filteredCourses?.length === 0 && (
        <div className="no-results">
          <SearchIcon size={48} />
          <h3>No courses found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default CourseCatalog;