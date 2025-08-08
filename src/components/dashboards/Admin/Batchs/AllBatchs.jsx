import React, { useEffect, useState } from 'react';
import {
  useGetBatchNamesQuery,
  useGetBatchstudentsQuery,
} from '../../../../Services/admin/batchdetailsService';

const BatchStudentViewer = () => {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('');

  const {
    data: students = [],
    isLoading,
    isError,
  } = useGetBatchstudentsQuery(selectedBatch, {
    skip: !selectedBatch,
  });

  // Fetch all batch names on mount
  const { data: batchNames, isLoading: loadingBatches, isError: batchError } = useGetBatchNamesQuery();

  useEffect(() => {
    if (batchNames) {
      setBatches(batchNames);
    }
  }, [batchNames]);

  const handleBatchClick = (batchName) => {
    setSelectedBatch(batchName);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Batch Viewer</h2>

      {loadingBatches && <p>Loading batch names...</p>}
      {batchError && <p>Failed to load batch names.</p>}

      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginBottom: '1rem',
        }}
      >
        {batches.map((batch) => (
          <button
            key={batch}
            onClick={() => handleBatchClick(batch)}
            style={{
              padding: '0.5rem 1rem',
              background: batch === selectedBatch ? '#007bff' : '#f0f0f0',
              color: batch === selectedBatch ? '#fff' : '#000',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {batch}
          </button>
        ))}
      </div>

      {isLoading && <p>Loading students...</p>}
      {isError && <p>Failed to load students.</p>}

      {!isLoading && selectedBatch && students.length > 0 && (
        <>
          <h4>Students in Batch: {selectedBatch}</h4>
          <table
            border="1"
            cellPadding="8"
            style={{ width: '100%', borderCollapse: 'collapse' }}
          >
            <thead style={{ backgroundColor: '#efefef' }}>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {students.map(({ name, email, role, id }) => (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{role}</td>
                  <td>{id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {!isLoading && selectedBatch && students.length === 0 && (
        <p>No students found for batch: {selectedBatch}</p>
      )}
    </div>
  );
};

export default BatchStudentViewer;  