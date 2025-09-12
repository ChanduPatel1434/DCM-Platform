import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useVerifyTokenQuery } from '../Services/authService';
import { useDispatch } from 'react-redux';
import { login, logout } from '../features/authSlice';


// useAuthCheck.js
const useAuthCheck = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  const { data: tokenData, error: tokenError } = useVerifyTokenQuery();

  useEffect(() => {
    if (tokenData?.verified) {
      dispatch(login({
        user: tokenData.user,
        token: tokenData.token
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
  }, [tokenData, tokenError]);

  return { isChecking };
};

export default useAuthCheck;