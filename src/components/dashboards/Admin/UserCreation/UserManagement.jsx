// import React, { useState, useEffect } from 'react';
// import { useGetStudentsQuery } from '../../../../Services/admin/coursesCategoryServices';
// import { useGetStudentEnrolledCoursesQuery } from '../../../../Services/student/enrollFormServices';
// import { useUnenrolledCourses } from '../../../../hooks/useUnenrolledcourses';

// const UserTable = () => {
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [selectedCourse, setSelectedCourse] = useState('');
//   const [enrollmentLoading, setEnrollmentLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);

//   // Fetch all users
//   const { data: usersData, error, isLoading, isFetching, refetch } = useGetStudentsQuery();
//   console.log("Users Data:", usersData);
  
//   // Fetch enrolled courses for selected user (only when modal is open and user is selected)
//   const { data: enrolledCourses, isLoading: enrolledLoading } = useGetStudentEnrolledCoursesQuery(
//     selectedUser?._id, 
//     { skip: !selectedUser?._id }
//   );
//   console.log("Enrolled Courses:", enrolledCourses);

//   // Process users data
//   const users = usersData?.students || usersData || [];
 
//   // Safely extract enrolled IDs
//   const enrolledIds = enrolledCourses?.data?.map(c => c.course?._id) || [];
//   console.log("Enrolled IDs:", enrolledIds);
  
//   // Use unenrolled courses hook - call this unconditionally at the top level
//   const { courses: availableCourses, isLoading: unenrolledLoading } = useUnenrolledCourses(enrolledIds);
//   console.log("Available Courses:", availableCourses);

//   const handleEnrollClick = (user) => {
//     console.log("Enroll button clicked for user:", user);
//     setSelectedUser(user);
//     setSelectedCourse('');
//     setShowModal(true);
//   };

//   const handleEnrollSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!selectedCourse) {
//       alert('Please select a course');
//       return;
//     }

//     setEnrollmentLoading(true);

//     try {
//       const response = await fetch('/api/enroll', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           userId: selectedUser._id,
//           courseId: selectedCourse,
//         }),
//       });

//       if (response.ok) {
//         alert('Enrollment successful!');
//         setShowModal(false);
//         refetch();
//       } else {
//         throw new Error('Enrollment failed');
//       }
//     } catch (error) {
//       console.error('Error enrolling student:', error);
//       alert('Enrollment failed. Please try again.');
//     } finally {
//       setEnrollmentLoading(false);
//     }
//   };

//   const closeModal = () => {
//     console.log("Closing modal");
//     setShowModal(false);
//     setSelectedUser(null);
//     setSelectedCourse('');
//   };

//   // Debug modal state
//   console.log("Modal State - showModal:", showModal, "selectedUser:", selectedUser);

//   if (isLoading) {
//     return <div className="loading">Loading verified students...</div>;
//   }

//   if (error) {
//     return <div className="error">Error loading students: {error.message}</div>;
//   }

//   return (
//     <div className="user-table-container">
//       <h2>Verified Students Management</h2>
      
//       {users.length === 0 ? (
//         <div className="no-data">No verified students found.</div>
//       ) : (
//         <table className="user-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Mobile</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id}>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>{user.mobile || 'N/A'}</td>
//                 <td>
//                   <button 
//                     className="enroll-btn"
//                     onClick={() => handleEnrollClick(user)}
//                     disabled={isFetching}
//                   >
//                     {isFetching ? 'Loading...' : 'Enroll in Course'}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* Enrollment Modal */}
//       {showModal && selectedUser && (
//         <div className="modal-overlay" style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundColor: 'rgba(0,0,0,0.5)',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           zIndex: 1000
//         }}>
//           <div className="modal" style={{
//             background: 'white',
//             padding: '20px',
//             borderRadius: '8px',
//             minWidth: '400px'
//           }}>
//             <div className="modal-header" style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               marginBottom: '20px'
//             }}>
//               <h3>Enroll {selectedUser.name} in a Course</h3>
//               <button className="close-btn" onClick={closeModal} style={{
//                 background: 'none',
//                 border: 'none',
//                 fontSize: '24px',
//                 cursor: 'pointer'
//               }}>×</button>
//             </div>
            
//             <form onSubmit={handleEnrollSubmit}>
//               <div style={{marginBottom: '15px'}}>
//                 <label><strong>Student Name:</strong> {selectedUser.name}</label>
//               </div>
              
//               <div style={{marginBottom: '15px'}}>
//                 <label><strong>Email:</strong> {selectedUser.email}</label>
//               </div>

//               <div style={{marginBottom: '15px'}}>
//                 <label><strong>Mobile:</strong> {selectedUser.mobile || 'N/A'}</label>
//               </div>
              
//               <div style={{marginBottom: '15px'}}>
//                 <label><strong>Select Course:</strong></label>
//                 {unenrolledLoading || enrolledLoading ? (
//                   <div>Loading available courses...</div>
//                 ) : availableCourses?.length === 0 ? (
//                   <div>No available courses to enroll</div>
//                 ) : (
//                   <select 
//                     value={selectedCourse} 
//                     onChange={(e) => setSelectedCourse(e.target.value)}
//                     required
//                     style={{width: '100%', padding: '8px', marginTop: '5px'}}
//                   >
//                     <option value="">Choose a course...</option>
//                     {availableCourses?.map((course) => (
//                       <option key={course._id} value={course._id}>
//                         {course.name}
//                       </option>
//                     ))}
//                   </select>
//                 )}
//               </div>
              
//               <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px'}}>
//                 <button 
//                   type="button" 
//                   onClick={closeModal}
//                   style={{padding: '8px 16px', border: '1px solid #ccc', background: 'white', cursor: 'pointer'}}
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   type="submit" 
//                   disabled={enrollmentLoading || availableCourses?.length === 0}
//                   style={{
//                     padding: '8px 16px', 
//                     background: enrollmentLoading ? '#6c757d' : '#007bff', 
//                     color: 'white', 
//                     border: 'none',
//                     cursor: enrollmentLoading ? 'not-allowed' : 'pointer'
//                   }}
//                 >
//                   {enrollmentLoading ? 'Enrolling...' : 'Enroll Student'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserTable;