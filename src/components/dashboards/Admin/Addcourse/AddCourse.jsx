import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';

const CourseModal = ({ handleClose, initialValues, onSubmitFn, mode = 'add' }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Course name is required'),
    description: Yup.string().required('Description is required'),
    instructor: Yup.string().required('Instructor is required'),
    duration: Yup.string().required('Duration is required'),
    price: Yup.number()
      .typeError('Price must be a number')
      .positive('Price must be positive')
      .required('Price is required'),
  });

  const modalTitle = mode === 'edit' ? '✏️ Edit Course' : '📝 Add New Course';
  const submitLabel = mode === 'edit' ? '💾 Update Course' : '🚀 Add Course';
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
                      console.log(values,"from courseMOdal")
                      console.log(mode)
                      console.log(onSubmitFn)
                      try {
                        await onSubmitFn(values);

                        if (mode === 'add') {
                          actions.resetForm(); // ✅ safely resets form only in add mode
                        }

                        handleClose();
                      } catch (error) {
                        console.error(`${mode === 'edit' ? 'Update' : 'Add'} failed:`, error);
                        alert(`❌ Failed to ${mode === 'edit' ? 'update' : 'add'} course.`);
                      }
                    }}
                  >
                    {() => (
                      <Form>
                        {[
                          { name: 'name', label: 'Course Name' },
                          { name: 'description', label: 'Description', as: 'textarea', rows: 3 },
                          { name: 'instructor', label: 'Instructor' },
                          { name: 'duration', label: 'Duration' },
                          { name: 'price', label: 'Price (₹)' },
                        ].map(({ name, label, as, rows }) => (
                          <div className="mb-2" key={name}>
                            <label htmlFor={name} className="form-label fw-semibold">{label}</label>
                            <Field
                              name={name}
                              as={as || 'input'}
                              rows={rows}
                              className="form-control border-primary-subtle"
                            />
                            <ErrorMessage name={name} component="div" className="text-danger mt-1" />
                          </div>
                        ))}

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