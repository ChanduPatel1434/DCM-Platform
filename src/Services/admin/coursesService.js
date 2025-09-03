// redux/api/courseApi.js
import { createApi } from '@reduxjs/toolkit/query/react';
import { createApiService } from "../../config/apiConfig";

export const courseApi = createApi({
  ...createApiService({
    reducerPath: 'ADcourseApi',
    baseUrl: '/admin/courses',
    tagTypes: ['Course'],
  }),
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
    updateCourse: builder.mutation({
      query: ({ _id, ...course }) => ({
        url: `/update-course/${_id}`,
        method: 'PUT',
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
  useLazyGetCoursesQuery,
  useUpdateCourseMutation
} = courseApi;