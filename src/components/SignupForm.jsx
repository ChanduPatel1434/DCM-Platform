import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSignupMutation } from '../Services/authService'; // Update path to your slice
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  // Alert state
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  // Terms & Conditions
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Signup mutation
  const [triggerSignup, { isLoading, data }] = useSignupMutation();
  const navigate = useNavigate();

  // Handle signup response
  useEffect(() => {
    if (data) {
      console.log('Signup data:', data);
    }
  }, [data]);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      role:'student'
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6   characters').required('Password is required')
    }),
    onSubmit: async values => {
      if (!termsAccepted) return;

      try {
        const response = await triggerSignup(values).unwrap();
        const { token } = response;

        if (token) localStorage.setItem('authToken', token);

        setAlertType('success');
        setAlertMessage(response?.message || 'Signup successful! Redirecting to login...');
        setShowAlert(true);

        setTimeout(() => navigate('/login'), 2000);
      } catch (error) {
        console.error('Signup failed:', error);

        const fallbackMessage = 'Signup failed. Please try again.';
        const extractedMessage =
          error?.data?.error ||
          error?.data?.message ||
          error?.message ||
          fallbackMessage;

        setShowAlert(true);
        setAlertType('danger');
        setAlertMessage(extractedMessage);
      }
    }
  });

  return (
    <>
      {/* Alert */}
      {showAlert && (
        <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
          {alertMessage}
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowAlert(false)}
          ></button>
        </div>
      )}


      {/* Form */}
      <form className="login-signup-form" onSubmit={formik.handleSubmit}>
        {/* Name */}
        <div className="form-group">
          <label className="pb-1">Your Name</label>
          <div className="input-group input-group-merge">
            <div className="input-icon">
              <span className="ti-user color-primary"></span>
            </div>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
          </div>
          {formik.touched.name && formik.errors.name && (
            <div className="text-danger">{formik.errors.name}</div>
          )}
        </div>

        {/* Email */}
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
              placeholder="name@address.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <div className="text-danger">{formik.errors.email}</div>
          )}
        </div>

        {/* Password */}
        <div className="form-group">
          <label className="pb-1">Password</label>
          <div className="input-group input-group-merge">
            <div className="input-icon">
              <span className="ti-lock color-primary"></span>
            </div>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <div className="text-danger">{formik.errors.password}</div>
          )}
        </div>

        {/* Terms Checkbox */}
        <div className="my-4">
          <div className="custom-control custom-checkbox mb-3">
            <input
              type="checkbox"
              className="custom-control-input"
              id="check-terms"
              onChange={e => setTermsAccepted(e.target.checked)}
            />
            <label className="custom-control-label" htmlFor="check-terms">
              I agree to the <a href="https://example.com">terms and conditions</a>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn-block secondary-solid-btn rounded-2 mt-4 mb-3"
          disabled={!termsAccepted || !formik.isValid || isLoading}
        >
          {isLoading ? 'Signing up...' : 'Sign up'}
        </button>
      </form>
    </>
  );
};

export default SignupForm;