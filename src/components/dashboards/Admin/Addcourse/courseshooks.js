// utils/courseHandlers.js
import { toast } from "react-toastify";
import {
  useAddCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} from "../../../../Services/admin/coursesService";

export const useCourseHandlers = () => {
  const [addCourseTrigger, addStatus] = useAddCourseMutation();
  const [updateCourseTrigger, updateStatus] = useUpdateCourseMutation();
  const [deleteCourseTrigger, deleteStatus] = useDeleteCourseMutation();

  const handleAddCourseSubmit = async (values) => {
    try {
      await addCourseTrigger(values).unwrap();
      toast.success('🎉 Course added successfully!');
      
    } catch (error) {
      const message = error?.data?.message || '❌ Failed to add course.';
      toast.error(message);
    }
  };

  const handleUpdateCourseSubmit = async (values) => {
    try {
      const { _id, ...payload } = values;
      
      await updateCourseTrigger({ _id, ...payload }).unwrap();
      toast.success('✅ Course updated successfully!');
      
    } catch (error) {
      const message = error?.data?.message || '❌ Failed to update course.';
      toast.error(message);
    }
  };

  const handleDeleteCourse = async (id) => {
    console.log("Deleting course with id:", id);
    try {
      await deleteCourseTrigger(id).unwrap();
      toast.success('🗑️ Course deleted successfully!');
    } catch (error) {
      const message = error?.data?.message || '❌ Failed to delete course.';
      toast.error(message);
    }
  };

  return {
    handleAddCourseSubmit,
    handleUpdateCourseSubmit,
    handleDeleteCourse,
    addStatus,
    updateStatus,
    deleteStatus,
  };
};