import { FaCheck } from "react-icons/fa";

const ManpowerSection = ({ backgroundImage }) => {
  const allBenefits = [
    "Verified & Trained Workforce",
    "Quick Deployment",
    "Flexible Staffing Solutions",
    "PAN-India Support",
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
              className={`call-to-action-content text-center ${isDark ? "text-white" : "text-dark"
                }`}
            >
              <h2 className={`mb-1 ${isDark ? "text-white" : "text-dark"}`}>
                Your Trusted Partner for Manpower Support That Delivers
              </h2>
              <p className="lead">
                Skilled, screened, and ready-to-deploy professionals across
                industries — when and where you need them.
              </p>
              <div className="d-flex justify-content-center align-items-center ">
                <ul className="list-unstyled  ">
                    {allBenefits.map((item, index) => (
                  <li
                    key={index}
                    className={`   ${isDark ? "text-white" : "text-dark"
                      }`}
                  >
                    
                      
                      <div className="d-flex  align-items-center m-1 ">
                          <span className="mx-3">
                          <FaCheck className="me-4" />
                        </span>
                        <p >
                          {item}
                        </p>
                      </div>
                      

                    

                  </li>
                ))}
                
                </ul>
              </div>

              

              <a
                href="contact-us"
                className="btn outline-white-btn mt-3"
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