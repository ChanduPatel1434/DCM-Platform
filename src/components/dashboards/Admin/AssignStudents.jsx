import {Outlet, Link } from "react-router-dom";

const AssignStudents = () => {
    return (
        <div className="content-page bg-light">
            <div className="content">
                <div>
                    
                    <div className="card shadow-sm my-3  p-3">
                        <ul className="nav nav-tabs text-white">
                            <li className="nav-item">
                                <Link className ="nav-link active" aria-current="page">Unasigned Students</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="assigned">Assigned Students</Link>
                            </li>
                           
                        </ul>
                        <Outlet></Outlet>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignStudents;
