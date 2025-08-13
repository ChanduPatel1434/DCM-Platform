// redux/api/courseApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const courseApi = createApi({
    
  reducerPath: 'ADcourseApi',
  baseQuery: fetchBaseQuery({
     baseUrl: 'http://localhost:7777/admin/courses',
      // baseUrl: "https://serverfordcm.onrender.com/admin/courses",
      prepareHeaders: (headers) => {
        const token = localStorage.getItem('authToken');
        console.log(token);
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers; 
    },


   }),

  tagTypes: ['Course'],
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => '/getcourses',
      providesTags: ['Course']
    }),
    addCourse: builder.mutation({
      query: (course) => ({
        url: '/add-course',
        method: 'POST',
        body: course
      }),
      invalidatesTags: ['Course']
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/delete-course/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Course']
    })
  })
});

export const {
  
  useGetCoursesQuery,
  useAddCourseMutation,
  useDeleteCourseMutation,
  useLazyGetCoursesQuery
} = courseApi;