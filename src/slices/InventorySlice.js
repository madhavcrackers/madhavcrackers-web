import {createSlice} from '@reduxjs/toolkit'

export const InventorySlice=createSlice({
    name:"inventory",
    initialState:{
        categories:[],
        products:[],
        settings:{}
    },
    reducers:{
        setCategory:(state,action)=>{
            return{
                ...state,
                categories:action.payload
            }
        },
        setProduct:(state,action)=>{
            return{
                ...state,
                products:action.payload
            }
        },
        setSettings:(state,action)=>{
            return{
                ...state,
                settings:action.payload
            }
        },
        setResetInventory:(state)=>{
            return{
                categories:[],
                products:[],
                settings:{}
            }
        }
    }
})

export default InventorySlice.reducer

export const {setCategory,setProduct,setSettings,setResetInventory}=InventorySlice.actions