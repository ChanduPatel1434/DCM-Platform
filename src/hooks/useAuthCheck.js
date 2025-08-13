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
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  const { data: tokenData, error: tokenError } = useVerifyTokenQuery();
  const isAdmin = tokenData?.user?.role === 'admin';

  const {
    data: batchNames,
    isFetching: isFetchingBatches,
  } = useGetBatchNamesQuery(undefined, {
    skip: !isAdmin,
  });

  const {
    data: courseNames,
    isFetching: isFetchingCourses,
  } = useGetCoursesQuery();

  useEffect(() => {
    const isTokenVerified = tokenData?.verified;
    const hasCourses = courseNames !== undefined;
    const hasBatchNames = !isAdmin || batchNames !== undefined;

    if (isTokenVerified && hasCourses && hasBatchNames) {
      const batchList = isAdmin ? batchNames : [];

      dispatch(
        login({
          user: tokenData.user,
          token: tokenData.token,
          batchList,
          courseNames,
        })
      );

      const redirectPath =
        location.pathname !== '/' ? location.pathname : '/dashboard';
      navigate(redirectPath, { replace: true });
      setIsChecking(false);
    } else if (tokenError) {
      localStorage.removeItem('authToken');
      dispatch(logout());
      navigate('/login');
      setIsChecking(false);
    }
  }, [
    tokenData,
    tokenError,
    dispatch,
    navigate,
    batchNames,
    courseNames,
    isAdmin,
    location.pathname,
  ]);

  return { isChecking };
};

export default useAuthCheck;