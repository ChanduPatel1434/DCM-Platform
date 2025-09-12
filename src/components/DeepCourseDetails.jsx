import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { coursesData, allCoursesList } from '../data/coursesData';

const CourseDetails = () => {
  const { courseId } = useParams();
  
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = () => {
      try {
        // Get course data based on URL parameter
        const courseKey = courseId || 'java-fullstack';
        const courseData = coursesData[courseKey];
        
        if (courseData) {
          setCourse(courseData);
        } else {
          // Redirect to default course if not found
          
        }
        setLoading(false);
      } catch (error) {
        console.error("Error loading course data:", error);
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId, navigate]);

  const handleCourseChange = (courseTitle) => {
    // Convert course title to URL-friendly format
    const coursePath = courseTitle.toLowerCase().replace(/\s+/g, '-');
    navigate(`${coursePath}`);
  };

  if (loading) {
    return <div className="container text-center py-5">Loading course details...</div>;
  }

  if (!course) {
    return <div className="container text-center py-5">Course not found.</div>;
  }

  return (
    <div className="main">
      {/* Header Section */}
      <section className="hero-section ptb-100 gradient-overlay"
               style={{ background: "url('/img/header-bg-5.jpg') no-repeat top center / cover" }}>
        <div className="hero-bottom-shape-two" style={{ background: "url('/img/hero-bottom-shape.svg') no-repeat bottom center" }}></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-7">
              <div className="page-header-content text-white text-center pt-sm-5 pt-md-5 pt-lg-0">
                <h1 className="text-white mb-0">{course.title}</h1>
               
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Details Section */}
      <section className="service-details-section ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-8">
              <div className="service-details-wrap">
                <img src={course.image} alt={course.title} className="img-fluid rounded shadow-sm"/>
                <div className="services-detail-content mt-4">
                  <h4>Course Overview</h4>
                  {course.fullDescription.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}

                  <div className="row mt-5">
                    <div className="col-md-6">
                      <div className="img-wrap">
                        <img src="/img/images.jpg" alt="course content" className="img-fluid"/>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <ul className="list-unstyled tech-feature-list">
                        {course.features.map((feature, index) => (
                          <li key={index} className="py-1">
                            <span className="ti-check-box mr-2 color-secondary"></span>
                            <strong>{feature.split(' ')[0]}</strong> {feature.split(' ').slice(1).join(' ')}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div id="accordion-1" className="accordion accordion-faq mt-5">
                    {course.faqs.map((faq, index) => (
                      <div key={index} className="card">
                        <div className="card-header py-3 collapsed" id={`heading-1-${index}`} 
                             data-toggle="collapse" role="button" 
                             data-target={`#collapse-1-${index}`} 
                             aria-expanded="false" 
                             aria-controls={`collapse-1-${index}`}>
                          <h6 className="mb-0">
                            <span className={index === 0 ? "ti-receipt mr-3" : index === 1 ? "ti-gallery mr-3" : "ti-wallet mr-3"}></span> 
                            {faq.question}
                          </h6>
                        </div>
                        <div id={`collapse-1-${index}`} className="collapse" 
                             aria-labelledby={`heading-1-${index}`} 
                             data-parent="#accordion-1">
                          <div className="card-body">
                            <p>{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Enroll Button */}
                  <div className="mt-5 text-center">
                    <button className="btn btn-primary btn-lg">Enroll Now</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-4">
              <div className="sidebar-right pl-4">
                {/* All Courses List */}
                <aside className="widget widget-categories">
                  <div className="widget-title">
                    <h5>All Courses</h5>
                  </div>
                  <ul className="all-service-list">
                    {allCoursesList.map((courseName, index) => (
                      <li key={index}>
                        <a 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            handleCourseChange(courseName);
                          }}
                          className={courseName === course.title ? "active" : ""}
                        >
                          {courseName}
                        </a>
                      </li>
                    ))}
                  </ul>
                </aside>

                {/* Course Enrollment Card */}
                <aside className="widget widget-categories mb-4">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body text-center">
                      <h5 className="card-title">Enroll Now</h5>
                      <div className="price-tag mb-3">
                        <span className="h3 text-primary">{course.price}</span>
                        <span className="text-muted"> only</span>
                      </div>
                      <p className="card-text">
                        <span className="ti-time mr-2"></span>
                        {course.duration}
                      </p>
                      <p className="card-text">
                        <span className="ti-video-camera mr-2"></span>
                        {course.mode}
                      </p>
                      <button className="btn btn-primary btn-block mt-3">Join Live Classes</button>
                      <button className="btn btn-outline-primary btn-block mt-2">Download Syllabus</button>
                    </div>
                  </div>
                </aside>

                {/* Need Help */}
                <aside className="widget widget-categories">
                  <div className="widget-title">
                    <h5>Need Help?</h5>
                  </div>
                  <p>We are available 24/7 for dedicated support</p>
                  <ul className="primary-list mt-25">
                    <li><span className="ti-location-pin mr-2 color-primary"></span> Madhapur, Hyderabad, Telangana, India - 500081</li>
                    <li><span className="ti-mobile mr-2 color-primary"></span> (+123) 456-789-012</li>
                    <li><span className="ti-email mr-2 color-primary"></span> info@designcareermetrics.com</li>
                  </ul>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="call-to-action py-5 gray-light-bg">
        <div className="container">
          <div className="row justify-content-around align-items-center">
            <div className="col-md-7">
              <div className="subscribe-content">
                <h3 className="mb-1">Start Your Tech Career Today</h3>
                <p>Join thousands of students who have transformed their careers with our courses.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="action-btn text-lg-right text-sm-left">
                <button className="btn secondary-solid-btn">Explore All Courses</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetails;