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
import toast from "react-hot-toast";
import { BookOpen, GraduationCap, Users } from "lucide-react";

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
    triggerUnassignedEnrollments();
  }, [triggerUnassignedEnrollments]);

  const handleAssign = async (payload) => {
    const transformedPayload = transformAssignmentPayload(payload);
    console.log(payload,'iam data')
    console.log(transformedPayload,"transformedData")
    try {
      await triggerAssign(transformedPayload).unwrap();
      toast.success("Students assigned successfully");
      triggerUnassignedEnrollments(); // refresh list
    } catch (err) {
      console.error("Failed to assign students:", err);
      // Toast error is handled by the mutation automatically
    }
  };

  const results = flattenEnrollments(unassignedData?.enrollments || []);

  // Combined loading state
  if (isUnassignedLoading || isCoursesLoading || isBatchesLoading) {
    return <Loader message="Loading unassigned students data..." />;
  }

  if (isUnassignedError) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h4>Error loading data</h4>
        <p>{unassignedError?.data?.message || "Failed to load unassigned students"}</p>
        <button 
          onClick={() => triggerUnassignedEnrollments()}
          className="retry-btn"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (isUnassignedSuccess && results.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">👥</div>
        <h4>No Unassigned Students</h4>
        <p>All students have been assigned to batches.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Header Section */}
    
          <h5  className="text-primary">
            Assign  Enrolled Student  to batches
          </h5>
    
        <div className="text-danger ">
          <span className="mx-2">{results.length}</span>
          <span className="">Students waiting for assignment</span>
        </div>
     

      {/* Stats Cards */}
<div className="stats-grid">
  <div className="stat-card" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
    <div className="stat-content">
      <div className="stat-text">
        <h6>Total Unassigned</h6>
        <h4>{results.length}</h4>
      </div>
      <div className="stat-icon">
        <Users className="icon" />
      </div>
    </div>
  </div>
  
  <div className="stat-card" style={{background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
    <div className="stat-content">
      <div className="stat-text">
        <h6>Available Batches</h6>
        <h4>{FilteredBatch.length}</h4>
      </div>
      <div className="stat-icon">
        <BookOpen className="icon" />
      </div>
    </div>
  </div>
  
  <div className="stat-card" style={{background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}>
    <div className="stat-content">
      <div className="stat-text">
        <h6>Available Courses</h6>
        <h4>{FilteredCourses.length}</h4>
      </div>
      <div className="stat-icon">
        <GraduationCap className="icon" />
      </div>
    </div>
  </div>
</div>

      {/* Main Table */}
      {isUnassignedSuccess && (
        <div className="table-container">
          <div className="table-header">
            <h5>Student Assignment Panel</h5>
          </div>
          <div className="table-body">
            <GenericTable
              data={results}
              availableCourses={FilteredCourses}
              availableBatches={FilteredBatch}
              showAssignControls
        
              onAssignBatch={handleAssign}
              isAssignedView={false}
              onRemove={(values) => console.log(values)}
              isAssigning={isAssigning}
            />
          </div>
          <div className="table-footer">
            <div className="footer-content">
              <span>Select students and assign them to appropriate batches</span>
              {isAssigning && (
                <div className="assigning-indicator">
                  <div className="spinner"></div>
                  <span>Assigning students...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnassignedStudents;  