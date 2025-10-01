import { useSelector } from "react-redux";
import UnenrolledCoursesGrid from "./Unenrolledcoursesview";
import { motion } from 'framer-motion';


import { useAddItemMutation } from '../../../Services/student/cartServices';
import { useCourses } from "../../../hooks/useCourses";
import { useGetStudentbyIdQuery, useGetStudentEnrolledCoursesQuery } from "../../../Services/student/enrollFormServices";

const CourseList = () => {
   
  
 
  const{user}=useSelector(state=>state.auth)
  console.log(user)
const { data: enrolledData } = useGetStudentbyIdQuery(user.id); 

  const{data:enrollments}=  useGetStudentEnrolledCoursesQuery(user.id)
  const enrollmentIds=enrolledData?.enrollment?.enrolledCourses.map(enroll=>enroll.course._id)

  return (
    <div className=" ">
       <section className="pt-5 ">
              <div className="max-w-7xl mx-auto text-center text-dark">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    Explore Our <span className="gradient-text">Courses</span>
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Discover expert-led courses with live Zoom sessions and comprehensive learning materials
                  </p>
                </motion.div>
              </div>
       </section>

       

<UnenrolledCoursesGrid enrolledCourseIds={enrollmentIds}/>
      
    </div>
  );
};

export default CourseList;
