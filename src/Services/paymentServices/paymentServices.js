// src/features/payments/paymentsApi.js
import { createApi } from '@reduxjs/toolkit/query/react';
import { createApiService } from '../../config/apiConfig';

export const paymentsApi = createApi({
    ...createApiService({
        reducerPath: 'paymentsApi',
        baseUrl: '/payments',
        tagTypes: ['Payments'], // capitalized for convention
    }),
    endpoints: (builder) => ({
        getRazorpayConfig: builder.query({
            query: () => '/config',
            providesTags: ['Payments']
        }),
        createOrder: builder.mutation({
            query: ({ courseIds, userId }) => ({
                url: '/order',
                method: 'POST',
                body: { courseIds, userId }
            }),
            invalidatesTags: ['Payments']
        }),
        verifyPayment: builder.mutation({
            query: (payload) => ({
                url: '/verify',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ['Payments']
        }),
        
    })
});

export const {
    useGetRazorpayConfigQuery,
    useCreateOrderMutation,
    useVerifyPaymentMutation,
    
} = paymentsApi;
