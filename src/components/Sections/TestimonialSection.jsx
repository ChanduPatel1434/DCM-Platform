// replace with actual path
import { FaQuoteLeft } from "react-icons/fa";

import data from "../../data/data.json"; // Assuming you have a testimonials data file
import { useEffect, useRef } from "react";





// const testimonials 
const testimonials = data.testimonials
const workProcesses = data.workProcess


const counters = [
  { iconClass: "ti-medall-alt", value: 89, label: "Active users" },
  { iconClass: "ti-headphone-alt", value: 3, label: "Global client" },
  { iconClass: "ti-cup", value: 12, label: "Win award" },
  { iconClass: "ti-user", value: 101, label: "Clients satisfaction" },
];







const TestimonialSection = () => {


const carouselRef = useRef(null);

useEffect(() => {
  if (window.$ && carouselRef.current) {
    window.$(carouselRef.current).owlCarousel({
      items: 1,
      loop: true,
      autoplay: true,
      dots: true,
    });
  }
}, []);

  return <>
    <section className="work-process-new ptb-100 gray-light-bg mb-5">
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
            <div key={index} className="mb-4 d-flex" style={{ width: "280px" }}>
              <div className="single-work-process text-start p-3 w-100  rounded">
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
            {/* <TestimonialCarousel /> */}
            <div class="owl-carousel owl-theme client-testimonial-1 custom-dot">
              {testimonials.map((t, idx) => (
                <div key={idx} className="testimonial-quote-wrap">
                  <div className="client-say">
                    <p><FaQuoteLeft /> {t.feedback}</p>
                  </div>
                  <div className="media author-info my-3">
                    <div className="author-img mr-3">

                      <img src="/img/user-profile-person-svgrepo-com.svg" alt="user" className="img-fluid rounded-circle" />

                    </div>
                    <div className="media-body">
                      <h5 className="mb-0">{t.name}</h5>
                      <span>{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
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
}
export default TestimonialSection;