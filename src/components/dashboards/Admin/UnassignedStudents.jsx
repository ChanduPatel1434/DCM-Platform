import { useEffect, } from "react";
import { useSelector } from "react-redux";
import Loader from "../common/Loader";
import { useAssignStudentsToBatchMutation, useLazyGetUnassignedEnrollmentsQuery } from "../../../Services/admin/assignService";
import GenericTable from "../Tables/GenericTable";
import { flattenEnrollments, transformAssignmentPayload } from "../../../utils/formatchange";


const UnassignedStudents = () => {
  const [triggerAssign] = useAssignStudentsToBatchMutation();

  const [
    triggerUnassignedEnrollments,
    {
      data: unassignedData,
      isLoading: isUnassignedLoading,
      isError: isUnassignedError,
      isSuccess: isUnassignedSuccess,
      error: unassignedError,

    }] = useLazyGetUnassignedEnrollmentsQuery()



  const { courseNames, batchList } = useSelector(state => state.auth)
  const FilteredCourses = courseNames.map((course) => ({
    title: course.name,
    _id: course._id
  }))
 
  const FilteredBatch = batchList.map(({batchName ,_id}) => ({ title: batchName, _id: _id }))
 


  useEffect(() => {
    // Fetch  unassigned students 
    triggerUnassignedEnrollments().unwrap()
      .then((res) => console.log("Unassigned students:", res))
      .catch((err) => console.error("Unassigned fetch failed:", err));


  }, []);


  const handleAssign = async (payload) => {
    const transformedPayload = transformAssignmentPayload(payload);
    console.log(transformedPayload);
    try {
      const result = await triggerAssign(transformedPayload).unwrap();
      console.log("Assigned data:", result);
    } catch (err) {
      console.error("Failed to assign students:", err);
    }
  };

 
 const results=flattenEnrollments(unassignedData?.enrollments)
 console.log("resultsssssss",results)


  if (isUnassignedLoading) return <Loader message="Fetching unassigned students..." />;
  if (isUnassignedError)
    return <p>Error: {(unassignedError)?.message}</p>;

  if (isUnassignedSuccess && unassignedData?.enrollments?.length === 0)
    return <p>No unassigned students found.</p>;

  return (
    <div>
      <h2>Unassigned Students</h2>

      {
        isUnassignedSuccess && (
          <GenericTable 
            data={results}
            availableCourses={FilteredCourses}
            availableBatches={FilteredBatch}
            showAssignControls={true}
            showBatchColumn={true}
            onAssignBatch={handleAssign}
            isAssignedView={false}
            onRemove={(values) => console.log(values)}


          />

        )
      }

    </div>
  );
};

export default UnassignedStudents;