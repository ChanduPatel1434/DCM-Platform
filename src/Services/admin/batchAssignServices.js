import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const batchAssignApi = createApi({
  reducerPath: "batchAssignApi",
  baseQuery: fetchBaseQuery({
     baseUrl: "http://localhost:7777/admin" ,
      // baseUrl: "https://serverfordcm.onrender.com/admin",
     prepareHeaders: (headers) => {
      const token = localStorage.getItem('authToken');
      console.log(token);
      if (token) {
          headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
  },    
  }),
  endpoints: (builder) => ({
    // Endpoint to fetch unassigned students
    unassignedStudents: builder.query({
      query: () => ({
        url: "/unassigned",
        method: "GET",
      }),
    }),

    // Endpoint to assign students to a batch

    assignStudentsToBatch: builder.mutation({
      query: (data) => ({
        url: `/assign-to`,
        method: "POST",
        body: data,
      }),
    }),
    getassignedStudents:builder.query({
      query:()=>({
        url:`/assigned`,
        method:"GET"
      })
    })
  }),
});

export const { useAssignStudentsToBatchMutation,
               useUnassignedStudentsQuery ,
               useLazyUnassignedStudentsQuery,
              useGetassignedStudentsQuery,
              useLazyGetassignedStudentsQuery
            } = batchAssignApi;
