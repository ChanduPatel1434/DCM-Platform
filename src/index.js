import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './store/store';

// Public Pages
import HomePage from './components/HomePage';
import AboutUs from './components/AboutUs';
import ContactUs from './components/Contact';
import Trainings from './components/Trainings';
import ManPower from './components/ManPower';
import Consultancy from './components/ConsultantService';
import CourseDetail from './components/CoursesDetails';
import Login from './components/Login';
import Signup from './components/Signup';
import ErrorPage from './components/ErrorPage';

// Dashboard (Student)
import Dashboard from './components/dashboards/Dashboard';
import Maindashboard from './components/dashboards/MainDashboard';
import Mycourses from './components/dashboards/Student/MyCourses';
import Setting from './components/dashboards/Student/Settings';
import Syllabus from './components/dashboards/Student/Syllabus';
import Calendar from './components/dashboards/Student/Calender';
import EnrollForm from './components/dashboards/Student/EnrollForm';

// Dashboard (Admin)

import AssignStudents from './components/dashboards/Admin/AssignStudents';
import UnassignedStudents from './components/dashboards/Admin/UnassignedStudents';
import AssignedStudents from './components/dashboards/Admin/AssignedStudents';
import AddCourseForm from './components/dashboards/Admin/Addcourse/AddCourse';
import Courses from './components/dashboards/Admin/Addcourse/Courses';
import CourseTable from './components/dashboards/Admin/Addcourse/CoursesTable';
import Batch from './components/dashboards/Admin/Batchs/Batch';
import CreateBatch from './components/dashboards/Admin/Batchs/CreateBatch';
import BatchStudentViewer from './components/dashboards/Admin/Batchs/AllBatchs';
import AddAdmin from './components/dashboards/Admin/AddAdmin/AddAdmin';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: 'trainings', element: <Trainings /> },
      { path: 'trainings/:category/:subcategory?', element: <CourseDetail /> },
      { path: 'contact-us', element: <ContactUs /> },
      { path: 'about-us', element: <AboutUs /> },
      { path: 'man-power', element: <ManPower /> },
      { path: 'Consultancy', element: <Consultancy /> },
      { path: 'login', element: <Login /> },
      { path: 'sign-up', element: <Signup /> },
      { path: '*', element: <ErrorPage /> }
    ]
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      { path: '', element: <Maindashboard /> },
      { path: 'mycourses', element: <Mycourses /> },
      { path: 'settings', element: <Setting /> },
      { path: 'syllabus', element: <Syllabus /> },
      { path: 'calendar', element: <Calendar /> },
      { path: 'enroll', element: <EnrollForm /> },

      // Admin routes
      { path: 'addadmin', element: <AddAdmin /> },
      {
        path: 'students',
        element: <AssignStudents />,
        children: [
          { path: '', element: <UnassignedStudents /> },
          { path: 'assigned', element: <AssignedStudents /> }
        ]
      },
      {
        path: 'courses',
        element: <Courses />,
        children: [
          { path: '', element: <CourseTable /> },
          { path: 'addcourse', element: <AddCourseForm /> }
        ]
      },
      {
        path: 'batchs',
        element: <Batch />,
        children: [
          { path: '', element: <CreateBatch /> },
          { path: 'allbatchs', element: <BatchStudentViewer /> }
        ]
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();