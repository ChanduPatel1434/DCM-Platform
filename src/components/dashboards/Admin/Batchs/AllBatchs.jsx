import React, { useEffect, useState } from 'react';
import { useGetBatchstudentsQuery } from '../../../../Services/admin/batchdetailsService';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import CreateBatchModal from './CreateBatch';

const BatchStudentViewer = () => {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { batchList } = useSelector(state => state.auth);

  const {
    data: batchStu = [],
    isLoading,
    isError,
    isSuccess
  } = useGetBatchstudentsQuery(selectedBatch, {
    skip: !selectedBatch,
  });

  useEffect(() => {
    if (batchList?.length) {
      const batchNames = batchList.map(({ batchName }) => batchName);
      setBatches(batchNames);
    }
  }, [batchList]);

  const handleBatchClick = (batchName) => {
    setSelectedBatch(batchName);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Batch Viewer</h2>
        <motion.button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Create Batch
        </motion.button>
      </div>

      <p>Select a batch to view its students:</p>
      <div className="d-flex flex-wrap gap-2 mb-4">
        {batches.map((batch) => (
          <motion.button
            key={batch}
            onClick={() => handleBatchClick(batch)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`btn ${batch === selectedBatch ? 'btn-primary' : 'btn-outline-secondary'}`}
          >
            {batch}
          </motion.button>
        ))}
      </div>

      {isLoading && <p>Loading students...</p>}
      {isError && <p className="text-danger">Failed to load students.</p>}

      {isSuccess && batchStu?.students?.length > 0 && (
        <>
          <h4 className="mb-3">Students in Batch: {selectedBatch}</h4>
          <div className="row">
            <AnimatePresence>
              {batchStu.students.map(({ _id, name, email, role }) => (
                <motion.div
                  key={_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="col-md-4 mb-4"
                >
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">{name}</h5>
                      <p className="card-text"><strong>Email:</strong> {email}</p>
                      <p className="card-text"><strong>Role:</strong> {role}</p>
                      <p className="card-text"><strong>ID:</strong> {_id}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </>
      )}

      {!isLoading && selectedBatch && batchStu?.students?.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fst-italic mt-3 text-center"
        >
          No students found for batch: <strong>{selectedBatch}</strong>
        </motion.p>
      )}

      {/* Modal for creating a new batch */}
      <CreateBatchModal showModal={showModal} handleClose={() => setShowModal(false)} />
    </div>
  );
};

export default BatchStudentViewer;