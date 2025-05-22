import { createSlice} from "@reduxjs/toolkit";
import { tokenUtils } from "../../utils/tokenUtils";

const initialState={
    user:JSON.parse(localStorage.getItem('user'))||null,
    token:tokenUtils.getToken(),
    isAuthenticated: !!tokenUtils.getToken(),

}



const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredentials:(state, action)=>{
            const{user, accessToken}=action.payload
            state.user=user;
            state.token=accessToken;
            state.isAuthenticated = true; 

            localStorage.setItem('user', JSON.stringify(user))
            tokenUtils.setToken(accessToken)
        },
        logOut:(state, action)=>{
            state.user=null
            state.token=null
            state.isAuthenticated = false; 
            localStorage.removeItem('user');
            tokenUtils.removeToken();
        }
    }
})


export const {setCredentials, logOut}=authSlice.actions

export  default authSlice.reducer

export const selectCurrentUser=(state)=>state.auth.user
export const selectCurrentToken=(state)=>state.auth.token
export const selectIsAuthenticated=(state)=>state.auth.isAuthenticated