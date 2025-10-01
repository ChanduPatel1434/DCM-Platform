
const Footer = () => {
  const socialLinks = [
    { name: "Facebook", icon: "facebook", url: "https://facebook.com/aslok" },
    { name: "Instagram", icon: "instagram", url: "https://www.instagram.com/design_career_metrics?igsh=angzdzR4Zmcwa25q" },
    { name: "Linkedin", icon: "linkedin", url: "https://www.linkedin.com/company/design-career-metrics-pvt-ltd" },
    { name: "Google", icon: "google", url: "https://share.google/8e69r070lynTkqioy" }
  ];
  return (
    <>
      {/* Footer Section */}
      <footer className="footer-section">
        {/* Footer Top */}
        <div className="footer-top bg-footer">
          <div className="container">
            <div className="row">
              <div className="col-md-9">
                <div className="row footer-top-wrap">
                  {["QUICK LINKS", "COMPANY", "LEGAL", "SUPPORT"].map((category, idx) => (
                    <div className="col-md-3 col-sm-6" key={idx}>
                      <div className="footer-nav-wrap text-white">
                        <h4 className="text-white">{category}</h4>
                        <ul className="nav flex-column">
                          {getLinksByCategory(category).map((link, i) => (
                            <li className="nav-item" key={i}>
                              <a className="nav-link" href={link.href}>{link.label}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-md-3">
                <div className="footer-nav-wrap text-white">
                  <h4 className="text-white">GET IN TOUCH</h4>
                  <ul className="get-in-touch-list">
                    <li className="d-flex align-items-start  py-2">
                      <span className="fas fa-map-marker-alt mr-2 mt-2"></span>Office #407 &409 4th Floor, Jain Sadguru Image's Capital Park, Madhapur,Hyderabad
                    </li>
                    <li className="d-flex align-items-center py-2">
                      <span className="fas fa-envelope mr-2"></span> hr@designcareermetrics.com
                    </li>
                    <li className="d-flex align-items-center py-2">
                      <span className="fas fa-phone-alt mr-2"></span> +91  7337572543
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom gray-light-bg py-2">
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div className="col-md-5 col-lg-5">
                <p className="copyright-text pb-0 mb-0">
                  Copyrights © 2025. All rights reserved by{" "}
                  <a href="https://designcareermetrics.com" target="_blank" rel="noreferrer">
                    DCM
                  </a>
                </p>
              </div>
              <div className="col-md-7 col-lg-6 d-none d-md-block d-lg-block">
                <ul className="list-unstyled social-list text-right mb-0">
                  {socialLinks.map(({ name, icon, url }, i) => (
                    <li className="list-inline-item tooltip-hover" key={i}>
                      <a href={url} target="_blank" rel="noopener noreferrer" className="rounded">
                        <span className={`ti-${icon}`}></span>
                      </a>
                      <div className="tooltip-item">{name}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll-to-top Button */}
      {/* <button className="scroll-top scroll-to-target" data-target="html">
        <span className="ti-angle-up"></span>
      </button> */}
    </>
  );
};

// 🔗 Link Categories
function getLinksByCategory(category) {
  const links = {
    "QUICK LINKS": [
      { label: "Make Appointment", href: "/contact-us" },
      { label: "Department Services", href: "#" },
      { label: "Our Case Studies", href: "#" },
      { label: "Our Business Growth", href: "#" },
    ],
    COMPANY: [
      { label: "About Our Services", href: "#" },
      { label: "Our Affiliates Program", href: "#" },
      { label: "View Our Blog", href: "#" },
      { label: "Check Our Careers", href: "#" },
    ],
    LEGAL: [
      { label: "Legal Information", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Report Abuse", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
    SUPPORT: [
      { label: "Contact", href: "/contact-us" },
      { label: "Knowledge Base", href: "#" },
      { label: "Forums", href: "#" },
      { label: "System Status", href: "#" },
    ],
  };
  return links[category] || [];
}

export default Footer;