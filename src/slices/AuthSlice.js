import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice=createSlice({
    name:"auth",
    initialState:{
        isAdmin:false,
    },
    reducers:{
        setAdminAuthSuccess:(state,action)=>{
            return{
                ...state,
                isAdmin:true
            }
        },
        setAdminAuthFail:(state,action)=>{
            return{
                ...state,
                isAdmin:false
            }
        }
    }
})

export default AuthSlice.reducer;
export const {setAdminAuthFail,setAdminAuthSuccess}=AuthSlice.actions;