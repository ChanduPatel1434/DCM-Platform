import { Link } from "react-router-dom";


const ErrorPage = () => {
  return (
    <div className="main">
      {/* Hero Section */}
      <section
        className="hero-section ptb-100 gradient-overlay full-screen"
        style={{
          background: "url('img/slider-img-2.jpg') no-repeat center center / cover",
        }}
      >
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-9 col-lg-7">
              <div className="error-content text-center text-white">
                <div className="notfound-404">
                  <h1 className="text-white">Coming soon</h1>
                </div>
                {/* <h2 className="text-white">Sorry, something went wrong</h2>
                <p className="lead">
                  The page you are looking for might have been removed, had its
                  name changed, or is temporarily unavailable.
                </p> */}
                <Link className="btn outline-white-btn mt-5" to='/'>
                  Go to Homepage
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll To Top Button */}
      <button
        className="scroll-top scroll-to-target"
        data-target="html"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <span className="ti-angle-up"></span>
      </button>
    </div>
  );
};

export default ErrorPage;