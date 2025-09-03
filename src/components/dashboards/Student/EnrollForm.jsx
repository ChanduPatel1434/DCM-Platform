import { useSelector } from 'react-redux';
import { Formik, FieldArray, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Loader from '../common/Loader';
import { useState } from 'react';
import { useEnrollInCourseMutation } from '../../../Services/student/enrollFormServices';

const EnrollForm = () => {
  const { courseNames, user } = useSelector(state => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enrollFn, { data, error }] = useEnrollInCourseMutation();

  const initialValues = {
    enrolledCourses: [{ courseId: '', assigned: false, availability: '' }],
  };

  const validationSchema = Yup.object({
    enrolledCourses: Yup.array().of(
      Yup.object({
        courseId: Yup.string().required('Course is required'),
        assigned: Yup.boolean(),
        availability: Yup.string()
          .oneOf(['morning', 'evening'], 'Select morning or evening')
          .required('Availability is required'),
      })
    ),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    try {
      const payload = {
        user: user.id,
        enrolledCourses: values.enrolledCourses.map(course => ({
          course: course.courseId,
          assigned: false,
          availability: course.availability,
        })),
      };
      console.log("enrollmenttt payload",payload)

      const response = await enrollFn(payload).unwrap();
      console.log('Enrollment successful:', response);
      resetForm();
    } catch (err) {
      console.error('Enrollment failed:', err);
    }
    setIsSubmitting(false);
  };

  if (!Array.isArray(courseNames)) {
    return <Loader message="Fetching courses..." />;
  }

  const getAvailableCourses = (selectedIds) =>
    courseNames.filter(course => !selectedIds.includes(course._id));

  return (
    <div className="container my-4">
      <h4 className="mb-3">Course Enrollment</h4>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values }) => (
          <Form>
            <FieldArray name="enrolledCourses">
              {({ push, remove }) => (
                <>
                  {values.enrolledCourses.map((entry, index) => {
                    const selectedCourseIds = values.enrolledCourses
                      .map((c, i) => i !== index && c.courseId)
                      .filter(Boolean);

                    const availableCourses = getAvailableCourses(selectedCourseIds);

                    return (
                      <div key={index} className="card mb-3 p-3">
                        <div className="form-group">
                          <label htmlFor={`enrolledCourses[${index}].courseId`}>
                            Course:
                          </label>
                          <Field
                            as="select"
                            name={`enrolledCourses[${index}].courseId`}
                            className="form-control"
                          >
                            <option value="">Select course</option>
                            {availableCourses.length > 0 ? (
                              availableCourses.map(course => (
                                <option key={course._id} value={course._id}>
                                  {course.name}
                                </option>
                              ))
                            ) : (
                              <option disabled>No courses available</option>
                            )}
                          </Field>
                          <ErrorMessage
                            name={`enrolledCourses[${index}].courseId`}
                            component="div"
                            className="text-danger mt-1"
                          />
                        </div>

                        <div className="form-group mt-2">
                          <label htmlFor={`enrolledCourses[${index}].availability`}>
                            When are you free?
                          </label>
                          <Field
                            as="select"
                            name={`enrolledCourses[${index}].availability`}
                            className="form-control"
                          >
                            <option value="">Select availability</option>
                            <option value="morning">Morning</option>
                            <option value="evening">Evening</option>
                          </Field>
                          <ErrorMessage
                            name={`enrolledCourses[${index}].availability`}
                            component="div"
                            className="text-danger mt-1"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="btn btn-outline-danger btn-sm mt-2"
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() =>
                      push({ courseId: '', assigned: false, availability: '' })
                    }
                    className="btn btn-primary mx-3"
                    disabled={values.enrolledCourses.length >= courseNames.length}
                  >
                    + Add Another Course
                  </button>
                </>
              )}
            </FieldArray>

            {error && (
              <div className="alert alert-danger mt-3">
                {error?.data?.message || 'Enrollment failed. Please try again.'}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-success mt-3"
              disabled={isSubmitting}
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