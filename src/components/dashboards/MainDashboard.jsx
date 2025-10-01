import { useSelector } from "react-redux";
import AdminDashboard from "./Admin/AdminDashboard";
import StudentDashboard from "./Student/StudentDashboard";
import Loader from "./common/Loader";


const Maindashboard = () => {
   const{user,loading}= useSelector(state=>state.auth)
    
    

  
return (
    
        <div>
            {
                loading ? (
                    <div>
                        {/* You can style this div or use a spinner component */}
                      <Loader message={"checking details"}/>
                    </div>
                ) : (
                    user?.role === 'student' ? (
                        <StudentDashboard />
                    ) : (
                        <AdminDashboard />
                        
                    )
                )
            }
        </div>
  
); 
}

export default Maindashboard;
