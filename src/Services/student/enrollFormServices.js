import { createApi } from "@reduxjs/toolkit/query/react";
import { createApiService } from "../../config/apiConfig";
export const enrollCourseApi = createApi({
    ...createApiService({
      reducerPath: 'enrollCourseApi',
      baseUrl: '/student/enroll',
      tagTypes: ['Enrollments'],
    }),
  endpoints: (builder) => ({
    enrollInCourse: builder.mutation({
      query: ({ user,enrolledCourses }) => ({
        url: `/newenroll/${user}`,
        method: "POST",
        body: enrolledCourses,
      }),
    }),
    getStudentbyId:builder.query({
      query:(id)=>({
        url:`/get/${id}`,
        method:"GET"
      })
    })
   
  }),
});

export const { useEnrollInCourseMutation,useGetStudentbyIdQuery,useLazyGetStudentbyIdQuery } = enrollCourseApi;