import { useParams } from "react-router-dom";
import data from "../data/data.json";
import { Link } from "react-router-dom";
import Footer from "./Footer"
import { useState } from "react";

const CourseDetail = () => {

    const [activeIndex, setActiveIndex] = useState(null);




    const toggleAccordion = (idx) => {
        setActiveIndex(activeIndex === idx ? null : idx);
    };








    const { category, subcategory } = useParams();
    console.log(category)
    console.log(subcategory)
    const normalizedCategory = category?.toLowerCase().replace(/-/g, '');
    console.log(normalizedCategory)

    const categoryMap = {
        webdevelopment: data.webDevelopment,
        datascience: data.dataScience,
        uiuxdevelopment: data.uiuxDevelopment,
        testing: data.testing,
        cybersecurity:data.cyberSecurity,
        communication:data.Communication,
        appdevelopment:data.appDevelopment
    };
    const selectedCourses = categoryMap[normalizedCategory];
    console.log(selectedCourses)

    const formatCategory = (str) =>
        str
            ?.replace(/-/g, ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase());
    const selectedCourse = subcategory
        ? selectedCourses?.find(course => {
            const slug = course.path.split('/').pop().toLowerCase();
            console.log(slug)
            return slug === subcategory;
        })
        : null;
    console.log(selectedCourse)





    // If only category is present
    return (
        <>
            <div className="main">

                <section
                    className="hero-section ptb-100 gradient-overlay"
                    style={{
                        background: "url('/img/header-bg-5.jpg') no-repeat center center / cover",
                    }}
                >
                    <div
                        className="hero-bottom-shape-two"
                        style={{
                            background: "url('/img/hero-bottom-shape.svg') no-repeat bottom center",
                        }}
                    ></div>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8 col-lg-7">
                                <div className="page-header-content text-white text-center pt-sm-5 pt-md-5 pt-lg-0">
                                    {subcategory ? (<h1 className="text-white mb-0">{formatCategory(selectedCourse.title)} </h1>) : (<h1 className="text-white mb-0">{formatCategory(category)} </h1>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {!selectedCourse && (



                    <section className="services-section ptb-100 gray-light-bg">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-md-8">
                                    <div className="section-heading text-center mb-5">
                                        <h2>We Provide Best Trainings</h2>
                                        <p className="lead">
                                            Efficiently aggregate end-to-end core competencies without maintainable ideas. Dynamically
                                            foster tactical solutions without enabled value.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                {selectedCourses?.map((course, index) => (
                                    <div className="col-lg-4 col-md-6 col-sm-6 d-flex" key={index}>
                                        <div className="services-single animated-hover text-center p-5 my-md-3 my-lg-3 my-sm-0 shadow-sm white-bg rounded w-100">
                                            <img src={course.img} alt={course.title} width="80" className="mb-3" />
                                            <h5>{course.title}</h5>
                                            <p className="mb-2">{course.description}</p>
                                            <Link to={course.path} className="detail-link mt-4">
                                                Get More Info <span className="ti-arrow-right"></span>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                )}

                {selectedCourse && (
                    // Show syllabus or detailed view
                    <>
                        <div className="container py-5">
                            <h6 className="text-center mb-4">{selectedCourse.description}</h6>
                            <h4 className="text-center mb-5">Syllabus Roadmap</h4>

                            <div className="accordion" id="roadmapAccordion">
                                {selectedCourse?.syllabus?.map((topic, idx) => (
                                    <div className="card mb-3" key={idx}>
                                        <div
                                            className="card-header d-flex justify-content-between align-items-center"
                                            style={{ cursor: 'pointer', backgroundColor: '#f8f9fa' }}
                                            onClick={() => toggleAccordion(idx)}
                                        >
                                            <div
                                                style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    borderRadius: '50%',
                                                    backgroundColor: '#6c63ff',
                                                    color: '#fff',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    fontWeight: 'bold',
                                                    marginRight: '10px'
                                                }}
                                            >
                                                {idx + 1}
                                            </div>
                                            <h5 className="mb-0 flex-grow-1">{topic}</h5>
                                            <span>{activeIndex === idx ? '−' : '+'}</span>
                                        </div>

                                        {activeIndex === idx && (
                                            <div
                                                className="card-body"
                                                style={{ backgroundColor: '#fff', borderTop: '1px solid #ddd' }}
                                            >
                                                <p className="mb-0 text-muted">
                                                    {selectedCourse?.overview[idx] || "Overview coming soon..."}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </>

                )}
            </div>

            <Footer />
        </>
    );
}
export default CourseDetail;