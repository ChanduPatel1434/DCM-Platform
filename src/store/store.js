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
import { courseCategoryApi } from "../Services/admin/coursesCategoryServices";
import { transactionApi } from "../Services/paymentServices/transactionServices";   
import { cartApi } from "../Services/student/cartServices";
import cartSliceReducer from "../features/cartSlice"
import { cartPersistMiddleware } from "../middleware/cartPersistMiddleware";
import { zoomApi } from "../Services/admin/zoomService";
const Store = configureStore({
  reducer: {
    auth: authSliceReducer,
    cart:cartSliceReducer,
    [authApi.reducerPath]: authApi.reducer,
    [batchAssignApi.reducerPath]: batchAssignApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [batchDetailsApi.reducerPath]: batchDetailsApi.reducer,
    [enrollCourseApi.reducerPath]: enrollCourseApi.reducer,
    [assignApi.reducerPath]: assignApi.reducer,
        [paymentsApi.reducerPath]: paymentsApi.reducer,
        [courseCategoryApi.reducerPath]:courseCategoryApi.reducer,
        [transactionApi.reducerPath]:transactionApi.reducer,
        [cartApi.reducerPath]:cartApi.reducer,
        [zoomApi.reducerPath]:zoomApi.reducer,
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
      courseCategoryApi.middleware,
      transactionApi.middleware,
      cartApi.middleware,
      cartPersistMiddleware,
      zoomApi.middleware,
      rtkLogger // ✅ logs rejected queries
    ),
  devTools: process.env.NODE_ENV !== 'production', // ✅ enables Redux DevTools
});

export default Store;
setupListeners(Store.dispatch);