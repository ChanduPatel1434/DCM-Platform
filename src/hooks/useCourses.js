import { useGetCoursesCategoryQuery } from '../Services/admin/coursesCategoryServices';
import { useGetCoursesQuery } from '../Services/admin/coursesService';

export const useCourses = () => {
  const {
    data: courses,
    error,
    isLoading,
    isError,
    refetch,
    isSuccess
  } = useGetCoursesQuery();

  return {
    courses,
    error,
    isLoading,
    isError,
    refetch,
    isSuccess,
    hasData: courses && courses.length > 0
  };
};
export const useCoursesCategory=()=>{
  const{
    data:categories,
    error,
    isLoading,
    isError,
    refetch,
    isSuccess

  }=useGetCoursesCategoryQuery()
  return{
    categories,
    error,
    isLoading,
    isError,
    refetch,
    isSuccess,
    hasData: categories && categories.length > 0

  }
}