// features/students/StudentsTable.jsx
import React, { useState, useEffect } from 'react';
import {
  useGetStudentsQuery,
  useDownloadStudentsExcelMutation,
} from '../../../../Services/admin/coursesCategoryServices';
import { Download, Loader, Loader2 } from 'lucide-react';

const StudentsTable = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Excel download filters
  const [excelFilters, setExcelFilters] = useState({
    verified: '',
    startDate: '',
    endDate: ''
  });

  // RTK Query hooks
  const {
    data: studentsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetStudentsQuery({
    page: currentPage,
    limit,
    search: debouncedSearch,
  });

  const [downloadExcel, { isLoading: downloadLoading }] = useDownloadStudentsExcelMutation();

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Handle Excel download
  const handleDownloadExcel = async () => {
    try {
      // Convert empty strings to undefined to avoid sending empty params
      const filters = Object.fromEntries(
        Object.entries(excelFilters).filter(([_, value]) => value !== '')
      );

      const blob = await downloadExcel(filters).unwrap();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().split('T')[0];
      link.setAttribute('download', `students_report_${timestamp}.xlsx`);

      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download Excel file');
    }
  };

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= studentsData?.totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Clear search
  const handleClearSearch = () => {
    setSearch('');
    setDebouncedSearch('');
    setCurrentPage(1);
  };

  // Clear Excel filters
  const handleClearExcelFilters = () => {
    setExcelFilters({
      verified: '',
      startDate: '',
      endDate: ''
    });
  };

  if (isError) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-danger border border-danger rounded-4 p-4">
          <h2 className="text-danger ">Error loading students</h2>
          <p className="text-danger">{error?.data?.error || 'Failed to fetch students'}</p>
          <button
            onClick={refetch}
            className="btn btn-danger"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className=" p-4">
        {/* Header */}
        
        

            <p className="fs-2 text-success">
              Total {studentsData?.total || 0} students found
            </p>
            <div className='row align-items-center justify-content-between '>
              <div className='col-md-8'>
                <form onSubmit={handleSearch} className="my-4">
                  <div className="d-flex  justify-content-start align-items-center">
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search by name, email, or mobile..."
                      className="w-75 form-input rounded-lg p-2   "
                    />
                    <button
                      type="submit"
                      className="btn-info btn mx-2"
                    >
                      Search
                    </button>
                    {search && (
                      <button
                        type="button"
                        onClick={handleClearSearch}
                        className="btn-danger btn"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </form>
              </div>
              <div className='col-md-3'>
                <button
                  onClick={handleDownloadExcel}
                  disabled={downloadLoading || isLoading}
                  className="btn-success btn"
                >
                  {downloadLoading ? (
                    <>
                      <Loader2 />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download />
                      Download Excel
                    </>
                  )}
                </button>
              </div>
            </div>
      



       

        {/* Excel Download Filters */}
        {/* <div className="my-3">
          <h3 className="font-semibold text-gray-700 mb-3">Excel Download Filters (Optional)</h3>
          <div className="d-flex my-3 w-100 align-items-center justify-content-between">
            <div className='d-flex'>
                <select
              value={excelFilters.verified}
              onChange={(e) => setExcelFilters({...excelFilters, verified: e.target.value})}
              className="form-select "
            >
              <option value="">All Verification Status</option>
              <option value="true">Verified Only</option>
              <option value="false">Pending Only</option>
            </select>
            
            <input
              type="date"
              value={excelFilters.startDate}
              onChange={(e) => setExcelFilters({...excelFilters, startDate: e.target.value})}
              className="form-input "
              placeholder="Start Date"
            />
            
            <input
              type="date"
              value={excelFilters.endDate}
              onChange={(e) => setExcelFilters({...excelFilters, endDate: e.target.value})}
              className="form-input "
              placeholder="End Date"
            />
            </div>
            
            <button
              onClick={handleClearExcelFilters}
              className="btn-danger btn"
            >
              Clear Filters
            </button>
          </div>
        </div> */}


        {/* Students Table */}
        <div className="">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {studentsData?.totalPages > 1 && (
                <div className="d-flex justify-content-between mb-3 ">
                  <div className="fs-1">
                    Showing {((currentPage - 1) * limit) + 1} to {Math.min(currentPage * limit, studentsData?.total)} of {studentsData?.total} entries
                  </div>
                  <div className="d-flex gap-4 ">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="btn btn-secondary"
                    >
                      Previous
                    </button>

                    {Array.from({ length: studentsData?.totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`btn-secondary btn mx-2 ${currentPage === page
                          ? 'bg-dark text-white '
                          : ''
                          }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === studentsData?.totalPages}
                      className="btn-secondary btn"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              <table className="table table-hover ">
                <thead>
                  <tr>
                    <th>Name  </th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody >
                  {studentsData?.students?.length === 0 ? (
                    <tr>
                      <td colSpan="4" >
                        No students found
                      </td>
                    </tr>
                  ) : (
                    studentsData?.students?.map((student) => (
                      <tr key={student._id}>
                        <td >
                          <div >
                            {student.name || 'Not Provided'}
                          </div>
                        </td>
                        <td >
                          <div >{student.email}</div>
                        </td>
                        <td >
                          <div >{student.mobile || 'Not Provided'}</div>
                        </td>
                        <td>
                          <span
                            className={`badge rounded-pill ${student.emailVerified ? 'bg-success' : 'bg-warning text-dark'
                              }`}
                          >
                            {student.emailVerified ? 'Verified' : 'Pending'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {/* Pagination */}

            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentsTable;