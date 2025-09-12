import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useCourses } from '../../../../hooks/useCourses';
import {
  useCreateMeetingMutation,
  useUpdateMeetingMutation
} from '../../../../Services/admin/zoomService';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useGetIdAndBatchNamesQuery } from '../../../../Services/admin/batchdetailsService';

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
      }
    : {
        title: '',
        startTime: '',
        duration: 60,
        courseId: '',
        batchId: '',
        instructorEmail: '',
      };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="modal-body p-0"
      style={{
        maxHeight: '80vh',
        overflowY: 'auto',
        borderRadius: '0.5rem',
        backgroundColor: '#fff',
      }}
    >
      <div className="p-4 border-bottom d-flex justify-content-between align-items-center sticky-top bg-white z-1">
        <h3 className="mb-0">{isEditMode ? 'Edit Live Class' : 'Schedule Live Class'}</h3>
        <button type="button" className="btn-close" onClick={onSuccess} />
      </div>

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
        {({ errors, touched }) => (
          <Form className="p-4">
            {/* Title */}
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <Field
                name="title"
                type="text"
                className={`form-control ${errors.title && touched.title ? 'is-invalid' : ''}`}
              />
              {errors.title && touched.title && (
                <div className="invalid-feedback">{errors.title}</div>
              )}
            </div>

            {/* Start Time */}
            <div className="mb-3">
              <label htmlFor="startTime" className="form-label">Start Time</label>
              <Field
                name="startTime"
                type="datetime-local"
                className={`form-control ${errors.startTime && touched.startTime ? 'is-invalid' : ''}`}
              />
              {errors.startTime && touched.startTime && (
                <div className="invalid-feedback">{errors.startTime}</div>
              )}
            </div>

            {/* Duration */}
            <div className="mb-3">
              <label htmlFor="duration" className="form-label">Duration (minutes)</label>
              <Field
                name="duration"
                type="number"
                className={`form-control ${errors.duration && touched.duration ? 'is-invalid' : ''}`}
              />
              {errors.duration && touched.duration && (
                <div className="invalid-feedback">{errors.duration}</div>
              )}
            </div>

            {/* Course */}
            <div className="mb-3">
              <label htmlFor="courseId" className="form-label">Course</label>
              <Field
                as="select"
                name="courseId"
                className={`form-select ${errors.courseId && touched.courseId ? 'is-invalid' : ''} text-dark`}
              >
                <option value="">Select Course</option>
                {courses?.map(course => (
                  <option key={course._id} value={course._id}>
                    {course.name}
                  </option>
                ))}
              </Field>
              {errors.courseId && touched.courseId && (
                <div className="invalid-feedback">{errors.courseId}</div>
              )}
            </div>

            {/* Batch */}
            <div className="mb-3">
              <label htmlFor="batchId" className="form-label">Batch</label>
              <Field
                as="select"
                name="batchId"
                className={`form-select ${errors.batchId && touched.batchId ? 'is-invalid' : ''}`}
              >
                <option value="">Select Batch</option>
                {batches?.map(batch => (
                  <option key={batch._id} value={batch._id}>
                    {batch.batchName}
                  </option>
                ))}
              </Field>
              {errors.batchId && touched.batchId && (
                <div className="invalid-feedback">{errors.batchId}</div>
              )}
            </div>

            {/* Instructor Email */}
            <div className="mb-3">
              <label htmlFor="instructorEmail" className="form-label">Instructor Email</label>
              <Field
                name="instructorEmail"
                type="email"
                className={`form-control ${errors.instructorEmail && touched.instructorEmail ? 'is-invalid' : ''}`}
              />
              {errors.instructorEmail && touched.instructorEmail && (
                <div className="invalid-feedback">{errors.instructorEmail}</div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-100 mt-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <span>
                  <span className="spinner-border spinner-border-sm me-2" />
                  {isEditMode ? 'Updating...' : 'Creating...'}
                </span>
              ) : (
                isEditMode ? 'Update Live Class' : 'Create Live Class'
              )}
            </button>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default LiveClassForm;