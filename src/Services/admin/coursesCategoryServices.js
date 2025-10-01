import { createApi } from "@reduxjs/toolkit/query/react";
import { createApiService } from "../../config/apiConfig";

export const courseCategoryApi = createApi({
  ...createApiService({
    reducerPath: 'coursesCategoryApi',
    baseUrl: '/api',
    tagTypes: ['coursesCategory',"Students"],
  }),
  endpoints: (builder) => ({
    
    getCoursesCategory:builder.query({
      query:()=>({
        url:`/categories`,
        method:'GET'
      }),
      providesTags: ['coursesCategory'],
    }),
      getStudents: builder.query({
      query: ({ page = 1, limit = 10, search = '' }) => ({
        url: 'students',
        params: { page, limit, search },
      }),
      providesTags: ['Students'],
    }),
    
    downloadStudentsExcel: builder.mutation({
      query: (filters = {}) => ({
        url: 'students/download',
        params: filters,
        responseHandler: (response) => response.blob(),
        cache: 'no-cache',
      }),
    }),
  }),
});

export const {useGetCoursesCategoryQuery,useDownloadStudentsExcelMutation,useGetStudentsQuery} = courseCategoryApi;