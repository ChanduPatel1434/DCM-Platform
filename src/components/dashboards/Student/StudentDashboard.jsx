import EnrollForm from "./EnrollForm";
import { Container, Row, Col, Card } from "react-bootstrap";
import StudentCoursesDetails from "./StudentCoursesDetails";
import UpcomingClasses from "../Extras/UpcomingClasses";


const StudentDashboard = () => {

 
    return (
       <>
        <div>
            <h1>Student Dashboard</h1>
            <p>Welcome to the student dashboard. Here you can view your courses, assignments, and grades.</p>
            <StudentCoursesDetails/>
           {/* <EnrollForm />*/}
           <UpcomingClasses />
        </div>
       
       </>
    );
}

export default StudentDashboard;