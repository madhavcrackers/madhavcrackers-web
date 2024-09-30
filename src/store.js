import { configureStore, Tuple } from "@reduxjs/toolkit";
import AuthSlice from './slices/AuthSlice'
import LoadingSlice from './slices/LoadingSlice';
import { thunk } from "redux-thunk";
import InventorySlice from "./slices/InventorySlice";
import ProductSlice from "./slices/ProductSlice";
import OrderSlice from './slices/OrderSlice'
import OrdersSlices from "./slices/OrdersSlices";
import OtherSlice from './slices/OtherSlice'

export default configureStore({
    reducer:{
        "auth":AuthSlice,
        "loader":LoadingSlice,
        "inventory":InventorySlice,
        "product":ProductSlice,
        "order":OrderSlice,
        "orders":OrdersSlices,
        "others":OtherSlice
    },
    middleware:()=>new Tuple(thunk)
})