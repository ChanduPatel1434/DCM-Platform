import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Topbar from "./Topbar/Topbar";
import useAuthCheck from "../../hooks/useAuthCheck";
import Loader from "./common/Loader"; // Optional: your custom loader component

const Dashboard = () => {
  const { isChecking } = useAuthCheck();

  if (isChecking) return <Loader message="Authenticating user..." />;

  return (
    <div id="app-layout" className="dashboard-container">
      <Topbar />
      <Sidebar />
      <main className="dashboard-content">
        <Suspense fallback={<Loader message="Loading module..." />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default Dashboard;