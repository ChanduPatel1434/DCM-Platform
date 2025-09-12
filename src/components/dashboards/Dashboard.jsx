import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Topbar from "./Topbar/Topbar";
import useAuthCheck from "../../hooks/useAuthCheck";
import Loader from "./common/Loader"; // Optional: your custom loader component
import { ModalProvider } from "./Admin/Modals/ModalContext";

const Dashboard = () => {
  const { isChecking } = useAuthCheck();

  if (isChecking) return <Loader message="Authenticating user..." />;

  return (
    <div id="app-layout" className="dashboard-container">
      <Topbar />
      <Sidebar />
      <main className="dashboard-content p-0 m-0">
        <Suspense fallback={<Loader message="Loading module..." />}>
          <ModalProvider>
            <Outlet />
          </ModalProvider>
        </Suspense>
      </main>
    </div>
  );
};

export default Dashboard;