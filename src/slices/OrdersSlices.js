import { createSlice } from "@reduxjs/toolkit";

export const OrdersSlice=createSlice({
    name:"orders",
    initialState:{
        ordersLoaded:false,
        orders:[]
    }
})