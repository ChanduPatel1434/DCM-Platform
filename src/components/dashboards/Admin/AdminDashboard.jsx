import React from "react";
import PendingRequestsCard from "../Extras/PendingRequestsCard";
import AssignWorkCard from "../Extras/AssignWorkCard";
import CoursesCard from "../Extras/CoursesCard";
import UsersCard from "../Extras/UsersCard";
import QuickActionsCard from "../Extras/QuickActionsCard";

const AdminDashboardContent = () => {
  return (
    <div className="container my-4">
      
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

    </div>
  );
};

export default AdminDashboardContent;
