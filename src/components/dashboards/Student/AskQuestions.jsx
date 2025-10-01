import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AskQuestions = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      course: '',
      subject: '',
      question: '',
      urgency: 'normal'
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      course: Yup.string().required('Course selection is required'),
      subject: Yup.string().required('Subject is required'),
      question: Yup.string().required('Question is required').min(10, 'Question must be at least 10 characters'),
      urgency: Yup.string().oneOf(['low', 'normal', 'high'], 'Invalid urgency level')
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      // Simulate sending email
      setTimeout(() => {
        alert('Your question has been sent! An instructor will respond within 24 hours.');
        resetForm();
        setSubmitting(false);
      }, 1000);
    },
  });

  const courses = [
    { id: '1', name: 'Advanced JavaScript Live Course' },
    { id: '2', name: 'Machine Learning Fundamentals' },
    { id: '3', name: 'UI/UX Design Masterclass' },
    { id: '4', name: 'React Native Mobile Development' }
  ];

  return (
    <div className="component-container">
      <div className="component-header">
        <h1>Ask Questions</h1>
        <p>Get help from our expert instructors</p>
      </div>

      <div className="question-form-container">
        <form onSubmit={formik.handleSubmit} className="question-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className={formik.touched.name && formik.errors.name ? 'error' : ''}
                placeholder="Enter your full name"
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="error-message">{formik.errors.name}</div>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={formik.touched.email && formik.errors.email ? 'error' : ''}
                placeholder="Enter your email"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error-message">{formik.errors.email}</div>
              ) : null}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="course">Course</label>
              <select
                id="course"
                name="course"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.course}
                className={formik.touched.course && formik.errors.course ? 'error' : ''}
              >
                <option value="">Select a course</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
              {formik.touched.course && formik.errors.course ? (
                <div className="error-message">{formik.errors.course}</div>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="urgency">Urgency</label>
              <select
                id="urgency"
                name="urgency"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.urgency}
                className={formik.touched.urgency && formik.errors.urgency ? 'error' : ''}
              >
                <option value="low">Low (Within 3 days)</option>
                <option value="normal">Normal (Within 24 hours)</option>
                <option value="high">High (ASAP - Live session related)</option>
              </select>
              {formik.touched.urgency && formik.errors.urgency ? (
                <div className="error-message">{formik.errors.urgency}</div>
              ) : null}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.subject}
              className={formik.touched.subject && formik.errors.subject ? 'error' : ''}
              placeholder="Brief subject of your question"
            />
            {formik.touched.subject && formik.errors.subject ? (
              <div className="error-message">{formik.errors.subject}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="question">Your Question</label>
            <textarea
              id="question"
              name="question"
              rows="6"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.question}
              className={formik.touched.question && formik.errors.question ? 'error' : ''}
              placeholder="Describe your question in detail. Include any error messages, code snippets, or specific concepts you're struggling with."
            />
            {formik.touched.question && formik.errors.question ? (
              <div className="error-message">{formik.errors.question}</div>
            ) : null}
            <div className="char-count">{formik.values.question.length}/1000</div>
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Sending...' : 'Send Question'}
          </button>
        </form>

        <div className="support-info">
          <h3>Quick Support Options</h3>
          <div className="support-options">
            <div className="support-item">
              <div className="support-icon">💬</div>
              <div className="support-content">
                <h4>Live Chat</h4>
                <p>Get immediate help during business hours (9 AM - 6 PM)</p>
              </div>
            </div>
            <div className="support-item">
              <div className="support-icon">📞</div>
              <div className="support-content">
                <h4>Emergency Support</h4>
                <p>For urgent live session issues: support@example.com</p>
              </div>
            </div>
            <div className="support-item">
              <div className="support-icon">📚</div>
              <div className="support-content">
                <h4>Knowledge Base</h4>
                <p>Check our FAQ for common questions and solutions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

<style>{`  .question-form-container {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
        }
        
        .question-form {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #333;
        }
        
        input, select, textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
          transition: border-color 0.2s ease;
        }
        
        input:focus, select:focus, textarea:focus {
          outline: none;
          border-color: #6E8AFA;
          box-shadow: 0 0 0 3px rgba(110, 138, 250, 0.1);
        }
        
        input.error, select.error, textarea.error {
          border-color: #FF6B6B;
        }
        
        .error-message {
          color: #FF6B6B;
          font-size: 0.85rem;
          margin-top: 0.25rem;
        }
        
        .char-count {
          text-align: right;
          font-size: 0.85rem;
          color: #666;
          margin-top: 0.25rem;
        }
        
        .submit-btn {
          background: linear-gradient(135deg, #6E8AFA 0%, #8A6EFA 100%);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          width: 100%;
          transition: all 0.2s ease;
        }
        
        .submit-btn:hover:not(:disabled) {
          box-shadow: 0 4px 12px rgba(110, 138, 250, 0.4);
          transform: translateY(-1px);
        }
        
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .support-info {
          background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%);
          padding: 1.5rem;
          border-radius: 12px;
        }
        
        .support-info h3 {
          margin: 0 0 1.5rem;
          color: #1a1a1a;
          text-align: center;
        }
        
        .support-options {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .support-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem;
          background: white;
          border-radius: 8px;
          border-left: 3px solid #6E8AFA;
        }
        
        .support-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
        }
        
        .support-content h4 {
          margin: 0 0 0.5rem;
          color: #1a1a1a;
        }
        
        .support-content p {
          margin: 0;
          color: #666;
          font-size: 0.9rem;
        }
        
        @media (max-width: 768px) {
          .question-form-container {
            grid-template-columns: 1fr;
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
        }`}</style>
   
    </div>
  );
};

export default AskQuestions;