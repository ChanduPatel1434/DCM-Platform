// ...existing code...
import React, { useEffect, useRef } from 'react';
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import data from '../../../data/data.json';
import './student.css'; // Assuming you have a CSS file for styles


const StudentCoursesDetails = () => {
    const paidCourses = data.paidCourses

    useEffect(() => {
        // Initialize carousel after component mounts and Bootstrap is loaded
        const initCarousel  = () => {
            const carouselElement = document.getElementById("courseCarousel");
            if (carouselElement && window.bootstrap) {
                // Dispose existing carousel if it exists
                const existingCarousel = window.bootstrap.Carousel.getInstance(carouselElement);
                if (existingCarousel) {
                    existingCarousel.dispose();
                }

                // Create new carousel instance
                new window.bootstrap.Carousel(carouselElement, {
                    interval: 3000, // Changed from 1000ms to 3000ms for better UX
                    wrap: true,
                    ride: 'carousel'
                });
            }
        };

        // Delay initialization to ensure Bootstrap is loaded
        const timer = setTimeout(initCarousel, 100);

        return () => clearTimeout(timer);
    }, []);

    const scrollContainerRef = useRef(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -340, // Card width + gap
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 340, // Card width + gap
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        console.log(paidCourses)
    }, []);

    return (
        <>
            <Container className="mt-5">
                <div className="container-fluid py-5">
                    <div id="courseCarousel" className="carousel slide" data-bs-ride="carousel">
                        {/* Indicators */}
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#courseCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#courseCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#courseCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            <button type="button" data-bs-target="#courseCarousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
                            <button type="button" data-bs-target="#courseCarousel" data-bs-slide-to="4" aria-label="Slide 5"></button>
                        </div>

                        <div className="carousel-inner">
                            {/* Slide 1 - MERN */}
                            <div className="carousel-item active" >
                                <div className="course-slide p-4" style={{ background: 'linear-gradient(135deg, #eaf4fe 0%, #dbd1f9 100%)' }}>
                                    <div className="badge-notification">New Batch: 25 August</div>
                                    <div className="row align-items-center text-center text-md-start">
                                        <div className="col-md-6">
                                            <h1 className="course-title" style={{ color: '#e67e22' }}>
                                                MERN <span className="text-secondary">Stack</span>
                                            </h1>
                                            <p className="course-subtitle">
                                                By Industry Experts <br />
                                                Learn MongoDB, Express, React, and Node.js to become a job-ready fullstack developer.
                                            </p>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="feature-card red-title">
                                                <div className="feature-title">Live Projects</div>
                                                <div className="feature-desc">Hands-on real world applications</div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 d-flex justify-content-center justify-content-md-start">
                                            <button className="enroll-btn">Enroll Now →</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Slide 2 - MEAN */}
                            <div className="carousel-item">
                                <div className="course-slide p-4" style={{ background: 'linear-gradient(135deg, #dff9fb 0%, #c7ecee 100%)' }}>
                                    <div className="badge-notification">New Batch: 1 September</div>
                                    <div className="row align-items-center text-center text-md-start">
                                        <div className="col-md-6">
                                            <h1 className="course-title" style={{ color: '#0984e3' }}>
                                                MEAN <span className="text-secondary">Stack</span>
                                            </h1>
                                            <p className="course-subtitle">
                                                By Expert Mentors <br />
                                                Master MongoDB, Angular, React, and Node.js for building enterprise-level applications.
                                            </p>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="feature-card red-title">
                                                <div className="feature-title">Hybrid Projects</div>
                                                <div className="feature-desc">Angular + React based apps</div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 d-flex justify-content-center justify-content-md-start">
                                            <button className="enroll-btn" style={{ background: '#0984e3' }}>Enroll Now →</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Slide 3 - Testing */}
                            <div className="carousel-item">
                                <div className="course-slide p-4" style={{ background: 'linear-gradient(135deg, #ebc7fd 0%, #f290f5 100%)' }}>
                                    <div className="badge-notification">New Batch: 10 September</div>
                                    <div className="row align-items-center text-center text-md-start">
                                        <div className="col-md-6">
                                            <h1 className="course-title" style={{ color: '#d63031', fontSize: '1.8rem' }}>
                                                Manual + Automation <span className="text-secondary">Testing</span>
                                            </h1>
                                            <p className="course-subtitle">
                                                By Testing Experts <br />
                                                Become a professional tester with expertise in Manual, Selenium, and Automation tools.
                                            </p>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="feature-card red-title">
                                                <div className="feature-title">Automation Labs</div>
                                                <div className="feature-desc">Hands-on Selenium & tools</div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 d-flex justify-content-center justify-content-md-start">
                                            <button className="enroll-btn" style={{ background: '#d63031' }}>Enroll Now →</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Slide 4 - Java Fullstack */}
                            <div className="carousel-item">
                                <div className="course-slide p-4" style={{ background: 'linear-gradient(135deg, #b0ffe9 0%, #88f2c9 100%)' }}>
                                    <div className="badge-notification">New Batch: 15 September</div>
                                    <div className="row align-items-center text-center text-md-start">
                                        <div className="col-md-6">
                                            <h1 className="course-title" style={{ color: '#2d3436' }}>Java Fullstack</h1>
                                            <p className="course-subtitle">
                                                By Senior Trainers <br />
                                                Learn Core Java, Spring Boot, Hibernate, Angular/React to become a fullstack engineer.
                                            </p>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="feature-card red-title">
                                                <div className="feature-title">Spring Boot</div>
                                                <div className="feature-desc">Advanced backend frameworks</div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 d-flex justify-content-center justify-content-md-start">
                                            <button className="enroll-btn" style={{ background: '#2d3436' }}>Enroll Now →</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Slide 5 - Power BI */}
                            <div className="carousel-item">
                                <div className="course-slide p-4" style={{ background: 'linear-gradient(135deg, #b0ffe9 0%, #7b8a84ff 100%)' }}>
                                    <div className="badge-notification">New Batch: 20 September</div>
                                    <div className="row align-items-center text-center text-md-start">
                                        <div className="col-md-6">
                                            <h1 className="course-title" style={{ color: '#0b4656ff' }}>Power BI</h1>
                                            <p className="course-subtitle">
                                                By Industry Experts <br />
                                                Learn Data Visualization, DAX, Power Query, and Dashboard Building to
                                                become a Power BI Professional.
                                            </p>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="feature-card red-title">
                                                <div className="feature-title">Data Analytics</div>
                                                <div className="feature-desc">Interactive dashboards & reports</div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 d-flex justify-content-center justify-content-md-start">
                                            <button className="enroll-btn" style={{ background: '#2d3436' }}>Enroll Now →</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Controls */}
                        <button className="carousel-control-prev bg-transparent" type="button" data-bs-target="#courseCarousel" data-bs-slide="prev">
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next bg-transparent" type="button" data-bs-target="#courseCarousel" data-bs-slide="next">
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </Container>

            <Container className="mt-5">
                <h4 className="mb-4">Enrolled Courses</h4>
                <div className="row">
                    {/* First Card */}  
                    <div className="col-md-6 mb-4">
                        <div className="card h-100">
                            <img src="img/blog/1-w.jpg"
                                className="card-img-top"
                                alt="Card Image"
                                style={{ width: "100%", height: "250px", objectFit: "cover" }} />
                            <div className="card-body">
                                <h5 className="card-title">Enroll Here</h5>
                                <p className="card-text">
                                    You are currently enrolled in this course. Here you'll find lectures,
                                    resources, and assignments to help you succeed.
                                </p>
                                <Link to="mycourses" className="btn btn-primary">
                                    Go to Course
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Second Card (Similar Structure) */}
                    <div className="col-md-6 mb-4">
                        <div className="card h-100">
                            <img
                                src="/img/syabullas.png"
                                className="card-img-top"
                                alt="Card Image"
                                style={{ width: "100%", height: "250px", objectFit: "cover" }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">Syllabus Here</h5>
                                <p className="card-text">
                                    The syllabus includes details of lectures, learning resources, and assignments designed to guide you throughout the term.
                                </p>
                                <Link to="syllabus" className="btn btn-primary">
                                    Go to Syllabus
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <Container className="mt-5">
                <h4 className="mb-4">Subscription</h4>
                <div className="position-relative">
                    {/* Left Arrow */}
                    <button className="btn btn-light onClickScrollbutton position-absolute d-flex align-items-center justify-content-center"
                        onClick={scrollLeft}>
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                        </svg>
                    </button>

                    {/* Right Arrow */}
                    <button
                        className="btn btn-light onClickrightBtn position-absolute d-flex align-items-center justify-content-center"
                        onClick={scrollRight}>
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </button>

                    {/* Scrollable Cards Container */}
                    <div
                        ref={scrollContainerRef}
                        className="d-flex flex-nowrap gap-3 pb-3 ScrollableCards">
                        {paidCourses.map((course) => (
                            <div
                                key={course._id}
                                className="card shadow-lg flex-shrink-0 scrollableContainer1"
                                style={{
                                    width: '320px',
                                    minWidth: '320px',
                                    borderRadius: '20px',
                                    border: 'none',
                                    margin: 0,
                                }}
                            >
                                {/* Header */}
                                <div
                                    className="card-header text-center bg-white border-0"
                                    style={{
                                        borderRadius: '20px 20px 0 0',
                                        paddingTop: '20px',
                                        margin: 0,
                                        paddingBottom: 0
                                    }}
                                >
                                    <h4 className="fw-bold mb-0" style={{ fontSize: '15px' }}>{course.title}</h4>
                                    <p className="text-muted" style={{ fontSize: '14px', marginBottom: 0 }}>
                                        (Development)
                                    </p>
                                </div>

                                {/* Hero Image Section */}
                                <div className="px-3" style={{ paddingBottom: 0 }}>
                                    <div
                                        className="position-relative rounded-4 overflow-hidden"
                                        style={{
                                            background: 'linear-gradient(135deg, #6a1b9a 0%, #8e24aa 50%, #3f51b5 100%)',
                                            height: '150px',
                                            margin: 0
                                        }}
                                    >
                                        <img
                                            src={course.img}
                                            alt="Tech Stack"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                        />
                                    </div>
                                </div>

                                {/* Course Details */}
                                <div className="card-body px-4" style={{ paddingBottom: '16px' }}>
                                    {/* Duration and Price per day */}
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <div>
                                            <span className="text-muted" style={{ fontSize: '14px' }}>Duration: </span>
                                            <span className="fw-semibold">{course.duration}</span>
                                        </div>
                                         <div className="text-end">
                                            <span className="text-success fw-bold" style={{ fontSize: '18px' }}>{course.perday}</span>
                                        </div>
                                    </div>

                                    {/* Pricing */}
                                    <div className="text-center mb-2">
                                        <div className="d-flex align-items-center justify-content-center gap-2" style={{ marginBottom: '4px' }}>
                                            <span className="fw-bold" style={{ fontSize: '24px' }}>{course.finalPrice}</span>
                                            <span className="text-muted text-decoration-line-through" style={{ fontSize: '14px' }}>{course.mainPrice}</span>
                                            <span className="badge bg-warning text-dark fw-bold">{course.offer}</span>
                                        </div>
                                        <p className="text-muted mb-0" style={{ fontSize: '12px' }}>
                                            {course.gst}
                                        </p>
                                    </div>

                                    {/* Skills Badge */}
                                    <div className="mb-2">
                                        <span className="badge text-primary border border-primary bg-light px-3 py-2 rounded-pill">
                                         
                                            Skills & Projects
                                        </span>
                                    </div>

                                    {/* View Course Button */}
                                    <button
                                        className="btn btn-primary w-100 fw-semibold rounded-3"
                                        style={{ fontSize: '14px', paddingTop: '6px', paddingBottom: '6px' }}
                                    >
                                        View Course →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>


        </>
    )
}

export default StudentCoursesDetails