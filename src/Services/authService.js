
import { createApi, } from "@reduxjs/toolkit/query/react";
import { createApiService } from "../config/apiConfig";
export const authApi = createApi({

    ...createApiService({
          reducerPath: 'authApi',
          baseUrl:'/auth',
          tagTypes:["auth"]
             }),

  endpoints: (builder) => ({
    Login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }),
      invalidatesTags:['auth']
    }),
    Signup: builder.mutation({
      query: (credentials) => ({
        url: "/signup",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }),
      invalidatesTags:['auth']
    }),
    verifyToken: builder.query({
      query: () => ({
        url: '/verify',
        method: 'GET',
      }),
      providesTags:['auth']
    }),
    sendVerificationEmail: builder.mutation({
      query: (body) => ({
        url: '/send-verification-email',
        method: 'POST',
        body
      }),
       invalidatesTags:['auth']
    }),
      verifyEmail: builder.query({
      query: ({ ivfm, id }) => ({
        url: `/verify-email?ivfm=${ivfm}&id=${id}`,
        method: 'GET'
      }),
       providesTags:['auth']
    }),
     forgotPassword: builder.mutation({
      query: (email) => ({
        url: '/forgot-password',
        method: 'POST',
        body: { email }
      }),
       invalidatesTags:['auth']

    }),
    resetPassword: builder.mutation({
      query: ({ email, rspd, newPassword }) => ({
        url: '/reset-password',
        method: 'POST',
        body: { email, rspd, newPassword }
      }),
      invalidatesTags:['auth']

    })




  }),
});

export const { useLoginMutation, useSignupMutation ,useVerifyTokenQuery,
  useSendVerificationEmailMutation,
  useVerifyEmailQuery,
  useForgotPasswordMutation, useResetPasswordMutation,
  useLazyVerifyTokenQuery} = authApi;


