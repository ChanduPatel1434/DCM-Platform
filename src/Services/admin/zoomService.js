import { createApi } from '@reduxjs/toolkit/query/react';
import { createApiService } from '../../config/apiConfig';

export const zoomApi = createApi({
  ...createApiService({
    reducerPath: 'zoomApi',
    baseUrl: '/api',
    tagTypes: ['Meeting'],
  }),
  endpoints: (builder) => ({
   createMeeting: builder.mutation({
      query: (data) => ({
        url: 'zoom/create-meeting',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Meeting'],
    }),

    getMeetings: builder.query({
      query: () => 'zoom/get-classes',
      providesTags: ['Meeting'],
    }),
    startLiveClass:builder.mutation({
      query:(id)=>({
        url:`zoom/start/${id}`,
        method:"GET"
      }),
       providesTags: ['Meeting'],
    }),
     updateMeeting: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `zoom/meetings/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Meeting'],
    }),
    deleteMeeting:builder.mutation({
      query:(id)=>({
        url:`/zoom/delete-meeting/${id}`,
        method:"Delete"
      }),
       invalidatesTags: ['Meeting'],
    })

   
  }),
});

export const {
  useCreateMeetingMutation,
  useGetMeetingsQuery,
  useUpdateMeetingMutation,
  useStartLiveClassMutation,
  useDeleteMeetingMutation,
} = zoomApi;