import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useGetStudentEnrolledCoursesQuery } from "../../../Services/student/enrollFormServices";
import { Book, BookOpen, Play } from "lucide-react";




export default function MyLearnings() {
  const { user } = useSelector(state => state.auth);
  const { data: enrollment } = useGetStudentEnrolledCoursesQuery(user.id);
  const enrollments = enrollment?.data;
  const navigate = useNavigate();

  return (
    <div className="w-100">
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <div className="enrollment-dashboard">
          <div className="glass-card">
            <div className="card-header">
              <div className="header-content">
                <div className="icon-wrapper">
                  <Book />
                </div>
                <div className="header-text">
                  <h3>My Learning</h3>
                  <p>Continue your learning journey</p>
                </div>
              </div>
              {enrollments?.length > 0 && (
                <button
                  className="view-all-btn"
                  onClick={() => navigate("mycourses")}
                >
                  View All
                </button>
              )}
            </div>

            <div className="enrollments-container">
              {enrollments?.length > 0 ? (
                <div className="enrollments-grid">
                  {enrollments.slice(0, 3).map((enrollment) => (
                    <div key={enrollment._id} className="enrollment-card">
                      <div className="course-info">
                        <div className="course-thumbnail">
                          <img
                            src={enrollment.course?.thumbnail || '/default-course.jpg'}
                            alt={enrollment.course?.name}
                          />
                          <div className="category-badge">
                            {enrollment.course?.category}
                          </div>
                        </div>

                        <div className="course-details">
                          <h4 className="course-title">{enrollment.course?.name}</h4>
                          <p className="instructor">By {enrollment.course?.instructor}</p>

                          <div className="progress-section">
                            <div className="progress-header">
                              <span className="progress-label">Your progress</span>
                              <span className="progress-percent">{enrollment.progress}%</span>
                            </div>

                            <div className="progress-bar">
                              <div
                                className="progress-fill"
                                style={{ width: `${enrollment.progress}%` }}
                              ></div>
                            </div>

                            <div className="progress-stats">
                              <span>{enrollment.completedLessons?.length} of {enrollment.course?.totalLessons} lessons completed</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="action-section">
                        <button
                          className="continue-btn"
                          onClick={() => navigate(`/learn/${enrollment.courseId}`)}
                        >
                          {enrollment.progress > 0 ? 'Continue' : 'Start'} Learning
                          <Play />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">
                    <BookOpen />
                  </div>
                  <h4>No courses yet</h4>
                  <p>Enroll in your first course to start learning</p>
                  <button
                    className="browse-btn"
                    onClick={() => navigate("browsercourses")}
                  >
                    Browse Courses
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}