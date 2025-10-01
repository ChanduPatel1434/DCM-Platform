import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);


  return (
    <>
      <header className="header">
        <nav className="navbar navbar-expand-lg border fixed-top custom-nav bg-white text-dark" style={{ height: "80px" }}>
          <div className="container">
            <Link className="navbar-brand" to="/">

              <img
                src="/img/dcmlogotransperent.png"
                alt="logo"
                className="logo-img"
              />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              onClick={() => setIsNavOpen(!isNavOpen)}
              aria-expanded={isNavOpen}
              aria-label="Toggle navigation"
            >
              <span className="ti-menu"></span>
            </button>

            <div className={`navbar-collapse collapse ${isNavOpen ? "show  bg-white" : ""}`}>
              <ul className="navbar-nav ml-auto menu ">
                <li ><Link to="/" onClick={() => setIsNavOpen(false)} className="text-dark " >Home</Link></li>
                <li>
                  <Link to="/services" className="text-dark" onClick={() => setIsNavOpen(false)}>Services</Link>
                 
                </li>
                <li><Link to="/trainings" className="text-dark" onClick={() => setIsNavOpen(false)}>Trainings</Link></li>
                <li><Link to="/about-us" className="text-dark" onClick={() => setIsNavOpen(false)}>About Us</Link></li>
                <li><Link to="/contact-us" className="text-dark" onClick={() => setIsNavOpen(false)}>Contact Us</Link></li>


              </ul>
           

                <Link to="/login" className="text-dark  " onClick={() => setIsNavOpen(false)}><button className="btn outline-btn mx-2">Log in</button></Link>
       

     
                  <Link to="/sign-up" className="text-dark " onClick={() => setIsNavOpen(false)}>
                  <button className="btn outline-btn mx-2">Sign Up</button>
                </Link>
            
          
                <Link to="/get-app" className="text-dark" onClick={() => setIsNavOpen(false)}>
                  <button className="btn accent-outline-btn mx-2">Download App</button>
                </Link>
            
            </div>
          </div>
        </nav>
      </header>
    </>
  )
};
export default Navbar;