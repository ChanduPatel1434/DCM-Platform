import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import LiveChatButton from "./components/LiveChatButton";
import { Toaster } from 'react-hot-toast';
import { NotificationProvider } from './components/dashboards/notifications/notificationContext';

function App() {
  return <Outlet />;
}

export default App;