import { createApi } from "@reduxjs/toolkit/query/react";
import { createApiService } from "../../config/apiConfig";

export const transactionApi=createApi({
    ...createApiService({
          reducerPath: 'transactionApi',
        baseUrl: '/api/admin',
        tagTypes: ['transaction'],
    }),
    endpoints:(builder)=>({
        getTransaction:builder.query({
            query:()=>({
                url:"/transactions  ",
                method:"GET"
            })
        })
    })
})
export const {useGetTransactionQuery}= transactionApi