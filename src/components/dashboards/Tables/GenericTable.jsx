
import {
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from '@tanstack/table-core';
import {
  useReactTable,
  flexRender,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';

const GenericTable = ({
  data = [],
  availableCourses = [],
  availableBatches = [],
  showAssignControls = false,
  showBatchColumn = false,
  isAssignedView = false, // ✅ NEW PROP
  onAssignBatch,
  onRemove,
  getRowId = row => row.id,
}) => {
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [rowSelection, setRowSelection] = useState({});

  const filteredData = useMemo(() => {
    if (selectedCourse === 'All') return data;
    return data.filter(student => {
      const course = student.courseName?.toLowerCase();
      const query = selectedCourse.toLowerCase();
      return selectedCourse === 'No Course' ? course === 'no course' : course.includes(query);
    });
  }, [data, selectedCourse]);

  const columns = useMemo(() => {
    const base = [
      showAssignControls && {
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      },
      { id: 'name', accessorKey: 'name', header: 'Name' },
      { id: 'email', accessorKey: 'email', header: 'Email' },
      { id: 'courseName', accessorKey: 'courseName', header: 'Course' },
   
      showBatchColumn && {
        id: 'batchName',
        accessorKey: 'batchName',
        header: 'Batch',
        cell: ({ row }) => {
          const batchName = row.original.batchName;
          return isAssignedView
            ?  batchName || '—'
            : batchName || '—';
        },
      },
      showAssignControls && {
        id: 'action',
        header: 'Action',
        cell: ({ row }) => {
          const student = row.original;
          return (
            <button
              className="btn btn-sm btn-outline-primary"
              disabled={!selectedBatch}
              onClick={() =>
                onAssignBatch?.([{
                  studentId: student.email,
                  courseTitle: student.courseName,
                  batchName: selectedBatch,
                }])
              }
            >
              Assign
            </button>
          );
        },
      },
    ];
    return base.filter(Boolean);
  }, [showAssignControls, showBatchColumn, selectedBatch, onAssignBatch, isAssignedView]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: showAssignControls ? { rowSelection } : {},
    onRowSelectionChange: showAssignControls ? setRowSelection : undefined,
    enableRowSelection: showAssignControls,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId,
  });

  const selectedRows = table.getSelectedRowModel().flatRows.map(row => row.original);

const handleBulkAssign = () => {
  const selectedBatchObj = availableBatches.find(b => b._id === selectedBatch);
  
  const payload = selectedRows.map(s => ({
    enrollment_id: s.enrollment_id,
    student_mail: s.email,
    courseTitle: s.courseName,
    courseId: s.courseId,
    batchId: selectedBatch,
    batchName: selectedBatchObj?.title || '', // Add batchName
  }));
  
  onAssignBatch?.(payload);
};

  return (
    <div className="card card-body">
      {(availableCourses.length > 0 || showAssignControls) && (
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex gap-3 align-items-center w-50">
            {availableCourses.length > 0 && (
              <select
                className="form-select"
                value={selectedCourse}
                onChange={e => setSelectedCourse(e.target.value)}
              >
                <option value="All">Show All</option>
                {availableCourses.map(({ _id, title }) => (
                  <option key={_id} value={title}>{title}</option>
                ))}
                <option value="No Course">No Course</option>
              </select>
            )}

            {showAssignControls && (
              <select
                className="form-select"
                value={selectedBatch}
                onChange={e => setSelectedBatch(e.target.value)}
              >
                <option value="">Select Batch</option>
                {availableBatches.map(({ _id, title }) => (
                  <option key={_id} value={_id}>{title}</option>
                ))}
              </select>
            )}
          </div>

          {showAssignControls && (
            <div className="btn-group">
              <button
                className="btn btn-primary"
                disabled={selectedRows.length === 0 || !selectedBatch}
                onClick={handleBulkAssign}
              >
                Assign to Batch
              </button>
              <button
                className="btn btn-danger"
                disabled={selectedRows.length === 0}
                onClick={() => onRemove?.(selectedRows)}
              >
                Remove Selected
              </button>
            </div>
          )}
        </div>
      )}

      <table className="table table-bordered table-hover table-sm">
        <thead className="table-light">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="text-center">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="text-center">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between mt-3">
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <div>
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Prev
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenericTable;