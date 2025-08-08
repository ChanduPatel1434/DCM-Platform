import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAddCourseMutation } from '../../../../Services/admin/coursesService';

const AddCourseForm = () => {

  const [addCourse] = useAddCourseMutation();


  const initialValues = {
    name: '',
    description: '',
    instructor: '',
    duration: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Course name is required'),
    description: Yup.string().required('Description is required'),
    instructor: Yup.string().required('Instructor is required'),
    duration: Yup.string().required('Duration is required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    try {
      // await axios.post('/api/courses', values);
      await addCourse(values).then(res => console.log(res)).catch(err => console.log(err))
      alert('Course added successfully!');
      resetForm();
    } catch (error) {
      console.error('Error adding course:', error);
      alert('Failed to add course.');
    }
  };

  return (<>
    <div className='w-50 m-auto'>
      <div className="container p-4  rounded-4 shadow">
        <h4 className="mb-4">📘 Add New Course</h4>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Course Name</label>
                <Field name="name" className="form-control" />
                <ErrorMessage name="name" component="div" className="text-danger mt-1" />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <Field name="description" as="textarea" className="form-control" rows="3" />
                <ErrorMessage name="description" component="div" className="text-danger mt-1" />
              </div>

              <div className="mb-3">
                <label htmlFor="instructor" className="form-label">Instructor</label>
                <Field name="instructor" className="form-control" />
                <ErrorMessage name="instructor" component="div" className="text-danger mt-1" />
              </div>

              <div className="mb-3">
                <label htmlFor="duration" className="form-label">Duration</label>
                <Field name="duration" className="form-control" />
                <ErrorMessage name="duration" component="div" className="text-danger mt-1" />
              </div>

              <button type="submit" className="btn btn-success">Add Course</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  </>
  );
};

export default AddCourseForm;