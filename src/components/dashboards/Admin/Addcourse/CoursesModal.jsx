import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { useCoursesCategory } from '../../../../hooks/useCourses.js';
import { useCourseHandlers } from './courseshooks.js'; // assuming this is where your handlers live

const CourseModal = ({ handleClose, mode = 'add', course = {} }) => {
  const { categories, isSuccess } = useCoursesCategory();
  const {
    handleAddCourseSubmit,
    handleUpdateCourseSubmit,
  } = useCourseHandlers();

  const isEdit = mode === 'edit';

  const initialValues = isEdit
    ? {
        _id: course._id,
        name: course.name || '',
        description: course.description || '',
        instructor: course.instructor || '',
        duration: course.duration || '',
        price: course.price || '',
        category: course.category || '',
      }
    : {
        name: '',
        description: '',
        instructor: '',
        duration: '',
        price: '',
        category: '',
      };

  const onSubmitFn = isEdit ? handleUpdateCourseSubmit : handleAddCourseSubmit;

  const validationSchema = Yup.object({
    name: Yup.string().required('Course name is required'),
    description: Yup.string().required('Description is required'),
    instructor: Yup.string().required('Instructor is required'),
    duration: Yup.string().required('Duration is required'),
    price: Yup.number()
      .typeError('Price must be a number')
      .positive('Price must be positive')
      .required('Price is required'),
    category: Yup.string().required('Category is required'),
  });

  const modalTitle = isEdit ? '✏️ Edit Course' : '📝 Add New Course';
  const submitLabel = isEdit ? '💾 Update Course' : '🚀 Add Course';

  return (
    <AnimatePresence>
      <motion.div
        className="modal fade show d-block"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <div className="modal-dialog modal-dialog-scrollable modal-md modal-dialog-centered">
          <div className="modal-content shadow-lg rounded-4" style={{ maxHeight: '100vh', overflow: 'hidden' }}>
            <div className="modal-header">
              <h5 className="modal-title text-primary text-center">{modalTitle}</h5>
              <button type="button" className="btn-close" onClick={handleClose}></button>
            </div>

            <div className="modal-body" style={{ overflowY: 'auto', maxHeight: '80vh', paddingBottom: '1rem' }}>
              <motion.div
                className="container"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <div className="card shadow-sm border-0 rounded-4 p-3 mx-auto" style={{ maxWidth: '500px' }}>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (values, actions) => {
                      try {
                        await onSubmitFn(values);
                        if (!isEdit) actions.resetForm();
                        handleClose();
                      } catch (error) {
                        console.error(`${isEdit ? 'Update' : 'Add'} failed:`, error);
                        alert(`❌ Failed to ${isEdit ? 'update' : 'add'} course.`);
                      }
                    }}
                  >
                    {() => (
                      <Form>
                        {/* Course Name */}
                        <div className="mb-2">
                          <label htmlFor="name" className="form-label fw-semibold">Course Name</label>
                          <Field name="name" className="form-control border-primary-subtle" />
                          <ErrorMessage name="name" component="div" className="text-danger mt-1" />
                        </div>

                        {/* Description */}
                        <div className="mb-2">
                          <label htmlFor="description" className="form-label fw-semibold">Description</label>
                          <Field as="textarea" name="description" rows={3} className="form-control border-primary-subtle" />
                          <ErrorMessage name="description" component="div" className="text-danger mt-1" />
                        </div>

                        {/* Category Dropdown */}
                        {isSuccess && (
                          <div className="mb-2">
                            <label htmlFor="category" className="form-label fw-semibold">Category</label>
                            <Field as="select" name="category" className="form-control border-primary-subtle">
                              <option value="">Select a category</option>
                              {categories?.map((cat) => (
                                <option key={cat} value={cat}>
                                  {cat}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage name="category" component="div" className="text-danger mt-1" />
                          </div>
                        )}

                        {/* Instructor */}
                        <div className="mb-2">
                          <label htmlFor="instructor" className="form-label fw-semibold">Instructor</label>
                          <Field name="instructor" className="form-control border-primary-subtle" />
                          <ErrorMessage name="instructor" component="div" className="text-danger mt-1" />
                        </div>

                        {/* Duration */}
                        <div className="mb-2">
                          <label htmlFor="duration" className="form-label fw-semibold">Duration</label>
                          <Field name="duration" className="form-control border-primary-subtle" />
                          <ErrorMessage name="duration" component="div" className="text-danger mt-1" />
                        </div>

                        {/* Price */}
                        <div className="mb-2">
                          <label htmlFor="price" className="form-label fw-semibold">Price (₹)</label>
                          <Field name="price" className="form-control border-primary-subtle" />
                          <ErrorMessage name="price" component="div" className="text-danger mt-1" />
                        </div>

                        {/* Submit Button */}
                        <div className="d-grid mt-3">
                          <button type="submit" className="btn btn-primary btn-lg">
                            {submitLabel}
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CourseModal;