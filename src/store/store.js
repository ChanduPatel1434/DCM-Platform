
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSliceReducer from "../features/authSlice"; // Assuming authSliceReducer is exported from authslice.js
import { authApi } from "../Services/authService"; // Assuming authApi is exported from Auth

import { batchAssignApi } from "../Services/admin/batchAssignServices"; // Assuming batchAssignApi is exported from batchAssignServices.js
import { courseApi } from "../Services/admin/coursesService";
import { batchDetailsApi } from "../Services/admin/batchdetailsService";

const Store = configureStore({
    reducer: {
        auth: authSliceReducer, // Assuming authSliceReducer is imported from authslice.js
        [authApi.reducerPath]: authApi.reducer, // Assuming authApi is imported from Auth
        [batchAssignApi.reducerPath]: batchAssignApi.reducer,   // Assuming batchAssignApi is imported from batchAssignServices.js
        [courseApi.reducerPath]:courseApi.reducer,
        [batchDetailsApi.reducerPath]:batchDetailsApi.reducer

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
                                    authApi.middleware,
                                    batchAssignApi.middleware,
                                    courseApi.middleware,
                                    batchDetailsApi.middleware
                                ), // Assuming batchAssignApi is imported from batchAssignServices.js

});

export default Store
setupListeners(Store.dispatch);
