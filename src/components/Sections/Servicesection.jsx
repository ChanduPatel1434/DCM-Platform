import React from 'react';
import './Services.css';
import { Link } from 'react-router-dom';

const ServicesSection = () => {
    const services = [
        {
            id: 1,
            title: "Manpower & Staffing Solutions",
            description: "We provide comprehensive staffing solutions tailored to your organizational needs, ensuring you get the right talent at the right time.",
            icon: "👥",
            gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            path:'/services/manpower-and-staffing-solutions'
        },
        {
            id: 2,
            title: "Campus Recruitment Training (CRT)",
            description: "Prepare students for campus recruitment with our specialized training programs focusing on technical skills, aptitude, and soft skills.",
            icon: "🎓",
            gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            path:'/services/campus-recruitment-training'
        },

        {
            id: 3,
            title: "Business Development & Consulting (BDE Services)",
            description: "Accelerate your business growth with our strategic business development services and expert consulting approaches.",
            icon: "📈",
            gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            path:"/services/business-development-and-consulting"
        }
    ];

    return (
       <>
        <section className="services-section p-0 m-0" id="services">
            <div className="container">
                <div className="section-header">
                    <h2>Our Services</h2>
                    <p>Comprehensive solutions to meet your business and talent needs</p>
                </div>

                <div className="services-grid">
                    {services.map(service => (
                        <div
                            className="service-card"
                            key={service.id}
                            style={{ background: service.gradient }}
                        >
                            <div className="card-icon">{service.icon}</div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <div className="card-hover-content">
                                <Link to={service.path}>
                                <button className="service-btn">Learn More</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          
        </section>
         <div className='text-center py-5 services-section-btn' >
            <Link to={`/services`}>
            <button className='accent-outline-btn btn rounded-5'>View All Our Services</button>
            </Link>
           </div>
        </>
    );
};

export default ServicesSection;