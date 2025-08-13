import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const batchDetailsApi = createApi({
  reducerPath: "batchDetailsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:7777/admin/batchs",
      // baseUrl: "https://serverfordcm.onrender.com/admin/batchs",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Batch"],
  endpoints: (builder) => ({
    getBatchNames: builder.query({
      query: () => ({
        url: "/batchNames",
        method: "GET",
      }),
      providesTags: ["Batch"],
      refetchOnMountOrArgChange: true,
    }),
    getBatchstudents: builder.query({
      query: (batchname) => ({
        url: `/${encodeURIComponent(batchname)}`,
        method: "GET",
      }),
      providesTags: (result, error, batchname) => [{ type: "Batch", id: batchname }],
      refetchOnMountOrArgChange: true,
    }),
    addBatch: builder.mutation({
      query: (newBatchData) => ({
        url: "/newbatch",
        method: "POST",
        body: newBatchData,
      }),
      invalidatesTags: ["Batch"],
    }),
    updateBatch: builder.mutation({
      query: ({ batchId, updatedData }) => ({
        url: `/updateBatch/${batchId}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: (result, error, { batchId }) => [{ type: "Batch", id: batchId }],
    }),
  }),
});

export const {
  useGetBatchNamesQuery,
  useGetBatchstudentsQuery,
  useAddBatchMutation,
  useUpdateBatchMutation,
} = batchDetailsApi;