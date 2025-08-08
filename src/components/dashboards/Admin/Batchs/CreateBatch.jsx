import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAddBatchMutation } from '../../../../Services/admin/batchdetailsService';
import { useGetCoursesQuery } from '../../../../Services/admin/coursesService';

const Createbatch = () => {
  const [addBatch, { isLoading }] = useAddBatchMutation();
  const { data: courses, isLoading: coursesLoading, error: coursesError } = useGetCoursesQuery();
  console.log(courses)

  const initialValues = {
    batchName: '',
    courseId: '',
    startDate: '',
    endDate: '',
    isActive: true,
  };

  const validationSchema = Yup.object({
    batchName: Yup.string().required('Required'),
    courseId: Yup.string().required('Required'),
    startDate: Yup.date().required('Required'),
    endDate: Yup.date()
      .min(Yup.ref('startDate'), 'End date must be after start date')
      .required('Required'),
  });

  const onSubmit = async (values, { resetForm }) => {

    console.log(values)
     
    
    try {
      const response = await addBatch(values).unwrap();
      console.log('Batch created:', response);
      resetForm(); 
    } catch (err) {
      console.error('Failed to create batch:', err);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <div className="container">
        <h2 className="mb-4 text-center">🎓 Create a Batch</h2>

        {coursesError && <div className="alert alert-danger">Failed to load courses.</div>}

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form className="row g-3">
              <div className="col-md-12">
                <label className="form-label">Batch Name</label>
                <Field name="batchName" className="form-control" />
                <ErrorMessage name="batchName" component="div" className="text-danger" />
              </div>

              <div className="col-md-12">
                <label className="form-label">Course</label>
                {coursesLoading ? (
                  <div>Loading courses...</div>
                ) : (
                  <Field as="select" name="courseId" className="form-select">
                    <option value="">Select a course</option>
                    {courses?.map(course => (
                      <option key={course._id} value={course._id}>
                        {course.name}
                      </option>
                    ))}
                  </Field>
                )}
                <ErrorMessage name="courseId" component="div" className="text-danger" />
              </div>

              <div className="col-md-12">
                <label className="form-label">Start Date</label>
                <Field name="startDate" type="date" className="form-control" />
                <ErrorMessage name="startDate" component="div" className="text-danger" />
              </div>

              <div className="col-md-12">
                <label className="form-label">End Date</label>
                <Field name="endDate" type="date" className="form-control" />
                <ErrorMessage name="endDate" component="div" className="text-danger" />
              </div>

              <div className="col-12 form-check mb-3">
                <Field name="isActive" type="checkbox" className="form-check-input" id="isActive" />
                <label htmlFor="isActive" className="form-check-label">Active</label>
              </div>

              <div className="col-12 text-center">
                <button type="submit" className="btn btn-primary" disabled={isSubmitting || isLoading}>
                  🚀 {isLoading ? 'Creating...' : 'Create Batch'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Createbatch;