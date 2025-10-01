import React, { useState, useEffect } from 'react';
import { coursesAds } from '../../../data/coursesAds';
import styles from './CourseAds.module.css';

const CourseAdsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Create extended slides array for seamless looping
  const extendedSlides = [...coursesAds, coursesAds[0]]; // Add first slide at the end
  const totalSlides = coursesAds.length;
  const extendedTotal = extendedSlides.length;

  // Auto-rotate carousel with true infinite loop
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        if (prev >= extendedTotal - 1) {
          // Jump to first slide (clone) without animation
          setIsTransitioning(false);
          return 0;
        }
        setIsTransitioning(true);
        return prev + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [extendedTotal]);

  // Handle transition end
  const handleTransitionEnd = () => {
    if (activeIndex === totalSlides) {
      // When we reach the clone slide, instantly jump back to first real slide
      setIsTransitioning(false);
      setActiveIndex(0);
    }
  };

  const calculateDiscount = (original, current) => {
    const orig = parseInt(original);
    const curr = parseInt(current);
    return (orig - curr) + "rs";
  };

  return (
    <div className={styles['course-ads-carousel-container']}>
      <div className={styles['course-carousel-wrapper']}>
        <div className={styles['course-carousel']}>
          <div 
            className={styles['carousel-track']}
            style={{ 
              transform: `translateX(-${activeIndex * 100}%)`,
              transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none'
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedSlides.map((course, index) => (
              <div key={`${course.id}-${index}`} className={styles['carousel-slide']}>
                <div 
                  className={styles['slide-background']}
                  style={{ background: course.gradient }}
                ></div>
                
                <div className={styles['slide-overlay']}>
                  <div className={`container-fluid h-100 ${styles.container}`}>
                    <div className={`row align-items-center h-100 ${styles.row}`}>
                      <div className={`col-lg-8 col-md-7 ${styles['content-column']}`}>
                        <div className={styles['course-content']}>
                          <h3 className={`text-white ${styles['course-title']}`}>{course.title}</h3>
                          
                          <p className={styles['course-description']}>{course.description}</p>
                          
                          <div className={`mb-3 ${styles['course-features']}`}>
                            <div className={styles['features-list']}>
                              {course.features.map((feature, idx) => (
                                <span key={idx} className={styles['feature-tag']}>
                                  <i className="fas fa-check"></i> {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className={`mb-3 ${styles['course-meta']}`}>
                            <span className={styles['meta-item']}>
                              <i className="fas fa-clock"></i> {course.duration}
                            </span>
                            <span className={styles['meta-item']}>
                              <i className="fas fa-users"></i> {course.students}
                            </span>
                          </div>
                          
                          <div className={styles['course-footer']}>
                            <div className={styles['price-section']}>
                              <span className={styles['current-price']}>{course.price}</span>
                              <span className={styles['original-price']}>{course.originalPrice}</span>
                              <span className={styles.discount}>
                                Save {calculateDiscount(course.originalPrice, course.price)}
                              </span>
                            </div>
                            
                            <div className={styles['action-buttons']}>
                              <button className={`btn btn-primary ${styles['btn-enroll']}`}>
                                Enroll Now
                              </button>
                              <button className={`btn btn-outline-light ${styles['btn-details']}`}>
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className={`col-lg-4 col-md-5 d-none d-md-block ${styles['visual-column']}`}>
                        <div className={styles['course-visual']}>
                          <div className={styles['tech-stack']}>
                            {course.features.map((feature, idx) => (
                              <div key={idx} className={styles['tech-item']}>
                                {feature.split(' ')[0]}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

       

     
      </div>
    </div>
  );
};

export default CourseAdsCarousel; 