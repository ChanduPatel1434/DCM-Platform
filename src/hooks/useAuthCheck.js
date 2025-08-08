import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useVerifyTokenQuery } from '../Services/authService';
import { useDispatch } from 'react-redux';
import { login, logout } from '../features/authSlice';
import { useGetBatchNamesQuery } from '../Services/admin/batchdetailsService';
import { useGetCoursesQuery } from '../Services/admin/coursesService';

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Capture current route
  const [isChecking, setIsChecking] = useState(true);

  const { data, error } = useVerifyTokenQuery();
  const isAdmin = data?.user?.role === 'admin';

  const { data: BatchNames } = useGetBatchNamesQuery(undefined, {
    skip: !isAdmin,
  });

  const { data: rawCourses } = useGetCoursesQuery();
  const courseNames = rawCourses;

  useEffect(() => {
    if (data?.verified) {
      const batchList = isAdmin ? BatchNames : [];

      dispatch(
        login({
          user: data.user,
          token: data.token,
          batchList,
          courseNames,
        })
      );

      // ✅ Navigate back to the original route or default to dashboard
      const redirectPath = location.pathname !== '/' ? location.pathname : '/dashboard';
      navigate(redirectPath, { replace: true });
    } else if (error) {
      localStorage.removeItem('authToken');
      dispatch(logout());
      navigate('/login');
    }

    setIsChecking(false);
  }, [data, error, dispatch, navigate, BatchNames, isAdmin, location.pathname]);

  return { isChecking };
};

export default useAuthCheck;  