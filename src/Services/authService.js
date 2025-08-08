
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:7777",
    baseUrl: "https://serverfordcm.onrender.com/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    Login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }),
    }),
    Signup: builder.mutation({
      query: (credentials) => ({
        url: "auth/signup",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }),
    }),
    verifyToken: builder.query({
      query: () => ({
        url: 'auth/verify',
        method: 'GET',
      }),
    }),

  }),
});

export const { useLoginMutation, useSignupMutation ,useVerifyTokenQuery} = authApi;


