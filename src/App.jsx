
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import LiveChatButton from "./components/LiveChatButton";


function App() {
  return  <>
     <Navbar/>
    <Outlet/>
    <LiveChatButton/>
    
    </>

}

export default App;
