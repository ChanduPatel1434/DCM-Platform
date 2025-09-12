import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useGetCoursesQuery } from '../../../../Services/admin/coursesService';
import { motion, AnimatePresence } from 'framer-motion';
import { useBatchHandlers } from './batchshooks';

const BatchModal = ({ handleClose, mode = 'add', batch = {} }) => {
  const isEdit = mode === 'edit';

  const {
    handleAddBatchSubmit,
    handleUpdateBatchSubmit,
    addStatus,
    updateStatus,
  } = useBatchHandlers();

  const { data: courses, isLoading: coursesLoading, error: coursesError } = useGetCoursesQuery();

  const initialValues = isEdit
    ? {
        batchId: batch._id,
        batchName: batch.batchName || '',
        courseId: batch.courseId || '',
        startDate: batch.startDate?.slice(0, 10) || '',
        endDate: batch.endDate?.slice(0, 10) || '',
        isActive: batch.isActive ?? true,
      }
    : {
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
    if (isEdit) {
      await handleUpdateBatchSubmit(values);
    } else {
      await handleAddBatchSubmit(values);
      resetForm();
    }
    handleClose();
  };

  const isLoading = isEdit ? updateStatus.isLoading : addStatus.isLoading;
  const modalTitle = isEdit ? '✏️ Edit Batch' : '🎓 Create a Batch';
  const submitLabel = isEdit ? '💾 Update Batch' : '🚀 Create Batch';

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
        <div className="modal-dialog modal-md modal-dialog-centered">
          <div className="modal-content shadow-lg rounded-4">
            <div className="modal-header">
              <h5 className="modal-title text-primary">{modalTitle}</h5>
              <button type="button" className="btn-close" onClick={handleClose}></button>
            </div>
            <div className="modal-body my-3 px-5">
              {coursesError && (
                <div className="alert alert-danger text-center">Failed to load courses.</div>
              )}
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ isSubmitting }) => (
                  <Form className="row g-3">
                    <div className="col-12">
                      <label className="form-label">Batch Name</label>
                      <Field name="batchName" className="form-control" placeholder="Enter batch name" />
                      <ErrorMessage name="batchName" component="div" className="text-danger mt-1" />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Course</label>
                      {coursesLoading ? (
                        <div className="form-text text-muted">Loading courses...</div>
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
                      <ErrorMessage name="courseId" component="div" className="text-danger mt-1" />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Start Date</label>
                      <Field name="startDate" type="date" className="form-control" />
                      <ErrorMessage name="startDate" component="div" className="text-danger mt-1" />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">End Date</label>
                      <Field name="endDate" type="date" className="form-control" />
                      <ErrorMessage name="endDate" component="div" className="text-danger mt-1" />
                    </div>

                    <div className="col-12 form-check ms-3">
                      <Field name="isActive" type="checkbox" className="form-check-input" id="isActive" />
                      <label htmlFor="isActive" className="form-check-label">Active</label>
                    </div>

                    <div className="col-12 text-center mt-3">
                      <button
                        type="submit"
                        className="btn btn-lg btn-primary px-5"
                        disabled={isSubmitting || isLoading}
                      >
                        {isLoading ? '⏳ Saving...' : submitLabel}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BatchModal;