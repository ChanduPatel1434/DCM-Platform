import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLoginMutation } from '../Services/authService';
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import { useState } from "react";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [triggerLogin, { isLoading }] = useLoginMutation();

  // For modular alert handling
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('danger');
  const [alertMessage, setAlertMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Minimum 6 characters required')
        .required('Password is required'),
    }),
    onSubmit: (values) => {
      triggerLogin(values).then(response => {
        if (response.error) {
          setAlertType('danger');
          setAlertMessage(response.error.data?.message || 'Login failed');
          setShowAlert(true);
        } else {
          localStorage.setItem('authToken', response.data.token);
        

          dispatch(login({
            user: response.data.user,
            token: response.data.token
          }));

          setAlertType('success');
          setAlertMessage('Login successful! Redirecting...');
          setShowAlert(true);

          setTimeout(() => navigate('/dashboard'), 1500);
        }
      });
    },
  });

  return (
    <>
      {/* 🔔 Login Alert */}
      {showAlert && (
        <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
          {alertMessage}
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowAlert(false)}
            aria-label="Close"
          ></button>
        </div>
      )}

      <form className="login-signup-form" onSubmit={formik.handleSubmit}>
        {/* 📧 Email Field */}
        <div className="form-group">
          <label className="pb-1">Email Address</label>
          <div className="input-group input-group-merge">
            <div className="input-icon">
              <span className="ti-email color-primary"></span>
            </div>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="name@yourdomain.com"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <small className="text-danger d-block mt-1">{formik.errors.email}</small>
          )}
        </div>

        {/* 🔐 Password Field */}
        <div className="form-group">
          <div className="row">
            <div className="col">
              <label className="pb-1">Password</label>
            </div>
            <div className="col-auto">
              <Link to="/password-reset" className="form-text small text-muted">
                Forgot password?
              </Link>
            </div>
          </div>
          <div className="input-group input-group-merge">
            <div className="input-icon">
              <span className="ti-lock color-primary"></span>
            </div>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <small className="text-danger d-block mt-1">{formik.errors.password}</small>
          )}
        </div>

        {/* 🚀 Submit Button */}
        <button type="submit" className="btn-block secondary-solid-btn border-radius mt-4 mb-3">
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </>
  );
};

export default LoginForm;