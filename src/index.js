import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Tailwind here
import './App.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './store/store';
import Navbar from "./components/Navbar";
import LiveChatButton from "./components/LiveChatButton";
import { Toaster } from 'react-hot-toast';
import { NotificationProvider } from './components/dashboards/notifications/notificationContext';
import { Outlet } from "react-router-dom";

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

// Dashboard (Admin)
import AssignStudents from './components/dashboards/Admin/AssignStudents';
import UnassignedStudents from './components/dashboards/Admin/UnassignedStudents';
import AssignedStudents from './components/dashboards/Admin/AssignedStudents';
import Courses from './components/dashboards/Admin/Addcourse/Courses';
import AddAdmin from './components/dashboards/Admin/AddAdmin/AddAdmin';
import EmailVerification from './utils/EmailVerification';
import CourseList from './components/dashboards/Student/CoursesList';
import ForgotPassword from './components/Forgotpassword';
import BatchList from './components/dashboards/Admin/Batchs/AllBatchs';
import ChangePassword from './components/ChangePassword';

// Create a layout component for pages that need the full App structure
const AppLayout = () => (
  <>
    <Toaster position="top-right" />
    <NotificationProvider>
      <Navbar />
      <Outlet />
      <LiveChatButton />
    </NotificationProvider>
  </>
);

// Create a minimal layout for auth pages that don't need navbar/chat
const AuthLayout = () => (
  <>
    <Toaster position="top-right" />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />, // Uses navbar, chat, etc.
    children: [
      { path: '/', element: <HomePage /> },
      { path: 'trainings', element: <Trainings /> },
      { path: 'trainings/:category/:courseId?', element: <CourseDetail /> },
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
    path: '/',
    element: <AuthLayout />, // No navbar, no chat - just toast
    children: [
      { path: 'password-reset', element: <ForgotPassword /> },
      { path: 'reset-password', element: <ChangePassword /> },
      { path: 'verify-email', element: <EmailVerification /> },
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
      { path: 'allcourses', element: <CourseList /> },

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
      },
      {
        path: 'batchs',
        element: <BatchList />,
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