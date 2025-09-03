import { useSelector } from "react-redux";
import EnrollForm from "./EnrollForm";
import CourseCard from "../../CoursesPage";
import { Container, Row, Col, Card } from "react-bootstrap";
import StudentCoursesDetails from "./StudentCoursesDetails";
import UpcomingClasses from "../Extras/UpcomingClasses";


const StudentDashboard = () => {
    const {courseNames}=useSelector(state=>state.auth)
  console.log("iam")

 
    return (
       <>
        <div>
            <h1>Student Dashboard</h1>
            <p>Welcome to the student dashboard. Here you can view your courses, assignments, and grades.</p>
            <StudentCoursesDetails/>
           {/* <EnrollForm/>
            {
                courseNames?.map(course=>(<CourseCard course={course} key={course._id} />))
            }*/}
           <UpcomingClasses />
        </div>
       
       </>
    );
}

export default StudentDashboard;