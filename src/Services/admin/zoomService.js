import { createApi } from '@reduxjs/toolkit/query/react';
import { createApiService } from '../../config/apiConfig';

export const zoomApi = createApi({
  ...createApiService({
    reducerPath: 'zoomApi',
    baseUrl: '/api',
    tagTypes: ['Meeting', 'LiveClass'],
  }),
  endpoints: (builder) => ({
   createMeeting: builder.mutation({
      query: (data) => ({
        url: 'zoom/create-meeting',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Meeting', 'LiveClass'],
    }),

    getMeetings: builder.query({
      query: () => 'zoom/meetings',
      providesTags: ['Meeting'],
    }),
     updateMeeting: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `zoom/meetings/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Meeting', 'LiveClass'],
    }),

    getLiveClasses: builder.query({
      query: () => 'zoom/live-classes',
      providesTags: ['LiveClass'],
    }),
  }),
});

export const {
  useCreateMeetingMutation,
  useGetMeetingsQuery,
  useUpdateMeetingMutation,
  useGetLiveClassesQuery,
} = zoomApi;