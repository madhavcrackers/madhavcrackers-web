import { createSlice } from "@reduxjs/toolkit";

export const OrdersSlice=createSlice({
    name:"orders",
    initialState:{
        ordersLoaded:false,
        orders:[]
    },
    reducers:{
        setOrdersSuccess:(state,action)=>{
            return{
                ...state,
                ordersLoaded:true,
                orders:action.payload
            }
        },
        setOrdersFail:(state,action)=>{
            return{
                ...state,
                ordersLoaded:false,
                orders:[]
            }
        },
    }
})

export const{setOrdersSuccess,setOrdersFail}=OrdersSlice.actions;
export default OrdersSlice.reducer;