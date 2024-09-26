import { createSlice } from "@reduxjs/toolkit";

export const OtherSlice=createSlice({
    name:"others",
    initialState:{
        "gallery":[],
        "galleryLoaded":false
    },
    reducers:{
        setGallerySuccess:(state,action)=>{
            return{
                ...state,
                gallery:action.payload,
                galleryLoaded:true
            }
        },
        setGalleryFailure:(state,action)=>{
            return{
                ...state,
                gallery:[],
                galleryLoaded:false
            }
        }
    }
})

export const {setGallerySuccess,setGalleryFailure}=OtherSlice.actions

export default OtherSlice.reducer;