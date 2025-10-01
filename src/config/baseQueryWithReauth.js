// config/baseQueryWithReauth.js
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout, tokenRefreshed } from '../features/authSlice';

const BASE_URL = process.env.REACT_APP_ENV === 'production' 
  ? process.env.REACT_APP_PROD_API_URL 
  : process.env.REACT_APP_LOCAL_API_URL;

// Cache for refresh requests to prevent duplicates
let refreshPromise = null;

export const createBaseQueryWithReauth = (baseUrl = '') => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: `${BASE_URL}${baseUrl}`,
    credentials: 'include',
    prepareHeaders: (headers, { getState, endpoint }) => {
      // Add performance headers
      headers.set('X-Requested-With', 'XMLHttpRequest');
      
      // Conditional headers based on endpoint
      if (endpoint !== 'uploadFile') {
        headers.set('Content-Type', 'application/json');
      }
      
      return headers;
    },
    // Performance optimizations
    timeout: 30000,
  });

  return async (args, api, extraOptions) => {
    // First attempt
    let result = await rawBaseQuery(args, api, extraOptions);

    // Auto-refresh on 401
    if (result.error?.status === 401) {
      try {
        // Prevent multiple simultaneous refresh calls
        if (!refreshPromise) {
          refreshPromise = fetchBaseQuery({
            baseUrl: BASE_URL,
            credentials: 'include',
          })(
            { url: '/auth/refresh', method: 'POST' },
            api,
            extraOptions
          ).finally(() => {
            refreshPromise = null;
          });
        }

        const refreshResult = await refreshPromise;

        if (refreshResult.data) {
          api.dispatch(tokenRefreshed());
          // Retry original request
          result = await rawBaseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } catch (error) {
        api.dispatch(logout());
      }
    }

    return result;
  };
};