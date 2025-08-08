import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Formik, FieldArray, Form, Field } from 'formik';
import * as Yup from 'yup';

const EnrollForm = () => {
  const { courseNames } = useSelector(state => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);  
  const initialValues = {
    enrolledCourses: [{ courseId: '', assigned: false }],
  };

  const validationSchema = Yup.object({
    enrolledCourses: Yup.array().of(
      Yup.object({
        courseId: Yup.string().required('Course is required'),
        assigned: Yup.boolean(),
      })
    ),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true); // Start spinner or disable UI
    console.log('Enrolled:', values);

    // Simulate async request
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false); // Re-enable form
    resetForm(); // Optionally reset
  };

  if (courseNames?.length === 0) {
    return <p className="text-muted">Loading available courses...</p>;
  }

  return (
    <div className="container my-4">
      <h4 className="mb-3">Course Enrollment</h4>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({ values }) => (
          <Form>
            <FieldArray name="enrolledCourses">
              {({ push, remove }) => (
                <>
                  {values.enrolledCourses.map((_, index) => (
                    <div key={index} className="card mb-3 p-3">
                      <div className="form-group">
                        <label htmlFor={`enrolledCourses[${index}].courseId`}>Course:</label>
                        <Field
                          as="select"
                          name={`enrolledCourses[${index}].courseId`}
                          className="form-control"
                        >
                          <option value="">Select course</option>
                          {courseNames?.map(course => (
                            <option key={course._id} value={course._id}>
                              {course.name}
                            </option>
                          ))}
                        </Field>
                      </div>

                      <Field
                        type="hidden"
                        name={`enrolledCourses[${index}].assigned`}
                        value={false}
                      />

                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="btn btn-outline-danger btn-sm mt-2"
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => push({ courseId: '', assigned: false })}
                    className="btn btn-primary  mx-3"
                  >
                    + Add Another Course
                  </button>
                </>
              )}
            </FieldArray>

            <button
              type="submit"
              className="btn btn-success"
              disabled={isSubmitting} // 👈 disables while submitting
            >
              {isSubmitting ? 'Submitting...' : 'Enroll'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EnrollForm;