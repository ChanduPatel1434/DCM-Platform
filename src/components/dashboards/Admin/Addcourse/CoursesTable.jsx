
import { motion } from 'framer-motion';

import { useCourseHandlers } from "./courseshooks";

import CourseCard from "./CourseCard";
import { useCourses } from "../../../../hooks/useCourses";
import { MODAL_TYPES, useModal } from '../Modals/ModalContext';


const CourseTable = () => {
    const { courses } = useCourses()

    const { openModal } = useModal();
    const {
        handleAddCourseSubmit,
        handleUpdateCourseSubmit,
        handleDeleteCourse,
    } = useCourseHandlers();


    const handleEditCourse = (course) => {
        openModal(MODAL_TYPES.EDIT_COURSE, {
            mode: 'edit',
            course:course
            
        });
    };


    return (
        <>
            <div className="container my-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="text-primary">📚 Courses Table</h2>
                    <motion.button
                        className="btn btn-dark"
                        onClick={() => openModal(MODAL_TYPES.ADD_COURSE, {
                            mode: 'add',
                        })}
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: 1,
                        ease: 'easeInOut',
                    }}
                    whileHover={{ scale: 1.1, rotate: -1 }}
                    >
                    Add New Course
                </motion.button>

            </div>
            {
                courses?.map(course => (<CourseCard
                    key={course._id}
                    course={course}
                    onEdit={handleEditCourse}
                    onDelete={handleDeleteCourse}
                />
                ))
            }



        </div >
        </>
    );
};

export default CourseTable;