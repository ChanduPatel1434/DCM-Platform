import React, { useState } from "react";
import {
  useGetIdAndBatchNamesQuery,
  useDeleteBatchMutation,
  useGetBatchstudentsQuery,
} from "../../../../Services/admin/batchdetailsService";
import { useModal, MODAL_TYPES } from "../Modals/ModalContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const BatchList = () => {
  const { data: batches = [], isLoading, isError } = useGetIdAndBatchNamesQuery();
  const [deleteBatch] = useDeleteBatchMutation();
  const { openModal } = useModal();
  const [showBatches, setShowBatches] = useState(false);
  const [expandedBatch, setExpandedBatch] = useState(null);

  const handleDelete = async (batchId) => {
    try {
      await deleteBatch(batchId).unwrap();
      toast.success("Batch deleted successfully");
    } catch (err) {
      toast.error("Failed to delete batch");
    }
  };

  const handleViewStudents = (batchName) => {
    setExpandedBatch(expandedBatch === batchName ? null : batchName);
  };

  if (isLoading) return <p>Loading batches...</p>;
  if (isError) return <p className="text-danger">Failed to load batches.</p>;

  return (
    <div className="container py-4">
      <button
        className="btn btn-primary mb-3"
        onClick={() => setShowBatches(!showBatches)}
      >
        {showBatches ? "Hide Batches" : "Show Batches"}
      </button>

      <div className="row">
        {showBatches &&
          batches.map((batch) => (
            <div key={batch._id} className="col-md-4 mb-4">
              <motion.div
                className="card shadow-sm h-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="card-body">
                  <h5 className="card-title">{batch.batchName}</h5>
                  <p className="card-text">ID: {batch._id}</p>

                  <div className="d-flex gap-2 mb-2">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() =>
                        openModal(MODAL_TYPES.CREATE_BATCH, {
                          mode: "edit",
                          batch,
                        })
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(batch._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => handleViewStudents(batch.batchName)}
                    >
                      {expandedBatch === batch.batchName
                        ? "Hide Students"
                        : "View Students"}
                    </button>
                  </div>

                  <AnimatePresence>
                    {expandedBatch === batch.batchName && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3"
                      >
                        <StudentList id={batch._id} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          ))}
      </div>
    </div>
  );
};

const StudentList = ({ id}) => {
  const { data, isLoading, isError } = useGetBatchstudentsQuery(id);

  if (isLoading) return <p>Loading students...</p>;
  if (isError) return <p className="text-danger">Failed to load students.</p>;
  if (!data?.students?.length) return <p>No students in this batch.</p>;

  return (
    <div className="row">
      <AnimatePresence>
        {data.students.map(({ _id, name, email, role }) => (
          <motion.div
            key={_id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="col-md-12 mb-2"
          >
            <div className="card shadow-sm">
              <div className="card-body py-2">
                <h6 className="mb-1">{name}</h6>
                <small className="text-muted">{email}</small>
                <div className="text-muted">
                  Role: {role} | ID: {_id}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default BatchList;