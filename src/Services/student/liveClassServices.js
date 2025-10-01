import { createApi } from '@reduxjs/toolkit/query/react';
import { createApiService } from '../../config/apiConfig';

export const liveClassesApi = createApi({
  ...createApiService({
    reducerPath: 'liveClassesApi',
  
    baseUrl: '/api/classes', // Adjust base path if needed
    
  tagTypes: ['LiveClasses']}),
  endpoints: (builder) => ({
    // 🔍 Fetch upcoming live classes
    getLiveClasses: builder.query({
      query: () => '/upcoming',
      providesTags: ['LiveClasses'],
    }),

    // 🚪 Join a live class (redirect to Zoom)
    joinLiveClass: builder.mutation({
      query: (id) => ({
        url: `/join/${id}`,
        method: 'GET',
        
      }),
    }),
  }),
});

export const {
  useGetLiveClassesQuery,
  useJoinLiveClassMutation,
} = liveClassesApi;