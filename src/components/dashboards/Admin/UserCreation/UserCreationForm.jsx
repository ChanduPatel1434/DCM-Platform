import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import './UserCreationForm.css';
import { useCourses } from '../../../../hooks/useCourses';
import toast from 'react-hot-toast';
import { useCreateUserMutation } from '../../../../Services/admin/statsService';

const UserCreationForm = () => {
  

  const [loading, setLoading] = useState(false);

const{courses}=useCourses()
const[triggerCreateUser,]=useCreateUserMutation()

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      role:'student',
      confirmPassword: '',
      enrolledCourses: []
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .required('Username is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
      enrolledCourses: Yup.array()
    }),
    onSubmit: async (values, { resetForm }) => {
        console.log(values,"iam values")
      setLoading(true);

      
      try {
      triggerCreateUser(values)
  .unwrap()
  .then((response) => {
    
    toast.success(`User created successfully: ${response.data?.message || response.name || 'Details received'}`);
  })
  .catch((error) => {
    console.log(error)
    toast.error(`Failed to create user: ${error.data?.message || 'Unknown error'}`);
  });
        resetForm();
      } catch (error) {
       toast.error("error creating A user")
      } finally {
        setLoading(false);
      }
    }
  });

  const handleCourseSelection = (courseId, isChecked) => {
    const currentCourses = [...formik.values.enrolledCourses];
    
    if (isChecked) {
      currentCourses.push(courseId);
    } else {
      const index = currentCourses.indexOf(courseId);
      if (index > -1) {
        currentCourses.splice(index, 1);
      }
    }
    
    formik.setFieldValue('enrolledCourses', currentCourses);
  };

  return (
    <div className="user-creation-form">
      <h2>Create New User</h2>
     

      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="error">{formik.errors.username}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="error">{formik.errors.confirmPassword}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label>Enroll in Courses</label>
          <div className="courses-checkbox-group">
            {courses?.map(course => (
              <div key={course._id} className="checkbox-item">
                <input
                  type="checkbox"
                  id={`course-${course._id}`}
                  checked={formik.values.enrolledCourses.includes(course._id)}
                  onChange={(e) => handleCourseSelection(course._id, e.target.checked)}
                />
                <label htmlFor={`course-${course._id}`}>
                   {course.name} 
                </label>
              </div>
            ))}
          </div>
        </div>

       <div className='text-center'>
         <button type="submit" className='outline-btn rounded-3 ' disabled={loading}>
          {loading ? 'Creating User...' : 'Create User'}
        </button>
       </div>
      </form>
    </div>
  );
};

export default UserCreationForm;