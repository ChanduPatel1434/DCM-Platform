import React from "react";
import { Carousel } from "react-bootstrap";
import PendingRequestsCard from "../Extras/PendingRequestsCard";
import AssignWorkCard from "../Extras/AssignWorkCard";
import CoursesCard from "../Extras/CoursesCard";
import UsersCard from "../Extras/UsersCard";
import QuickActionsCard from "../Extras/QuickActionsCard";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminDashboardContent = () => {
  return (
    <div className="container my-4">

      {/* --- Text-only Carousel --- */}
      <Carousel 
        className="mb-4"
        controls
        indicators
        interval={4000}
        fade
      >
        <Carousel.Item>
          <div className="d-flex flex-column justify-content-center align-items-center" style={{height: '300px', backgroundColor: '#4356e2', color: 'white'}}>
            <h3>Welcome to the Admin Panel</h3>
            <p>Manage system tasks, monitor requests, and oversee users efficiently from your all-in-one dashboard.</p>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="d-flex flex-column justify-content-center align-items-center" style={{height: '300px', backgroundColor: '#6c757d', color: 'white'}}>
            <h3>Pending Requests Overview</h3>
            <p>Review incoming requests, assign tasks, and keep your workflow organized. Stay responsive to new actions.</p>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="d-flex flex-column justify-content-center align-items-center" style={{height: '300px', backgroundColor: '#198754', color: 'white'}}>
            <h3>Assign & Track Work</h3>
            <p>Easily assign tasks to team members, follow progress, and update priorities in real time.</p>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="d-flex flex-column justify-content-center align-items-center" style={{height: '300px', backgroundColor: '#0d6efd', color: 'white'}}>
            <h3>Courses at a Glance</h3>
            <p>View, manage, and update your platform’s course offerings. Ensure smooth course administration for all users.</p>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="d-flex flex-column justify-content-center align-items-center" style={{height: '300px', backgroundColor: '#fd7e14', color: 'white'}}>
            <h3>User Activity Insights</h3>
            <p>Monitor user stats, activity levels, and engagement trends. Gain insights to improve your platform’s experience.</p>
          </div>
        </Carousel.Item>
      </Carousel>

      {/* --- Statistics Row (NEW) --- */}
      <div className="row g-4 mb-4 text-center">
        <div className="col-6 col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">Daily Logins</h5>
              <p className="card-text display-6">52</p>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5 className="card-title">Active Courses</h5>
              <p className="card-text display-6">9</p>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card bg-warning text-dark">
            <div className="card-body">
              <h5 className="card-title">New Registrations</h5>
              <p className="card-text display-6">18</p>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card bg-secondary text-white">
            <div className="card-body">
              <h5 className="card-title">Feedback</h5>
              <p className="card-text display-6">4</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Stats Row --- */}
      <div className="row g-4 mb-4 text-center">
        <div className="col-6 col-md-3">
          <PendingRequestsCard count={13} />
        </div>
        <div className="col-6 col-md-3">
          <AssignWorkCard count={8} />
        </div>
        <div className="col-6 col-md-3">
          <CoursesCard count={12} />
        </div>
        <div className="col-6 col-md-3">
          <UsersCard count={240} />
        </div>
      </div>

      {/* --- Quick Actions --- */}
      <QuickActionsCard />

      {/* --- Recent Activities (NEW) --- */}
      <div className="card mb-4">
        <div className="card-header bg-light">Recent Activities</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Admin added a new user (Alice).</li>
          <li className="list-group-item">Student batch "Alpha 2025" was created.</li>
          <li className="list-group-item">Course "React Basics" updated by Admin.</li>
          <li className="list-group-item">8 assignments graded in "Math 101".</li>
        </ul>
      </div>

      {/* --- Tasks & Reminders (NEW) --- */}
      <div className="card mb-4">
        <div className="card-header bg-light">Tasks & Reminders</div>
        <div className="card-body">
          <ul className="list-unstyled mb-0">
            <li>✅ Approve pending instructor profile</li>
            <li>⏰ Review pending requests</li>
            <li>📝 Prepare monthly report</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
