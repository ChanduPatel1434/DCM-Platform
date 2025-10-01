
import './productsecion.css';

const ProductsShowcase = () => {
  const products = [
    {
      id: 1,
      title: "HRMS",
      subtitle: "Human Resource Management System",
      description: "A complete HR digital solution for modern businesses.",
      features: [
        "End-to-end HR lifecycle management",
        "Payroll, attendance & performance tracking"
      ],
      icon: "📊",
      accentColor: "#4a6fff"
    },
    {
      id: 2,
      title: "Hostel & PG System",
      subtitle: "Maintenance & Booking Platform",
      description: "A modern booking + management system designed for hostels, PGs, and co-living spaces.",
      features: [
        "Room allocation & booking management",
        "Payments & maintenance tracking"
      ],
      icon: "🏨",
      accentColor: "#ff6b6b"
    },
    {
      id: 3,
      title: "AI-Powered HR + CRM",
      subtitle: "Next-gen Business Solutions",
      description: "AI-driven HR tools and productivity boosters for scaling businesses.",
      features: [
        "Automated resume screening & analytics",
        "CRM & productivity tools (Upcoming)"
      ],
      icon: "🤖",
      accentColor: "#2ed573"
    }
  ];

  return (
    <section className="products-showcase">
      <div className="container">
        <div className="section-header">
          <h2>Our Products</h2>
          <p className="lead">
            We build and deliver innovative digital products for businesses, colleges, and individuals.
          </p>
        </div>
        
        <div className="products-grid">
          {products.map(product => (
            <div 
              key={product.id} 
              className="product-card"
              style={{ '--accent-color': product.accentColor }}
            >
              <div className="card-icon m-0 p-0">{product.icon}</div>
              <h3 className='p-0 m-0'>{product.title}</h3>
              <p className="product-subtitle">{product.subtitle}</p>
              
              <ul className="features-list m-0">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              
              <p className="product-description">{product.description}</p>
              
              <button className="cta-button">Learn More</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsShowcase;