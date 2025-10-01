import { createApi } from "@reduxjs/toolkit/query/react";
import { createApiService } from "../../config/apiConfig";
export const enrollCourseApi = createApi({
    ...createApiService({
      reducerPath: 'enrollCourseApi',
      baseUrl: '/student/enroll',
      tagTypes: ['Enrollments'],
    }),
  endpoints: (builder) => ({

    getStudentbyId:builder.query({
      query:(id)=>({
        url:`/get/${id}`,
        method:"GET"
      })
    }),
    getStudentEnrolledCourses:builder.query({
      query:(id)=>({
        url:`/getcourses/${id}`,
        method:"GET",
      })
    })
   
  }),
});

export const { useGetStudentbyIdQuery,useGetStudentEnrolledCoursesQuery } = enrollCourseApi;