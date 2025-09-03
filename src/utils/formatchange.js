 export const transformAssignmentPayload = (rawData) => {
  if (!Array.isArray(rawData) || rawData.length === 0) return null;

  const { courseId, batchId } = rawData[0]; // assuming all rows share same course & batch
  const enrollmentIds = rawData.map(item => item.enrollment_id);

  return {
    courseId,
    batchId,
    enrollmentIds
  };
};

//used in unassigned for send data to genaric table
export  const flattenEnrollments=(arr)=> {

    return arr?.flatMap(entry => {
      console.log("entry",entry)
      const {_id, user, enrolledCourses } = entry;
      return enrolledCourses.map(courseEntry => ({
        enrollment_id:_id,
        name: user.name,
        email: user.email,
        courseName: courseEntry.course?.name || 'No Course',
        courseId: courseEntry.course?._id || 'N/A', 
        batchName: courseEntry.batch?.batchName || 'Unassigned',
        availability: courseEntry.availability || 'N/A'
      }));
    });
  }

  export const transformStudentEnrollmentData = (enrollments) => {
  return enrollments
    .filter((item) => item.course) // course must exist
    .map((item) => ({
      course_id: item.course._id,
      batch_id: item.batch?._id || null,
      title: item.course.name,
      description: item.course.description,
      batchName: item.batch?.batchName || "Unassigned",
    }));
};