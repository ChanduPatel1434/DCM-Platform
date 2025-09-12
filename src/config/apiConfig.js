import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_ENV === 'production' 
  ? process.env.REACT_APP_PROD_API_URL 
  : process.env.REACT_APP_LOCAL_API_URL;

console.log("ENV:", process.env.REACT_APP_ENV);
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("BASE_URL:", BASE_URL);
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

  // 🛡️ Skip ngrok's browser warning
  headers.set('ngrok-skip-browser-warning', 'true');

  return headers;
}
  });


  return {
    reducerPath,
    baseQuery,
    tagTypes,
  };
}; 
 