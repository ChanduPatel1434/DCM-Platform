import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSliceReducer from "../features/authSlice";

import { authApi } from "../Services/authService";
import { batchAssignApi } from "../Services/admin/batchAssignServices";
import { courseApi } from "../Services/admin/coursesService";
import { batchDetailsApi } from "../Services/admin/batchdetailsService";
import { enrollCourseApi } from "../Services/student/enrollFormServices";
import { assignApi } from "../Services/admin/assignService";

import rtkLogger from "./rtkLogger";
import { paymentsApi } from "../Services/paymentServices/paymentServices";

const Store = configureStore({
  reducer: {
    auth: authSliceReducer,
    [authApi.reducerPath]: authApi.reducer,
    [batchAssignApi.reducerPath]: batchAssignApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [batchDetailsApi.reducerPath]: batchDetailsApi.reducer,
    [enrollCourseApi.reducerPath]: enrollCourseApi.reducer,
    [assignApi.reducerPath]: assignApi.reducer,
        [paymentsApi.reducerPath]: paymentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      batchAssignApi.middleware,
      courseApi.middleware,
      batchDetailsApi.middleware,
      enrollCourseApi.middleware,
      assignApi.middleware,
      paymentsApi.middleware,
      rtkLogger // ✅ logs rejected queries
    ),
  devTools: process.env.NODE_ENV !== 'production', // ✅ enables Redux DevTools
});

export default Store;
setupListeners(Store.dispatch);