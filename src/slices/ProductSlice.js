import { createSlice } from "@reduxjs/toolkit";

export const ProductSlice=createSlice({
    name:"product",
    initialState:{
        products:[],
        settings:{},
        loaded:false
    },
    reducers:{
        setProducts:(state,action)=>{
            return{
                ...state,
                products:action.payload,
                loaded:true
            }
        },
        setSettings:(state,action)=>{
            return{
                ...state,
                settings:action.payload,
                loaded:true
            }
        }
    }
})

export default ProductSlice.reducer;
export const {setProducts,setSettings}=ProductSlice.actions;