import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useCourses } from '../../../../hooks/useCourses';
import {
  useCreateMeetingMutation,
  useUpdateMeetingMutation
} from '../../../../Services/admin/zoomService';
import { toast } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { useGetIdAndBatchNamesQuery } from '../../../../Services/admin/batchdetailsService';
import {  X } from 'lucide-react';

const validationSchema = Yup.object({
  title: Yup.string().required('Required'),
  startTime: Yup.date()
    .min(new Date(), 'Start time must be in the future')
    .required('Required'),
  duration: Yup.number()
    .min(15, 'Minimum 15 minutes')
    .max(180, 'Maximum 180 minutes')
    .required('Required'),
  courseId: Yup.string().required('Required'),
  batchId: Yup.string().required('Required'),
  instructorEmail: Yup.string()
    .email('Invalid email format')
    .required('Instructor email is required'),
  recurrence: Yup.string()
    .oneOf(['once', 'daily'], 'Invalid recurrence type')
    .required('Required'),
  endDate: Yup.date().nullable().test(
    'endDate-required-for-daily',
    'End date is required for daily classes',
    function(value) {
      const { recurrence, startTime } = this.parent;
      
      if (recurrence === 'daily') {
        if (!value) return false; // End date is required
        
        // Check if end date is after start time
        if (startTime && value <= startTime) {
          return this.createError({
            message: 'End date must be after start time'
          });
        }
      }
      
      return true;
    }
  )
});

