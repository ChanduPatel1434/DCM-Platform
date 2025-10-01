import { useSelector } from "react-redux";
import Loader from "../common/Loader";
import { useGetAssignedEnrollmentsQuery } from "../../../Services/admin/assignService";
import GenericTable from "../Tables/GenericTable";
import { flattenEnrollments } from "../../../utils/formatchange";

const AssignedStudents = () => {
  const {
    data: assignedData,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch
  } = useGetAssignedEnrollmentsQuery(undefined, {
    refetchOnMountOrArgChange: true
  }); 

  console.log(assignedData, "Assigned data");
  
  const results = flattenEnrollments(assignedData?.enrollments || []);
  console.log("Flattened results", results);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <Loader message="Loading assigned students data..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-danger d-flex align-items-center" role="alert">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        <div>
          <strong>Error loading data:</strong> {error?.data?.message || "Unknown error occurred"}
        </div>
        <button 
          onClick={() => refetch()} 
          className="btn btn-outline-danger btn-sm ms-3"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-5">
      {/* Header with Stats */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <p className="text-m">
            View  students who have been assigned to batches
          </p>
        </div>
        
        <div className="d-flex align-items-center gap-3">
          <div className="bg-light rounded-pill px-3 py-2">
            <span className="badge bg-success me-2">{results.length}</span>
            <span className="text-muted">Total Assigned</span>
          </div>
          <button 
            onClick={() => refetch()} 
            className="btn btn-outline-secondary btn-sm d-flex align-items-center"
          >
            <i className="bi bi-arrow-clockwise me-1"></i>
            Refresh
          </button>
        </div>
      </div>

      {/* Data Status Messages */}
      {isSuccess && assignedData?.enrollments?.length === 0 ? (
        <div className="text-center py-5">
          <div className="mb-4">
            <i className="bi bi-inbox display-1 text-muted"></i>
          </div>
          <h4 className="text-muted mb-3">No Assigned Students Found</h4>
          <p className="text-muted">Students will appear here once they are assigned to batches.</p>
          <button 
            onClick={() => refetch()} 
            className="btn btn-primary mt-2"
          >
            <i className="bi bi-arrow-clockwise me-1"></i>
            Check Again
          </button>
        </div>
      ) : isSuccess && assignedData?.enrollments?.length > 0 ? (
        <div className="card shadow-sm border-0">
          <div className="card-header bg-transparent border-bottom-0 py-3">
            <h5 className="mb-0 text-dark d-flex align-items-center">
              <i className="bi bi-table me-2"></i>
              Assigned Students Record
              <span className="badge bg-success ms-2">{results.length} students</span>
            </h5>
          </div>
          <div className="card-body p-0">
            <GenericTable
              data={results}
              showAssignControls={false}
              showBatchColumn={true}
              isAssignedView={true}
            />
          </div>
          <div className="card-footer bg-light border-top-0 py-3">
            <small className="text-muted">
              <i className="bi bi-info-circle me-1"></i>
              Showing {results.length} assigned student records
            </small>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AssignedStudents;