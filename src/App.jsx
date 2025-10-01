
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
const AppLayout = () => (
  <>
    <Navbar />
    <ScrollToTop />
    <Outlet />
    
  </>
);

export default AppLayout