import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSendVerificationEmailMutation, useSignupMutation } from '../Services/authService';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SignupForm = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verifyCooldown, setVerifyCooldown] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { name, email } = location.state || {};

  const [triggerSignup, { isLoading }] = useSignupMutation();
  const [sendVerificationEmail, { isLoading: isVerifying }] = useSendVerificationEmailMutation();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      password: '',
      role: 'student'
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      mobile: Yup.string()
        .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
        .required('Mobile number is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
    }),
    onSubmit: async values => {
      if (!termsAccepted || !isVerified) return;

      try {
        const response = await triggerSignup(values).unwrap();
        const { token } = response;

        if (token) localStorage.setItem('authToken', token);

        toast.success(response?.message || 'Signup successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      } catch (error) {
        const fallbackMessage = 'Signup failed. Please try again.';
        const extractedMessage =
          error?.data?.error ||
          error?.data?.message ||
          error?.message ||
          fallbackMessage;

        toast.error(extractedMessage);
      }
    }
  });

  useEffect(() => {
    if (name || email) {
      formik.setValues(prev => ({
        ...prev,
        name: name || '',
        email: email || '',
      }));
      setIsVerified(true);
    }
  }, [name, email]);

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    const { email, name } = formik.values;

    if (!email || !name) {
      const message = !email && !name
        ? 'Please enter your name and email first'
        : !email
        ? 'Please enter your email first'
        : 'Please enter your name first';
      
      toast.error(message);
      return;
    }

    try {
      const res = await sendVerificationEmail({ email, name }).unwrap();
      toast.success(res.message || 'Verification email sent! Please check your inbox.');

      setVerifyCooldown(true);
      setTimeout(() => setVerifyCooldown(false), 30000);
    } catch (err) {
      toast.error(err?.data?.message || 'Error sending verification email');
    }
  };

  return (
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

      {/* Email + Verify */}
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
          {!isVerified ? (
            <a
              href=''
              onClick={handleVerifyEmail}
              disabled={isVerifying || verifyCooldown}
            >
              {isVerifying ? 'Sending...' : verifyCooldown ? 'Wait' : 'Click to Get Verify Mail'}
            </a>
          ) : (
            <span className="badge bg-success ms-2">Verified</span>
          )}
        </div>
        {formik.touched.email && formik.errors.email && (
          <div className="text-danger">{formik.errors.email}</div>
        )}
      </div>

      {/* Mobile Number */}
      {isVerified && (
        <>
          <div className="form-group">
            <label className="pb-1">Mobile Number</label>
            <div className="input-group input-group-merge">
              <div className="input-icon">
                <span className="ti-mobile color-primary"></span>
              </div>
              <input
                type="text"
                name="mobile"
                className="form-control"
                placeholder="Enter your mobile number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mobile}
              />
            </div>
            {formik.touched.mobile && formik.errors.mobile && (
              <div className="text-danger">{formik.errors.mobile}</div>
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
        </>
      )}

      {/* Terms Checkbox */}
      <div className="my-4">
        <div className="ms-4 custom-checkbox">
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
        disabled={!termsAccepted || !formik.isValid || isLoading || !isVerified}
      >
        {isLoading ? 'Signing up...' : 'Sign up'}
      </button>
    </form>
  );
};

export default SignupForm;