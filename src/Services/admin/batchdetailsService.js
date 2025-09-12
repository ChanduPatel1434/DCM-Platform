import { createApi } from "@reduxjs/toolkit/query/react";
import { createApiService } from "../../config/apiConfig";

export const batchDetailsApi = createApi({
  ...createApiService({
    reducerPath: "batchDetailsApi",
    baseUrl: "/admin/batchs",
    tagTypes: ["Batch"],
  }),
  endpoints: (builder) => ({
    getIdAndBatchNames: builder.query({
      query: () => ({
        url: "/allbatchNames",
        method: "GET",
      }),
      providesTags: ["Batch"],
      refetchOnMountOrArgChange: true,
    }),
    getBatchstudents: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, batchName) => [{ type: "Batch", id: batchName }],
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
    deleteBatch: builder.mutation({
      query: (batchId) => ({
        url: `/deleteBatch/${batchId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, batchId) => [{ type: "Batch", id: batchId }],
    }),
  }),
});

export const {
  useGetIdAndBatchNamesQuery,
  useGetBatchstudentsQuery,
  useLazyGetIdAndBatchNamesQuery,
  useLazyGetBatchstudentsQuery,
  useAddBatchMutation,
  useUpdateBatchMutation,
  useDeleteBatchMutation,
  
} = batchDetailsApi;