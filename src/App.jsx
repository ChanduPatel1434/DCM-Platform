
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import LiveChatButton from "./components/LiveChatButton";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function App() {
  return  <>
     <Navbar/>
    <Outlet/>
    <LiveChatButton/>
       <ToastContainer position="top-right" autoClose={3000} />

    
    </>

}

export default App;
