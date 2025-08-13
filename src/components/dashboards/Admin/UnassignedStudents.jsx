import { useEffect, } from "react";
import StudentTable from "./StudentTable";
import {
  useAssignStudentsToBatchMutation,
  useLazyUnassignedStudentsQuery,
} from "../../../Services/admin/batchAssignServices";
import { useSelector } from "react-redux";
import Loader from "../common/Loader";
import { useLazyGetUnassignedEnrollmentsQuery } from "../../../Services/admin/enrollFormServices";

const UnassignedStudents = () => {
  const [triggerAssign] = useAssignStudentsToBatchMutation();


  // const [
  //   triggerUnassigned,
  //   {
  //     data: unassignedData,
  //     isLoading: isUnassignedLoading,
  //     isError: isUnassignedError,
  //     isSuccess: isUnassignedSuccess,
  //     error: unassignedError,
  //   },
  // ] = useLazyUnassignedStudentsQuery();
  const [
    triggerUnassignedEnrollments,
    {
      data: unassignedData,
      isLoading: isUnassignedLoading,
      isError: isUnassignedError,
      isSuccess: isUnassignedSuccess,
      error: unassignedError,
    
  }]=useLazyGetUnassignedEnrollmentsQuery()



  const { courseNames, batchList } = useSelector(state => state.auth)


  useEffect(() => {
    // Fetch both unassigned students and courses in parallel
    triggerUnassignedEnrollments().unwrap()
      .then((res) => console.log("Unassigned students:", res))
      .catch((err) => console.error("Unassigned fetch failed:", err));


  }, []);

  const handleAssign = async (payload) => {
    try {
      const result = await triggerAssign(payload).unwrap();
      console.log("Assigned data:", result);
    } catch (err) {
      console.error("Failed to assign students:", err);
    }
  };



  if (isUnassignedLoading) return <Loader message="Fetching unassigned students..." />;
  if (isUnassignedError)
    return <p>Error: {(unassignedError)?.message}</p>;

  if (isUnassignedSuccess && unassignedData?.students?.length === 0)
    return <p>No unassigned students found.</p>;

  return (
    <div>
      <h2>Unassigned Students</h2>
      {/* {isUnassignedSuccess && (
        <StudentTable
          students={unassignedData.students}
          availableCourses={courseNames}
          availableBatches={batchList}
          showAssignControls={true}
          onAssignBatch={handleAssign}
          onRemove={(rows) => console.log("Remove:", rows)}
        />
      )} */}
    </div>
  );
};

export default UnassignedStudents;