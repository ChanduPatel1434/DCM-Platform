
import { FaBrain, FaBezierCurve, FaLifeRing } from "react-icons/fa";
import TestimonialSection from "./Sections/TestimonialSection";
import Footer from "./Footer";

const promos = [
  {
    icon: <FaBrain className="icon-lg color-primary  " />,
    title: "Consultancy",
    description: "Enthusiastically scale mission-critical imperatives rather than an expanded array.",
  },
  {
    icon: <FaBezierCurve className="icon-lg color-primary" />,
    title: "Manpower Support",
    description: "Compellingly promote collaborative products without synergistic schemas.",
  },
  {
    icon: <FaLifeRing className="icon-lg color-primary" />,
    title: "Corporate Trainings",
    description: "Rapidiously create cooperative resources rather than client-based leadership skills.",
  },
];

const Aboutus = () => {
  return (
    <>
      {/* Hero Section */}
      <section
        className="hero-section ptb-100 gradient-overlay"
        style={{ background: "url('img/header-bg-5.jpg') center center / cover no-repeat" }}
      >
        <div
          className="hero-bottom-shape-two"
          style={{ background: `url('img/hero-bottom-shape.svg') bottom center no-repeat` }}
        ></div>
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-7 text-center pt-sm-5 pt-md-5 pt-lg-0">
              <h1 className="text-white mb-0">About Us</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Section */}
      <section className="promo-section pt-100">
        <div className="container">
          <div className="row">
            {promos.map((promo, index) => (
              <div key={index} className="col-md-4 col-lg-4 mb-4">
                <div className="single-promo-block p-3 rounded d-flex justify-content-between">
                  <div className="promo-block-icon mr-4">{promo.icon}</div>
                  <div className="promo-block-content">
                    <h5>{promo.title}</h5>
                    <p>{promo.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us-section ptb-100">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-md-12 col-lg-5 mb-4 mb-lg-0">
              <div className="video-promo-content">
                <h2>Empowering People. Elevating Organizations.</h2>
                <p>
                  We believe that success begins with the right people, empowered by the right knowledge.
                  We specialize in providing industry-relevant corporate training, expert consulting services, and reliable manpower support to help businesses unlock their full potential.
                  Our mission is to bridge the gap between talent and opportunity with impactful, future-ready solutions.
                </p>
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="card border-0 shadow-sm">
                <img src='img/about-2.jpg' alt="About Us" className="img-fluid rounded shadow-sm" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <TestimonialSection/>
      <Footer />

    </>
  );
};

export default Aboutus;