import { FaCheckCircle, FaBolt, FaSyncAlt, FaMapMarkedAlt } from "react-icons/fa";

const ManpowerSection = ({ backgroundImage }) => {
  const allBenefits = [
    { text: "Elite, Verified Workforce", icon: <FaCheckCircle /> },
    { text: "Rapid Deployment", icon: <FaBolt /> },
    { text: "Flexible Staffing Models", icon: <FaSyncAlt /> },
    { text: "Seamless PAN-India Reach", icon: <FaMapMarkedAlt /> },
  ];

  const isDark = !!backgroundImage;

  const sectionStyle = backgroundImage
    ? {
        background: `url(${backgroundImage}) no-repeat top center / cover fixed`,
      }
    : { backgroundColor: "#ffffff" };

  return (
    <section
      className={`call-to-action ptb-100 ${isDark ? "gradient-overlay" : ""}`}
      style={sectionStyle}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-8">
            <div
              className={`call-to-action-content text-center ${
                isDark ? "text-white" : "text-dark"
              }`}
            >
              <h2 className={`mb-1 ${isDark ? "text-white" : "text-dark"}`}>
                Empowering Businesses with People Who Make an Impact
              </h2>
              <p className="lead">
                Professionals who are skilled, vetted, and deployment-ready —
                delivered exactly when and where your business needs them. Not
                just manpower, but momentum.
              </p>

              <div className="d-flex justify-content-center align-items-center ">
                <ul className="list-unstyled">
                  {allBenefits.map((item, index) => (
                    <li
                      key={index}
                      className={`${isDark ? "text-white" : "text-dark"}`}
                    >
                      <div className="d-flex align-items-center m-1">
                        <span className="mx-3">{item.icon}</span>
                        <p>{item.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="contact-us"
                className={`btn mt-3 ${
                  backgroundImage ? "outline-white-btn" : "outline-btn"
                }`}
              >
                Get Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManpowerSection;