import { useEffect } from "react";
import { useLazyGetassignedStudentsQuery } from "../../../Services/admin/batchAssignServices";
import StudentTable from "./StudentTable";
import { useSelector } from "react-redux";
import Loader from "../common/Loader";


const AssignedStudents = () => {
  
  const [trigger, { isLoading, isSuccess, data }] = useLazyGetassignedStudentsQuery();

  useEffect(() => {
    trigger()
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }, [trigger]);
  const {courseNames}=useSelector(state=>state.auth)

  return (
    <div>
      <h2>Assigned Students</h2>

      {/* ⏳ Loading State */}
      {isLoading && <Loader message="Fetching assigned students..." />}
      

      {/* ✅ Success & Data Loaded */}
      {isSuccess && data?.students?.length > 0 && (
        <StudentTable
          students={data.students}
          availableCourses={courseNames}
          showAssignControls={false}
          showBatchColumn={true}
        />
      )}

      {/* 📭 No Data Fallback */}
      {isSuccess && data?.students?.length === 0 && (
        <p>No assigned students found.</p>
      )}
    </div>
  );
};

export default AssignedStudents;