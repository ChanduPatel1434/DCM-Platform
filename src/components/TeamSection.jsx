import React from "react";
import TeamMember from "./TeamMember";

const teamData = [
  {
    name: "Medipudi Durgaprasad",
    role: "Co-Founder",
    image: "img/cofounder.jpg",
    link:'https://in.linkedin.com/in/medipudi-durgaprasad-398552274',
    quote: "Empowering teams to deliver end-to-end solutions through visionary leadership and operational excellence."
  },

];

const TeamSection = () => {
  return (
    <section className="team-two-section mt-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-8">
            <div className="section-heading text-center mb-1">
              <h2>Meet Our Lovely Co-Founder</h2>
              <p className="lead m-0">
                Distinctively grow go forward manufactured products and optimal networks.
                Enthusiastically disseminate user-centric outsourcing through.
              </p>
            </div>
          </div>
        </div>
        <div className="row justfiy-content-center">
          {teamData.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection; 