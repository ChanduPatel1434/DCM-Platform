

const blocks = [
  {
    iconClass: "fab fa-superpowers",
    title: "Corporate Trainings",
    text: "Dramatically incentivize mission-critical process improvements through extensive benefits. Interactively visualize B2C e-markets with standards compliant e-commerce.",
    btnText: "Learn More",
    bgClass: "promo-hover-bg-1",
  },
  {
    iconClass: "far fa fa-users",
    title: "Manpower Support",
    text: "Conveniently synergize worldwide functionalities via global e-commerce. Distinctively actualize standards compliant experiences before real-time human capital.",
    btnText: "Get Support",
    bgClass: "promo-hover-bg-2",
  },
  {
    iconClass: "far fa-handshake",
    title: "Consultancy",
    text: "Conveniently synergize worldwide functionalities via global e-commerce. Distinctively actualize standards compliant experiences before real-time human capital.",
    btnText: "Learn More",
    bgClass: "promo-hover-bg-2",
  },
];

const PromoSection = () => {
  return (
    <section className="promo-block ptb-100 position-relative">
      <div className="shape-four"></div>
      <div className="container">
        <div className="row no-gutters">
          {blocks.map((block, i) => (
            <div className="col-md-6 col-lg-4 box-2" key={i}>
              <div className={`single-promo-block ${block.bgClass} hover-image p-5 text-center`}>
                <div className="promo-block-icon mb-3">
                  <span className={`${block.iconClass} icon-md color-primary`}></span>
                </div>
                <div className="promo-block-content">
                  <h5>{block.title}</h5>
                  <p>{block.text}</p>
                  <a href="trainings" className="btn accent-solid-btn mt-3">{block.btnText}</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoSection;