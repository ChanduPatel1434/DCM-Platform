import React, { useState, useEffect } from "react";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Naveen",
    role: "Web Developer",
    feedback: "Excellent service! They helped us find the perfect candidates for our technical team."
  },
  {
    name: "Pavani",
    role: "HR Director",
    feedback: "The campus recruitment training program was outstanding. Our placement rates improved significantly."
  },
  {
    name: "Swetha",
    role: "Project Manager",
    feedback: "Their consulting services helped us streamline our operations and increase productivity."
  }
];

const workProcesses = [
  {
    title: "Manpower & Staffing",
    description: "Comprehensive staffing solutions tailored to your needs."
  },
  {
    title: "Campus Recruitment",
    description: "Specialized training programs for campus placements."
  },
  {
    title: "In-House Projects",
    description: "End-to-end consulting for your internal projects."
  },
  {
    title: "Business Development",
    description: "Strategic consulting to accelerate your growth."
  }
];

const counters = [
  { iconClass: "ti-medall-alt", value: 100, label: "Active users" },
  { iconClass: "ti-headphone-alt", value: 3, label: "Global client" },
  { iconClass: "ti-cup", value: 9, label: "Win award" },
  { iconClass: "ti-user", value: 92, label: "Clients satisfaction" },
];

const TestimonialSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    // Set up auto-advance for testimonials
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <>
      <section className="work-process-new pt-5 gray-light-bg mb-5">
        <div className="container">
          {/* Header */}
          <div className="row justify-content-center">
            <div className="col-md-9 col-lg-8">
              <div className="section-heading text-center mb-5">
                <h4>
                  "To be the most reliable and impactful partner in corporate development and human resource solutions."
                </h4>
              </div>
            </div>
          </div>

          {/* Process Items */}
          <div className="row justify-content-center">
            {workProcesses.map((process, index) => (
              <div key={index} className="col-md-6 col-lg-3 mb-4">
                <div className="single-work-process text-start p-3 w-100 rounded">
                  <div className="work-process-content mt-2">
                    <h5>{process.title}</h5>
                    <p>{process.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="customer-testimonial-section ptb-100 gray-light-bg">
        <div className="container">
          {/* Heading */}
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-8 text-center mb-4">
              <h2>What People Say About Us</h2>
              <p className="lead">
                Distinctively grow go forward manufactured products and optimal networks.
                Enthusiastically disseminate outsourcing through revolutionary ideas.
              </p>
            </div>
          </div>

          {/* Main Layout */}
          <div className="row align-items-center justify-content-between">
            {/* Testimonials Carousel */}
            <div className="col-md-5 col-lg-5">
              <div className="testimonial-carousel">
                <div className="testimonial-quote-wrap">
                  <div className="client-say">
                    <p><FaQuoteLeft /> {testimonials[currentTestimonial].feedback}</p>
                  </div>
                  <div className="media author-info my-3">
                    <div className="author-img mr-3">
                      <img src="/img/user-profile-person-svgrepo-com.svg" alt="user" className="img-fluid rounded-circle" />
                    </div>
                    <div className="media-body">
                      <h5 className="mb-0">{testimonials[currentTestimonial].name}</h5>
                      <span>{testimonials[currentTestimonial].role}</span>
                    </div>
                  </div>
                </div>
                
                {/* Carousel Controls */}
                <div className="testimonial-controls mt-4">
                  
                  <div className="carousel-indicators">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        className={`indicator ${index === currentTestimonial ? 'active' : ''}`}
                        onClick={() => goToTestimonial(index)}
                      />
                    ))}
                  </div>
                
                </div>
              </div>
            </div>

            {/* Stats Counters */}
            <div className="col-md-6 col-lg-6">
              <div className="row">
                {counters.map((counter, idx) => (
                  <div key={idx} className="col-md-6 mb-3">
                    <div className="single-counter white-bg shadow-sm p-4 rounded text-center border-0">
                      <span className={`${counter.iconClass} color-secondary icon-md`}></span>
                      <h3 className="mb-0">{counter.value}</h3>
                      <p>{counter.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialSection;