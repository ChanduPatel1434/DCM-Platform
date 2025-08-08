import { Link, Outlet } from "react-router-dom"

const Courses = () => {
  return <>

    <div className="content-page">
      <div className="content">  
          <ul className="nav nav-underline ">
        <li className="nav-item">
          <Link className="nav-link fs-4 " aria-current="page">Availabe Courses</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link fs-4 " to='addcourse' >Add Course</Link>
        </li>
      
        <hr />
       
      </ul>
      <Outlet></Outlet>

      </div>
    </div>

  </>
}
export default Courses