const LiveClassForm = ({ onSuccess, initialData, mode = 'create' }) => {
  const { data: batches } = useGetIdAndBatchNamesQuery();
  const { courses } = useCourses();

  const [createMeeting, { isLoading: isCreating }] = useCreateMeetingMutation();
  const [updateMeeting, { isLoading: isUpdating }] = useUpdateMeetingMutation();

  const isLoading = isCreating || isUpdating;
  const isEditMode = mode === 'edit';

  const initialValues = isEditMode
    ? {
        title: initialData.title,
        startTime: initialData.startTime,
        duration: initialData.duration,
        courseId: initialData.courseId,
        batchId: initialData.batchId,
        instructorEmail: initialData.instructorEmail || '',
        recurrence: initialData.recurrence || 'once',
        endDate: initialData.endDate || ''
      }
    : {
        title: '',
        startTime: '',
        duration: 60,
        courseId: '',
        batchId: '',
        instructorEmail: '',
        recurrence: 'once',
        endDate: ''
      };

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
            <h3 className="mb-0 fw-bold fs-2xl text-dark">{isEditMode ? 'Edit Live Class' : 'Schedule Live Class'}</h3>
            
              <X onClick={onSuccess} className='text-dark' />
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
                onSubmit={async (values, { resetForm }) => {
                  try {
                    if (isEditMode) {
                      await updateMeeting({ id: initialData._id, ...values }).unwrap();
                      toast.success('Live class updated successfully');
                    } else {
                      await createMeeting(values).unwrap();
                      toast.success('Live class created successfully');
                      resetForm();
                    }
                    onSuccess?.();
                  } catch (error) {
                    toast.error(
                      error.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} live class`
                    );
                  }
                }}
              >
                {({ errors, touched, values, setFieldValue }) => (
                  <Form className="p-4">
                    {/* Title */}
                    <div className="form-group mb-3">
                      <label htmlFor="title" className="form-label fw-medium text-dark mb-2">Title</label>
                      <Field
                        name="title"
                        type="text"
                        className={`form-control rounded-lg p-3 border ${errors.title && touched.title ? 'border-error' : 'border'}`}
                        placeholder="Enter class title"
                      />
                      {errors.title && touched.title && (
                        <div className="text-error fs-sm mt-1">{errors.title}</div>
                      )}
                    </div>

                    {/* Recurrence Type */}
                    <div className="form-group mb-3">
                      <label htmlFor="recurrence" className="form-label fw-medium text-dark mb-2">Class Type</label>
                      <Field
                        as="select"
                        name="recurrence"
                        className={`form-select rounded-lg p-3 border ${errors.recurrence && touched.recurrence ? 'border-error' : 'border'}`}
                      >
                        <option value="once">One-time Class</option>
                        <option value="daily">Daily Recurring Class</option>
                      </Field>
                      {errors.recurrence && touched.recurrence && (
                        <div className="text-error fs-sm mt-1">{errors.recurrence}</div>
                      )}
                    </div>

                    {/* Start Time */}
                    <div className="form-group mb-3">
                      <label htmlFor="startTime" className="form-label fw-medium text-dark mb-2">
                        {values.recurrence === 'daily' ? 'First Class Start Time' : 'Start Time'}
                      </label>
                      <Field
                        name="startTime"
                        type="datetime-local"
                        className={`form-control rounded-lg p-3 border ${errors.startTime && touched.startTime ? 'border-error' : 'border'}`}
                      />
                      {errors.startTime && touched.startTime && (
                        <div className="text-error fs-sm mt-1">{errors.startTime}</div>
                      )}
                    </div>

                    {/* End Date for Daily Recurrence */}
                    {values.recurrence === 'daily' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mb-3"
                      >
                        <div className="form-group">
                          <label htmlFor="endDate" className="form-label fw-medium text-dark mb-2">Recurrence End Date</label>
                          <Field
                            name="endDate"
                            type="date"
                            className={`form-control rounded-lg p-3 border ${errors.endDate && touched.endDate ? 'border-error' : 'border'}`}
                            min={values.startTime ? new Date(values.startTime).toISOString().split('T')[0] : ''}
                          />
                          {errors.endDate && touched.endDate && (
                            <div className="text-error fs-sm mt-1">{errors.endDate}</div>
                          )}
                          <div className="text-muted fs-sm mt-1">
                            Daily classes will be created until this date
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Duration */}
                    <div className="form-group mb-3">
                      <label htmlFor="duration" className="form-label fw-medium text-dark mb-2">Duration (minutes)</label>
                      <Field
                        name="duration"
                        type="number"
                        className={`form-control rounded-lg p-3 border ${errors.duration && touched.duration ? 'border-error' : 'border'}`}
                        min="15"
                        max="180"
                      />
                      {errors.duration && touched.duration && (
                        <div className="text-error fs-sm mt-1">{errors.duration}</div>
                      )}
                    </div>

                    {/* Course */}
                    <div className="form-group mb-3">
                      <label htmlFor="courseId" className="form-label fw-medium text-dark mb-2">Course</label>
                      <Field
                        as="select"
                        name="courseId"
                        className={`form-select rounded-lg p-3 border ${errors.courseId && touched.courseId ? 'border-error' : 'border'}`}
                      >
                        <option value="">Select Course</option>
                        {courses?.map(course => (
                          <option key={course._id} value={course._id}>
                            {course.name}
                          </option>
                        ))}
                      </Field>
                      {errors.courseId && touched.courseId && (
                        <div className="text-error fs-sm mt-1">{errors.courseId}</div>
                      )}
                    </div>

                    {/* Batch */}
                    <div className="form-group mb-3">
                      <label htmlFor="batchId" className="form-label fw-medium text-dark mb-2">Batch</label>
                      <Field
                        as="select"
                        name="batchId"
                        className={`form-select rounded-lg p-3 border ${errors.batchId && touched.batchId ? 'border-error' : 'border'}`}
                      >
                        <option value="">Select Batch</option>
                        {batches?.map(batch => (
                          <option key={batch._id} value={batch._id}>
                            {batch.batchName}
                          </option>
                        ))}
                      </Field>
                      {errors.batchId && touched.batchId && (
                        <div className="text-error fs-sm mt-1">{errors.batchId}</div>
                      )}
                    </div>

                    {/* Instructor Email */}
                    <div className="form-group mb-3">
                      <label htmlFor="instructorEmail" className="form-label fw-medium text-dark mb-2">Instructor Email</label>
                      <Field
                        name="instructorEmail"
                        type="email"
                        className={`form-control rounded-lg p-3 border ${errors.instructorEmail && touched.instructorEmail ? 'border-error' : 'border'}`}
                        placeholder="instructor@example.com"
                      />
                      {errors.instructorEmail && touched.instructorEmail && (
                        <div className="text-error fs-sm mt-1">{errors.instructorEmail}</div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="btn btn-primary w-100 p-3 rounded-lg fw-semibold mt-3"
                      disabled={isLoading}
                      style={{ minHeight: '50px' }}
                    >
                      {isLoading ? (
                        <span className="d-flex align-items-center justify-content-center">
                          <span className="spinner-border spinner-border-sm me-2" />
                          {isEditMode ? 'Updating...' : 'Creating...'}
                        </span>
                      ) : (
                        isEditMode ? 'Update Live Class' : 'Create Live Class'
                      )}
                    </button>

                    {/* Info Message for Daily Classes */}
                    {values.recurrence === 'daily' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-light border border-primary rounded-lg p-3 mt-3"
                      >
                        <div className="text-primary fs-sm d-flex align-items-center">
                          <i className="fas fa-info-circle me-2"></i>
                          Daily classes will be created at the same time each day until the end date.
                        </div>
                      </motion.div>
                    )}
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

export default LiveClassForm;