import { createSlice } from "@reduxjs/toolkit";

export const LoadingSlice=createSlice({
    name:"loading",
    initialState:{
        loading:false,
    },
    reducers:{
        setLoadingSuccess:(state,action)=>{
            return{
                ...state,
                loading:true
            }
        },
        setLoadingFail:(state,action)=>{
            return{
                ...state,
                loading:false
            }
        }
    }
})

export default LoadingSlice.reducer;
export const {setLoadingSuccess,setLoadingFail}=LoadingSlice.actions;