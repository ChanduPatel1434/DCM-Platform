
const HeroSection = () => {
  return (
    <section className="hero-equal-height pt-165 pb-100 overflow-hidden">
      <div className="hero-shape"></div>
      <div className="container">
        <div className="row align-items-center">
          {/* Text Content */}
          <div className="col-md-12 col-lg-6">
            <div className="hero-slider-content my-5">
              <span className="text-uppercase ms-1 ">People First. Solutions Always</span>
              <h1>Expert Training. Reliable Manpower. Proven Consulting</h1>
              <p className="lead">
                Holistically procrastinate mission-critical convergence with reliable customer service. Assertively
                underwhelm idea-sharing for impactful solutions.
              </p>
              <div className="action-btns mt-3">
                <a href="contact-us" className="btn accent-solid-btn">Get Start Now</a>
              </div>
            </div>
          </div>

          {/* Image Animation */}
          <div className="col-md-12 col-lg-6">
            <div className="hero-animation-img">
              <img
                src={`${process.env.PUBLIC_URL}/img/hero-animation-01.svg`}
                alt="hero"
                className="img-fluid d-none d-lg-block animation-two"
                width="150"
              />
              <img
                src={`${process.env.PUBLIC_URL}/img/hero-single-img-1.svg`}
                alt="hero"
                className="animation-one"
              />
              <img
                src={`${process.env.PUBLIC_URL}/img/hero-animation-03.svg`}
                alt="hero"
                className="img-fluid d-none d-lg-block animation-four"
                width="250"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;