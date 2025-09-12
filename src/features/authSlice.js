
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  batchList: null, // Optional: only for admin
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      console.log('Login action payload:', action.payload);

      const { user, token, batchLists,courses ,enrolledCourses} = action.payload;
     
      console.log("batches list from authSLice",batchLists)
console.log(enrolledCourses,"enrolledData")
      state.user = user;
      state.token = token;
      state.loading = false;
      state.error = null;
      
      state.enrolledData=enrolledCourses
      
      if (user.role === 'admin') {
        state.batchList = batchLists;
      } else {
        return
      }
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.batchList = null;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase('auth/login/pending', (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase('auth/login/fulfilled', (state, action) => {
        const { user, token, batchList } = action.payload;

        state.user = user;
        state.token = token;
        state.loading = false;
        state.error = null;
        state.batchList = user.role === 'admin' ? batchList || [] : null;
      })
      .addCase('auth/login/rejected', (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.batchList = null;
        state.error = action.error?.message || 'Login failed';
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;