import { createApi } from "@reduxjs/toolkit/query/react";
import { createApiService } from "../../config/apiConfig";

export const batchDetailsApi = createApi({
  ...createApiService({
    reducerPath: "batchDetailsApi",
    baseUrl: "/admin/batchs",
    tagTypes: ["Batch", "BatchStudents"], // Add both tag types you need
  }),
  endpoints: (builder) => ({
    getIdAndBatchNames: builder.query({
      query: () => ({
        url: "/allbatchNames",
        method: "GET",
      }),
      // Provide tags for all batches and individual batches
      providesTags: (result) =>
        result
          ? [
              // Add tags for each batch
              ...result.map(({ _id }) => ({ type: "Batch", id: _id })),
              // Add a general tag for the list
              { type: "Batch", id: "LIST" },
            ]
          : [{ type: "Batch", id: "LIST" }],
      refetchOnMountOrArgChange: true,
    }),
    getBatchstudents: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      // Provide tags for batch students
      providesTags: (result, error, id) => [
        { type: "BatchStudents", id },
        // Also tag with the batch ID for cross-invalidation if needed
        { type: "Batch", id },
      ],
      refetchOnMountOrArgChange: true,
    }),
    addBatch: builder.mutation({
      query: (newBatchData) => ({
        url: "/newbatch",
        method: "POST",
        body: newBatchData,
      }),
      // Invalidate the batch list when a new batch is added
      invalidatesTags: [{ type: "Batch", id: "LIST" }],
    }),
    updateBatch: builder.mutation({
      query: ({ batchId, updatedData }) => ({
        url: `/updateBatch/${batchId}`,
        method: "PUT",
        body: updatedData,
      }),
      // Invalidate both the specific batch and the list
      invalidatesTags: (result, error, { batchId }) => [
        { type: "Batch", id: batchId },
        { type: "Batch", id: "LIST" },
        // Also invalidate the students for this batch
        { type: "BatchStudents", id: batchId },
      ],
    }),
    deleteBatch: builder.mutation({
      query: (batchId) => ({
        url: `/deleteBatch/${batchId}`,
        method: "DELETE",
      }),
      // Invalidate both the specific batch and the list
      invalidatesTags: (result, error, batchId) => [
        { type: "Batch", id: batchId },
        { type: "Batch", id: "LIST" },
        // Also invalidate the students for this batch
        { type: "BatchStudents", id: batchId },
      ],
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