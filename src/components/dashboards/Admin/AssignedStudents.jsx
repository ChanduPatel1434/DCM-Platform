
import { useSelector } from "react-redux";
import Loader from "../common/Loader";
import { useGetAssignedEnrollmentsQuery } from "../../../Services/admin/assignService";
import GenericTable from "../Tables/GenericTable";
import { flattenEnrollments } from "../../../utils/formatchange";


const AssignedStudents = () => {

const {
  data: assignedData,
  isLoading,
  isSuccess,
  refetch
} = useGetAssignedEnrollmentsQuery(undefined, {
  refetchOnMountOrArgChange: true
}); 
 console.log(assignedData, "hiknkjdfn")

  
 const results=flattenEnrollments(assignedData?.enrollments)
 console.log("resultsssssss",results)



  return (
    <div>
      <h2>Assigned Students</h2>

      {/* ⏳ Loading State */}
      {isLoading && <Loader message="Fetching assigned students..." />}


      {/* ✅ Success & Data Loaded */}
      {/* <button onClick={() => refetch()}>Refresh</button> */}
   {isSuccess && assignedData?.enrollments?.length > 0 && (
<GenericTable
  data={results}
  showAssignControls={false}
  showBatchColumn={true}
  isAssignedView={true}
/>

)}

      {/* 📭 No Data Fallback */}
      {isSuccess && assignedData?.students?.length === 0 && (
        <p>No assigned students found.</p>
      )}
    </div>
  );
};

export default AssignedStudents;