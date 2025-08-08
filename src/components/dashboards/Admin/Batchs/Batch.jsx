import { Link, Outlet } from "react-router-dom"

const Batch = () => {
  return <>

    <div className="content-page">
      <div className="content">  
          <ul className="nav nav-underline ">
        <li className="nav-item">
          <Link className="nav-link fs-4 " aria-current="page">Create New Batch</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link fs-4 " to='allbatchs' >All Batchs</Link>
        </li>
      
        <hr />
       
      </ul>
      <Outlet></Outlet>

      </div>
    </div>

  </>
}
export default Batch