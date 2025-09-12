
import { Carousel } from "react-bootstrap";

import QuickActionsCard from "../Extras/QuickActionsCard";
import StatCard from "../Extras/StatCard";
import PaymentsList from "./Payments/TransactionTable";
import CreateMeetingButton from "./MeetingBtn/CreateMeetingBtn";
import LiveClassForm from "./LiveClass/LiveClassForm";

import QuickActions from "../Extras/QuickActions";
import { ModalProvider } from "./Modals/ModalContext";


const AdminDashboard = () => {
    const statsData = [
    { icon: "👥", label: "Users", count: 120, color: "primary" },
    { icon: "📚", label: "Courses", count: 15, color: "success" },
    { icon: "📦", label: "Batches", count: 8, color: "warning" },
    { icon: "📝", label: "Assignments", count: 42, color: "danger" },
  ];

 

  return (
    <div className="container my-4">
      
      
       <ModalProvider>
         <Carousel 
        className="mb-4"
        controls
        indicators
        interval={1000}
        fade
      >
        <Carousel.Item>
          <div className="d-flex flex-column justify-content-center align-items-center" style={{height: '300px', backgroundColor: '#06070fff', color: 'white'}}>
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
     
      </Carousel>

     
       <QuickActions/>

      
    

      {/* --- Stats Row --- */}
      <div className="row">
            <div className="col-md-6">
        <QuickActionsCard />
    </div>

      <div className="col-md-6">
       <div className="row">
      {statsData.map((stat, idx) => (
        <div key={idx} className="col-12 col-sm-6 col-lg-6">
          <StatCard {...stat} />
        </div>
      ))}
    </div>

      </div>
      {/* <LiveClassForm/> */}

      {/* <CreateMeetingButton/> */}

      </div>
      {/* <PaymentsList/> */}
     {/* <div className="row g-4 mb-4 text-center">
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
      </div> */}

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
        </ModalProvider>
    </div>
  );
};

export default AdminDashboard;
