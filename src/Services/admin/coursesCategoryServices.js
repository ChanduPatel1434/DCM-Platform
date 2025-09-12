import { createApi } from "@reduxjs/toolkit/query/react";
import { createApiService } from "../../config/apiConfig";

export const courseCategoryApi = createApi({
  ...createApiService({
    reducerPath: 'coursesCategoryApi',
    baseUrl: '/api',
    tagTypes: ['coursesCategory'],
  }),
  endpoints: (builder) => ({
    
    getCoursesCategory:builder.query({
      query:()=>({
        url:`/categories`,
        method:'GET'
      }),
      providesTags: ['coursesCategory'],
    }),
 
 
  }),
});

export const {useGetCoursesCategoryQuery } = courseCategoryApi;