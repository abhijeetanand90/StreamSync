import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials,logOut } from './auth.js'

const baseQuery=fetchBaseQuery({
    baseUrl:import.meta.env.VITE_API_BASE_URL,
    credentials:'include',
    prepareHeaders:(headers,{getState})=>{
        const token=getState().auth.token
        if(token){
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }

})

const baseQueryWithReauth=async(args, api,extraOptions)=>{
    let result= await baseQuery(args, api, extraOptions)
       if(result?.error?.status===401){
        const refreshResult=await baseQuery('/api/auth/refresh', api, extraOptions)

        if(refreshResult?.data){
            const user=api.getState().auth.user

            api.dispatch(setCredentials({...refreshResult.data, user}))
            result=await baseQuery(args, api, extraOptions)
        }
        else{
            api.dispatch(logOut())
        }
       }

       return result
}

export const apiSlice=createApi({
    baseQuery:baseQueryWithReauth,
    endpoints: builder => ({})
})