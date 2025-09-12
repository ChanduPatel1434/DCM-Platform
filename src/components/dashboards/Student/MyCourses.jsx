import { useSelector } from "react-redux";
import CourseCard from "./CourseCard"
import { transformStudentEnrollmentData } from "../../../utils/formatchange";
const Mycourses = () => {
  // const courses = data.courses
  // const courses = [
  //   {
  //     name: 'React Fundamentals',
  //     badge: 'React',
  //     tutor: 'Ananya Sharma',
  //     progress: 78,
  //     nextClass: 'July 10, 9:30 AM',
  //     status: 'Active',
  //     syllabus: ['JSX', 'Components', 'Hooks', 'Routing'],
  //     assignments: 2,
  //     feedback: 'Reviewed',
  //     resources: ['GitHub Repo', 'Live Demo']
  //   },
  //   {
  //     name: 'UI/UX Design',
  //     badge: 'Design',
  //     tutor: 'Rahul Mehra',
  //     progress: 42,
  //     nextClass: 'July 12, 11:00 AM',
  //     status: 'Active',
  //     syllabus: ['Wireframing', 'Prototyping', 'Color Theory'],
  //     assignments: 1,
  //     feedback: 'Pending',
  //     resources: ['Figma Files', 'Lecture PDFs']
  //   },
  //   {
  //     name: 'Advanced JavaScript',
  //     badge: 'JavaScript',
  //     tutor: 'Priya Verma',
  //     progress: 90,
  //     nextClass: 'July 15, 2:00 PM',
  //     status: 'Active',
  //     syllabus: ['ES6+', 'Closures', 'Async/Await'],
  //     assignments: 3,
  //     feedback: 'Reviewed',
  //     resources: ['CodeSandbox Projects', 'Reference Docs']
  //   },
  //   {
  //     name: 'Responsive Web Design',
  //     badge: 'Bootstrap',
  //     tutor: 'Mohit Agarwal',
  //     progress: 65,
  //     nextClass: 'July 17, 4:00 PM',
  //     status: 'Active',
  //     syllabus: ['Grid System', 'Media Queries', 'Flexbox'],
  //     assignments: 2,
  //     feedback: 'Reviewed',
  //     resources: ['CSSPlayground', 'Bootstrap Docs']
  //   },
  //   {
  //     name: 'API Integration',
  //     badge: 'Backend',
  //     tutor: 'Sneha Kapoor',
  //     progress: 55,
  //     nextClass: 'July 18, 10:30 AM',
  //     status: 'Active',
  //     syllabus: ['REST APIs', 'Axios', 'Authentication'],
  //     assignments: 2,
  //     feedback: 'Pending',
  //     resources: ['Postman Collections', 'API Docs']
  //   }
  // ];
  const ll = useSelector(state => state.auth)
  console.log(ll, 'inmycourse')
  // const courses = transformStudentEnrollmentData(enrolledData)

  return <div className="content-page bg-light">
    <div className="container py-4">
      <h4 className="mb-4 text-dark">📚 All Enrolled Courses</h4>
      <div className="row g-4">
        {/* {courses?.map((course, idx) => (
          <div key={idx} className="col-md-6 col-lg-4">

            <CourseCard
              course={course}
              onJoinLive={(id) => console.log("Joining live for", id)}
              onViewTasks={(id) => console.log("Viewing tasks for", id)}
            />
          </div>
        ))} */}
      </div>
    </div>
  </div>



}
export default Mycourses