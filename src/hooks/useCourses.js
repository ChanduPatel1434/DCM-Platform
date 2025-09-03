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
    courses: courses ,
    error,
    isLoading,
    isError,
    refetch,
    isSuccess,
    hasData: courses && courses.length > 0
  };
};