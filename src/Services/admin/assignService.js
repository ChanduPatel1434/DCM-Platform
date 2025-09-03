import { createApi } from "@reduxjs/toolkit/query/react";
import { createApiService } from "../../config/apiConfig";

export const assignApi = createApi({
  ...createApiService({
    reducerPath: 'assignApi',
    baseUrl: '/admin/enroll',
    tagTypes: ['Enrollments'],
  }),
  endpoints: (builder) => ({
    
    getUnassignedEnrollments:builder.query({
      query:()=>({
        url:`/unassigned`,
        method:'GET'
      }),
      providesTags: ['Enrollments'],
    }),
    assignStudentsToBatch: builder.mutation({
      query: (payload) => ({
        url: `/assign`,
        method: 'POST',
        body: payload 
      }),
      invalidatesTags: ['Enrollments'], 
    }),
    getAssignedEnrollments:builder.query({
      query:()=>({
        url:`/assigned`,
        method:'GET'
      }),
      providesTags: ['Enrollments'],
    })
  }),
});

export const { useLazyGetUnassignedEnrollmentsQuery ,useAssignStudentsToBatchMutation, useGetAssignedEnrollmentsQuery } = assignApi;