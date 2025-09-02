import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useVerifyTokenQuery } from '../Services/authService';
import { useDispatch } from 'react-redux';
import { login, logout } from '../features/authSlice';
import { useGetIdAndBatchNamesQuery } from '../Services/admin/batchdetailsService';
import { useCourses } from './useCourses';
import { useGetStudentbyIdQuery } from '../Services/student/enrollFormServices';

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  // Token verification
  const { data: tokenData, error: tokenError } = useVerifyTokenQuery();
  const isAdmin = tokenData?.user?.role === 'admin'; 
  const isStudent = tokenData?.user?.role === 'student';

  // Role-based queries
  const { data: batches, isLoading: isBatchesLoading } = useGetIdAndBatchNamesQuery(undefined, {
    skip: !isAdmin,
  });

  const { courses, isLoading: isCoursesLoading } = useCourses();

  const { data: enrolledData, isLoading: isStudentLoading } = useGetStudentbyIdQuery(tokenData?.user.id, {
    skip: !isStudent,
  });
console.log(enrolledData,"joasd")
  const enrolledCourses = enrolledData?.enrollment?.enrolledCourses;
  console.log(enrolledCourses, '📘 Enrolled Courses');

  // ✅ Stable readiness flag
  const isReady = useMemo(() => {
    if (!tokenData?.verified || isCoursesLoading) return false;
    if (isAdmin && isBatchesLoading) return false;
    if (isStudent && isStudentLoading) return false;
    return true;
  }, [tokenData, isCoursesLoading, isBatchesLoading, isStudentLoading, isAdmin, isStudent]);

  // 🚀 Auth flow
  useEffect(() => {
    if (isReady) {
      const batchLists = isAdmin ? batches : [];

      dispatch(login({
        user: tokenData.user,
        token: tokenData.token,
        batchLists,
        courses,
        enrolledCourses,
      }));

      const redirectPath = location.pathname !== '/' ? location.pathname : '/dashboard';
      navigate(redirectPath, { replace: true });
      setIsChecking(false);
    } else if (tokenError) {
      localStorage.removeItem('authToken');
      dispatch(logout());
      navigate('/login');
      setIsChecking(false);
    }
  }, [isReady, tokenError]);

  return { isChecking };
};

export default useAuthCheck;