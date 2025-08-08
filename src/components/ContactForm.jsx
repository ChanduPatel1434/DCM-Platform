import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import emailjs from '@emailjs/browser';
import { useEffect, useRef } from 'react';



const ContactUsForm = () => {
  

 const formRef = useRef();

  useEffect(() => {
    emailjs.init('od1CTu-LgoQF9mwOM'); // Initialize with public key
  }, []);

  const sendEmail = async (values, actions) => {
    try {
      const res = await emailjs.sendForm(
        'service_zma8afc',
        'template_bq6d9xd',
        formRef.current // 👈 Using ref here
      );
      console.log('SUCCESS!', res.text);
      actions.resetForm();
    } catch (error) {
      console.log('FAILED...', error.text);
    }
    actions.setSubmitting(false);
  };







  return (
    <Formik
      initialValues={{ name: '', email: '', message: '' }}
      validationSchema={Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        message: Yup.string().required('Message is required'),
      })}
      onSubmit={sendEmail}
    >
      {({ isSubmitting }) => (
        <Form className="contact-us-form" ref={formRef}>
          <div className="form-group">
            <Field name="name" type="text" className="form-control" placeholder="Enter name" />
            <ErrorMessage name="name" component="div" className="text-danger small" />
          </div>
          <div className="form-group">
            <Field name="email" type="email" className="form-control" placeholder="Enter email" />
            <ErrorMessage name="email" component="div" className="text-danger small" />
          </div>
          <div className="form-group">
            <Field
              name="message"
              as="textarea"
              className="form-control"
              rows="6"
              placeholder="Your message"
            />
            <ErrorMessage name="message" component="div" className="text-danger small" />
          </div>
          <button type="submit" className="btn secondary-solid-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactUsForm;