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

const StudentTable = ({
  students = [],
  availableCourses = [],
  availableBatches = [],
  showAssignControls = false,
  showBatchColumn = false,
  onAssignBatch,
  onRemove,
}) => {
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [rowSelection, setRowSelection] = useState({});

  // Flatten and sanitize student data
  const flattenedStudents = useMemo(() => {
    return students.flatMap(student =>
      student.courses?.length
        ? student.courses.map(course => ({
            ...student,
            courseName: course.title || 'No Course',
            batchName: course.batchId || 'Unassigned',
          }))
        : [{ ...student, courseName: 'No Course', batchName: 'Unassigned' }]
    );
  }, [students]);

  const filteredData = useMemo(() => {
    if (selectedCourse === 'All') return flattenedStudents;
    return flattenedStudents.filter(student => {
      const course = student.courseName?.toLowerCase();
      const query = selectedCourse.toLowerCase();
      return selectedCourse === 'No Course' ? course === 'no course' : course.includes(query);
    });
  }, [flattenedStudents, selectedCourse]);

  const columns = useMemo(() => [
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
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'courseName', header: 'Course' },
    showBatchColumn && {
      accessorKey: 'batchName',
      header: 'Batch',
      cell: ({ row }) => row.original.batchName,
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
  ].filter(Boolean), [showAssignControls, showBatchColumn, selectedBatch, onAssignBatch]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: showAssignControls ? { rowSelection } : {},
    onRowSelectionChange: showAssignControls ? setRowSelection : undefined,
    enableRowSelection: showAssignControls,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: row => `${row.email}_${row.courseName}`,
  });

  const selectedStudents = table.getSelectedRowModel().flatRows.map(row => row.original);

  const handleBulkAssign = () => {
    const payload = selectedStudents.map(s => ({
      studentId: s.email,
      courseTitle: s.courseName,
      batchName: selectedBatch,
    }));
    onAssignBatch?.(payload);
  };

  return (
    <div className="card card-body">
      {/* 🎛 Controls */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex gap-3 align-items-center w-50">
          <select
            className="form-select"
            value={selectedCourse}
            onChange={e => setSelectedCourse(e.target.value)}
          >
            <option value="All">Show All</option>
            {availableCourses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
            <option value="No Course">No Course</option>
          </select>

          {showAssignControls && (
            <select
              className="form-select"
              value={selectedBatch}
              onChange={e => setSelectedBatch(e.target.value)}
            >
              <option value="">Select Batch</option>
              {availableBatches.map(batch => (
                <option key={batch} value={batch}>{batch}</option>
              ))}
            </select>
          )}
        </div>

        {showAssignControls && (
          <div className="btn-group">
            <button
              className="btn btn-primary"
              disabled={selectedStudents.length === 0 || !selectedBatch}
              onClick={handleBulkAssign}
            >
              Assign to Batch
            </button>
            <button
              className="btn btn-danger"
              disabled={selectedStudents.length === 0}
              onClick={() => onRemove?.(selectedStudents)}
            >
              Remove Selected
            </button>
          </div>
        )}
      </div>

      {/* 📋 Table */}
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

      {/* ⏮ Pagination */}
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

export default StudentTable;