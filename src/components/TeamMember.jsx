
const TeamMember = ({ name, role, image, quote,link }) => {
  return (
    <div className="col-md-4 m-auto">
      <div className="staff-member my-lg-3 my-md-3 my-sm-0">
        <div className="card gray-light-bg text-center border-0">
          <img src={image} alt={`${name} profile`} className="card-img-top" />
          <div className="card-body">
            <h5 className="teacher mb-0">{name}</h5>
            <span>{role}</span>
            <ul className="list-inline pt-2 social">
              
              <li className="list-inline-item"><a href={link}><span className="ti-linkedin"></span></a></li>
            </ul>
          </div>
        </div>
        <div className="overlay d-flex align-items-center justify-content-center">
          <div className="overlay-inner text-center">
            <p className="teacher-quote">"{quote}"</p>
            <a href="#" className="teacher-name">
              <h5 className="mb-0 teacher text-white">{name}</h5>
            </a>
            <span className="teacher-field text-white">{role}</span>
            <ul className="list-inline py-4 social">
              
              <li className="list-inline-item"><a href={link} target="_blank"><span className="ti-linkedin"></span></a></li>
           
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;