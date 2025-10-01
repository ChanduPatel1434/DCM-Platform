import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useGetCoursesQuery } from '../../../../Services/admin/coursesService';
import { motion, AnimatePresence } from 'framer-motion';
import { useBatchHandlers } from './batchshooks';
import { X } from 'lucide-react';

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
  

  return (
    <AnimatePresence>
      <motion.div
        className="dashboard-app-container"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}
      >
        <div className="card shadow-xl rounded-xl w-100" style={{ maxWidth: '500px', maxHeight: '90vh', overflow: 'hidden' }}>
          <div className="card-header d-flex justify-content-between align-items-center p-4 border-bottom">
            <h3 className="mb-0 fw-bold fs-2xl text-dark">
              {isEdit ? '✏️ Edit Batch' : '🎓 Create Batch'}
            </h3>
          <X onClick={handleClose} className='text-dark'/>
          </div>

          <div className="card-body p-0" style={{ overflowY: 'auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <Formik 
                initialValues={initialValues} 
                validationSchema={validationSchema} 
                onSubmit={onSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="p-4">
                    {coursesError && (
                      <div className="bg-error text-white rounded-lg p-3 mb-3 text-center">
                        Failed to load courses.
                      </div>
                    )}

                    {/* Batch Name */}
                    <div className="form-group mb-3">
                      <label htmlFor="batchName" className="form-label fw-medium text-dark mb-2">
                        Batch Name
                      </label>
                      <Field 
                        name="batchName" 
                        className="form-control rounded-lg p-3 border"
                        placeholder="Enter batch name"
                      />
                      <ErrorMessage name="batchName" component="div" className="text-error fs-sm mt-1" />
                    </div>

                    {/* Course Selection */}
                    <div className="form-group mb-3">
                      <label htmlFor="courseId" className="form-label fw-medium text-dark mb-2">
                        Course
                      </label>
                      {coursesLoading ? (
                        <div className="text-muted fs-sm p-3 bg-light rounded-lg">
                          Loading courses...
                        </div>
                      ) : (
                        <Field as="select" name="courseId" className="form-select rounded-lg p-3 border">
                          <option value="">Select a course</option>
                          {courses?.map(course => (
                            <option key={course._id} value={course._id}>
                              {course.name}
                            </option>
                          ))}
                        </Field>
                      )}
                      <ErrorMessage name="courseId" component="div" className="text-error fs-sm mt-1" />
                    </div>

                    {/* Date Fields */}
                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="startDate" className="form-label fw-medium text-dark mb-2">
                            Start Date
                          </label>
                          <Field 
                            name="startDate" 
                            type="date" 
                            className="form-control rounded-lg p-3 border"
                          />
                          <ErrorMessage name="startDate" component="div" className="text-error fs-sm mt-1" />
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="endDate" className="form-label fw-medium text-dark mb-2">
                            End Date
                          </label>
                          <Field 
                            name="endDate" 
                            type="date" 
                            className="form-control rounded-lg p-3 border"
                          />
                          <ErrorMessage name="endDate" component="div" className="text-error fs-sm mt-1" />
                        </div>
                      </div>
                    </div>

                    {/* Active Checkbox */}
                   
                      <div >
                        <input type="checkbox" name="isActive" id="isActive" />
                        <label htmlFor="isActive" className='text-dark fw-medium ml-2'> Active</label>
                      
                     
                    </div>

                    {/* Submit Button */}
                    <div className="form-group mt-4">
                      <button
                        type="submit"
                        className="btn btn-primary w-100 p-3 rounded-lg fw-semibold"
                        disabled={isSubmitting || isLoading}
                        style={{ minHeight: '50px' }}
                      >
                        {isLoading ? (
                          <span className="d-flex align-items-center justify-content-center">
                            <span className="spinner-border spinner-border-sm me-2" />
                            Saving...
                          </span>
                        ) : (
                          <span className="d-flex align-items-center justify-content-center">
                            {isEdit ? '💾 Update Batch' : '🚀 Create Batch'}
                          </span>
                        )}
                      </button>
                    </div>

                    {/* Form Tips */}
                    <div className="bg-light rounded-lg p-3 mt-3">
                      <div className="text-muted fs-sm">
                        <strong>💡 Tip:</strong> Ensure the end date is after the start date for proper scheduling.
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BatchModal;