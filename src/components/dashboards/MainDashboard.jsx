import { useSelector } from "react-redux";
import AdminDashboard from "./Admin/AdminDashboard";
import StudentDashboard from "./Student/StudentDashboard";


const Maindashboard = () => {
   const{user,loading}= useSelector(state=>state.auth)
    
    

  
return (
    <div className="content-page p-0 relx ">
        <div className="content ">
            {
                loading ? (
                    <div className="dashboard-loader">
                        {/* You can style this div or use a spinner component */}
                        <h2>Loading your dashboard...</h2>
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
    </div>
); 
}

export default Maindashboard;
