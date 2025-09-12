import { useSelector } from "react-redux";
import EnrollForm from "./EnrollForm";
import CourseCard from "../../CoursesPage";

import StudentCoursesDetails from "./StudentCoursesDetails";
import UpcomingClasses from "../Extras/UpcomingClasses";
import MaybeDashboard from "./Maybe";
import DashboardCards from "../Extras/MoreStatCard";



const StudentDashboard = () => {
  const { courseNames } = useSelector(state => state.auth)
  console.log("iam")


  return (
    <>

      <div>
        <div>

          <MaybeDashboard />
        


          {/* <StudentCoursesDetails/> */}

          {

                courseNames?.map(course=>(<CourseCard course={course} key={course._id} />))
            }
            
          {/* <UpcomingClasses /> */}
        </div>
      </div>
    </>
  );
}

export default StudentDashboard;