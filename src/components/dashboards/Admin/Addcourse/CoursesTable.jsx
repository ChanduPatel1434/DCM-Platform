import React, { useState } from "react";
import DynamicCourses from "./DynamicCourses";

import { motion } from 'framer-motion';
import CourseModal from "./AddCourse";
import { useCourseHandlers } from "./courseshooks";
import { useSelector } from "react-redux";
import CourseCard from "./CourseCard";


const CourseTable = () => {
   const{handleAddCourseSubmit,addStatus,
    handleUpdateCourseSubmit,
    handleDeleteCourse,
    updateStatus,
    deleteStatus,
   }= useCourseHandlers()
   const [selectedCourse,setSelectedCourse]=useState(null)
   const onEditCourse=(course)=>{
       setSelectedCourse(course)
       setShowModal(true)
       setMode('edit')
    }
    
    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState('add'); // 'add' or 'edit'
    const onsubmitFn=mode==='add'?handleAddCourseSubmit:handleUpdateCourseSubmit
    const initialValues =mode=== 'add'?{
      name: '',
      description: '',
      instructor: '',
      duration: '',
      price: '',
    }:{
    _id:selectedCourse._id,
      name: selectedCourse.name,
      description: selectedCourse.description,
      instructor: selectedCourse.instructor,
      duration: selectedCourse.duration,
      price: selectedCourse.price,
    };


    const handleOpen = () => {
        setShowModal(true);
        setMode('add');
    };
    const{courseNames}=useSelector(state=>state.auth)
    const handleClose = () => setShowModal(false);

    return (
        <>
            <div className="container my-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="text-primary">📚 Courses Table</h2>
                    <motion.button
                        className="btn btn-dark"
                        onClick={handleOpen}
                        initial={{ scale: 1 }}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{
                            repeat: Infinity,
                            repeatType: 'loop',
                            duration: 1,
                            ease: 'easeInOut',
                        }}
                        whileHover={{ scale: 1.1, rotate:-1 }}
                    >
                         Add New Course
                    </motion.button>

                </div>
                {
                    courseNames.map(course=>(<CourseCard course={course} key={course._id} onEdit={onEditCourse} onDelete={handleDeleteCourse} />))
                }
                {/* Your table or course list */}
                {/* <DynamicCourses /> */}

                {/* Modal */}

                {showModal && (
                    <CourseModal handleClose={handleClose} mode={mode} onSubmitFn={onsubmitFn} initialValues={initialValues} />

                )}

            </div>
        </>
    );
};

export default CourseTable;