import { useSelector } from "react-redux";
import EnrollForm from "./EnrollForm";
import CourseCard from "../../CoursesPage";



const StudentDashboard = () => {
    const {courseNames}=useSelector(state=>state.auth)
  console.log("iam")
  
    return (
       <>
        <div>
            <h1>Student Dashboard</h1>
            <p>Welcome to the student dashboard. Here you can view your courses, assignments, and grades.</p>

            <EnrollForm/>
            {
                courseNames?.map(course=>(<CourseCard course={course} key={course._id} />))
            }
        </div>
       
       </>
    );
}

export default StudentDashboard;
