import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_ENV === 'production' 
  ? process.env.REACT_APP_PROD_API_URL 
  : process.env.REACT_APP_LOCAL_API_URL;

export const createApiService = ({ 
  reducerPath,
  baseUrl = '',
  tagTypes = [],
}) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: `${BASE_URL}${baseUrl}`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });


  return {
    reducerPath,
    baseQuery,
    tagTypes,
  };
}; 
 