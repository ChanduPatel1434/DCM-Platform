import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const FeedbackForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      rating: '',
      category: 'general',
      message: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      rating: Yup.string().required('Please select a rating'),
      category: Yup.string().required('Category is required'),
      message: Yup.string().required('Feedback is required').min(10, 'Please provide more detailed feedback')
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      // Simulate sending feedback
      setTimeout(() => {
        alert('Thank you for your feedback! We appreciate your input.');
        resetForm();
        setSubmitting(false);
      }, 1000);
    },
  });

  const categories = [
    { id: 'general', name: 'General Feedback' },
    { id: 'course', name: 'Course Content' },
    { id: 'instructor', name: 'Instructor' },
    { id: 'platform', name: 'Platform Experience' },
    { id: 'suggestion', name: 'Suggestion' }
  ];

  const ratings = [
    { value: '5', label: 'Excellent' },
    { value: '4', label: 'Very Good' },
    { value: '3', label: 'Good' },
    { value: '2', label: 'Fair' },
    { value: '1', label: 'Poor' }
  ];

  return (
    <div className="dashboard-app-container">
      <div className="component-container">
        <div className="component-header">
          <h1>Share Your Feedback</h1>
          <p>Help us improve your learning experience</p>
        </div>

        <div className="feedback-form-container">
          <form onSubmit={formik.handleSubmit} className="feedback-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className={formik.touched.name && formik.errors.name ? 'error' : ''}
                  placeholder="Enter your name"
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="error-message">{formik.errors.name}</div>
                ) : null}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className={formik.touched.email && formik.errors.email ? 'error' : ''}
                  placeholder="Enter your email"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="error-message">{formik.errors.email}</div>
                ) : null}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Feedback Category</label>
                <select
                  id="category"
                  name="category"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.category}
                  className={formik.touched.category && formik.errors.category ? 'error' : ''}
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {formik.touched.category && formik.errors.category ? (
                  <div className="error-message">{formik.errors.category}</div>
                ) : null}
              </div>

              <div className="form-group">
                <label htmlFor="rating">Overall Rating</label>
                <select
                  id="rating"
                  name="rating"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.rating}
                  className={formik.touched.rating && formik.errors.rating ? 'error' : ''}
                >
                  <option value="">Select rating</option>
                  {ratings.map(rating => (
                    <option key={rating.value} value={rating.value}>
                      {rating.value} - {rating.label}
                    </option>
                  ))}
                </select>
                {formik.touched.rating && formik.errors.rating ? (
                  <div className="error-message">{formik.errors.rating}</div>
                ) : null}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Feedback</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
                className={formik.touched.message && formik.errors.message ? 'error' : ''}
                placeholder="What did you like? What can we improve? Share your thoughts..."
              />
              {formik.touched.message && formik.errors.message ? (
                <div className="error-message">{formik.errors.message}</div>
              ) : null}
              <div className="char-count">{formik.values.message.length}/500</div>
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;