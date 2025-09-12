import { useEffect } from "react";
import Loader from "../common/Loader";
import { 
  useAssignStudentsToBatchMutation, 
  useLazyGetUnassignedEnrollmentsQuery 
} from "../../../Services/admin/assignService";
import GenericTable from "../Tables/GenericTable";
import { flattenEnrollments, transformAssignmentPayload } from "../../../utils/formatchange";
import { useCourses } from "../../../hooks/useCourses";
import { useGetIdAndBatchNamesQuery } from "../../../Services/admin/batchdetailsService";
import { toast } from "react-toastify";

const UnassignedStudents = () => {
  const { courses = [], isLoading: isCoursesLoading } = useCourses();
  const [triggerAssign, { isLoading: isAssigning }] = useAssignStudentsToBatchMutation();

  const [
    triggerUnassignedEnrollments,
    {
      data: unassignedData,
      isLoading: isUnassignedLoading,
      isError: isUnassignedError,
      isSuccess: isUnassignedSuccess,
      error: unassignedError,
    }
  ] = useLazyGetUnassignedEnrollmentsQuery();

  const { data: batches = [], isLoading: isBatchesLoading } = useGetIdAndBatchNamesQuery();

  const FilteredCourses = courses.map(course => ({
    title: course.name,
    _id: course._id
  }));

  const FilteredBatch = batches.map(({ batchName, _id }) => ({
    title: batchName,
    _id
  }));

  useEffect(() => {
    triggerUnassignedEnrollments()
      .unwrap()
      .catch(err => {
        console.error("Unassigned fetch failed:", err);
        toast.error("Failed to fetch unassigned students");
      });
  }, [triggerUnassignedEnrollments]);

  const handleAssign = async (payload) => {
    const transformedPayload = transformAssignmentPayload(payload);
    try {
      await triggerAssign(transformedPayload).unwrap();
      toast.success("Students assigned successfully");
      triggerUnassignedEnrollments(); // refresh list
    } catch (err) {
      console.error("Failed to assign students:", err);
      toast.error("Failed to assign students");
    }
  };

  const results = flattenEnrollments(unassignedData?.enrollments || []);

  // Combined loading state
  if (isUnassignedLoading || isCoursesLoading || isBatchesLoading) {
    return <Loader message="Loading data..." />;
  }

  if (isUnassignedError) {
    return <p className="text-danger">Error: {unassignedError?.message || "Unknown error"}</p>;
  }

  if (isUnassignedSuccess && results.length === 0) {
    return <p>No unassigned students found.</p>;
  }

  return (
    <div>
      <h2>Unassigned Students</h2>
      {isUnassignedSuccess && (
        <GenericTable
          data={results}
          availableCourses={FilteredCourses}
          availableBatches={FilteredBatch}
          showAssignControls
          showBatchColumn
          onAssignBatch={handleAssign}
          isAssignedView={false}
          onRemove={(values) => console.log(values)}
          isAssigning={isAssigning}
        />
      )}
    </div>
  );
};

export default UnassignedStudents;