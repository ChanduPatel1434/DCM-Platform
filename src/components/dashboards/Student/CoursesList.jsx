import { useSelector } from "react-redux";
import UnenrolledCoursesGrid from "./Unenrolledcoursesview";
import { motion } from 'framer-motion';


import { useAddItemMutation } from '../../../Services/student/cartServices';
import { useCourses } from "../../../hooks/useCourses";

export function CourseCard({ course, userId }) {
 

  const [addItem] = useAddItemMutation();

  const handleAdd = () => {
    
      addItem({ userId, course });
    
  };

  return (
    <div className="bg-white shadow p-4 rounded-lg">
      <img src={course.thumbnail} alt={course.title} className="rounded" />
      <h3 className="mt-2 font-semibold">{course.title}</h3>
      <p className="text-gray-600">₹{course.price}</p>
      <button
        onClick={handleAdd}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
}
const CourseList = () => {
  
  const{courses}=useCourses()
  const{enrolledcourses,user}=useSelector(state=>state.auth)
  console.log(enrolledcourses)
  return (
    <div className="content-page relx">
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

       

<UnenrolledCoursesGrid/>
      
    </div>
  );
};

export default CourseList;
