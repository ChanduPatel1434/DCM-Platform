import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const enrollCourseApi = createApi({
  reducerPath: "enrollCourseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:7777/student/enroll",
  }),
  endpoints: (builder) => ({
    enrollInCourse: builder.mutation({
      query: ({ user,enrolledCourses }) => ({
        url: `/newenroll/${user}`,
        method: "POST",
        body: enrolledCourses,
      }),
    }),
    getUnassignedEnrollments:builder.query({
      query:()=>({
        url:`/unassigned`,
        method:'GET'
      })
    })
  }),
});

export const { useEnrollInCourseMutation,useLazyGetUnassignedEnrollmentsQuery } = enrollCourseApi;