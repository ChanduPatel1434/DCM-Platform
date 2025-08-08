import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSignupMutation } from '../../../../Services/authService';

const CreateAdminForm = () => {
  // Alert state
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  // Signup mutation
  const [triggerSignup, { isLoading }] = useSignupMutation();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      role: 'admin' // Default role is admin
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
    }),
    onSubmit: async values => {
      try {
        // Add role to the values
        const adminData = {
          ...values,
          role: 'admin' // Ensure role is set to admin
        };

        const response = await triggerSignup(adminData).unwrap();

        setAlertType('success');
        setAlertMessage(response?.message || 'Admin account created successfully!');
        setShowAlert(true);

        // Reset form after successful submission
        formik.resetForm();
      } catch (error) {
        console.error('Admin creation failed:', error);

        const fallbackMessage = 'Admin creation failed. Please try again.';
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
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Create Admin Account</h4>
        <p className="card-description">Create a new admin user with administrative privileges</p>
      </div>
      <div className="card-body">
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
        <form onSubmit={formik.handleSubmit}>
          {/* Name */}
          <div className="form-group mb-3">
            <label className="form-label">Full Name</label>
            <div className="input-group">
              <span className="input-group-text"><i className="ti-user"></i></span>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter admin name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            </div>
            {formik.touched.name && formik.errors.name && (
              <div className="text-danger mt-1">{formik.errors.name}</div>
            )}
          </div>

          {/* Email */}
          <div className="form-group mb-3">
            <label className="form-label">Email Address</label>
            <div className="input-group">
              <span className="input-group-text"><i className="ti-email"></i></span>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="admin@example.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <div className="text-danger mt-1">{formik.errors.email}</div>
            )}
          </div>

          {/* Password */}
          <div className="form-group mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text"><i className="ti-lock"></i></span>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Create a secure password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-danger mt-1">{formik.errors.password}</div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!formik.isValid || isLoading}
          >
            {isLoading ? 'Creating Admin...' : 'Create Admin Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAdminForm;