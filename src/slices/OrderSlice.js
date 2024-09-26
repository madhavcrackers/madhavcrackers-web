import { createSlice } from "@reduxjs/toolkit";

export const OrderSlice = createSlice({
    name: "order",
    initialState: {
        orderID: "",
        customerInfo: {},
        cart: {
            subtotal: 0,
            total: 0,
            totalQty: 0,
            crackers: [],
            orderedAt: null
        },
        paymentStatus: "Not paid",
        orderStatus: "Waiting for payment",
    },
    reducers: {
        setOrderId: (state, action) => {
            return {
                ...state,
                orderID: action.payload
            }
        },
        setCustomerInfo: (state, action) => {
            return {
                ...state,
                customerInfo: action.payload
            }
        },
        setCart: (state, action) => {
            return {
                ...state,
                cart: action.payload
            }
        },
        resetOrder: (state, action) => {
            return {
                orderID: "",
                customerInfo: {},
                cart: {
                    subtotal: 0,
                    total: 0,
                    totalQty: 0,
                    crackers: [],
                    orderedAt: null
                },
                paymentStatus: "Not paid",
                orderStatus: "Waiting for payment",
            }
        }
    }
})

export default OrderSlice.reducer;
export const { setOrderId, setCustomerInfo, setCart,resetOrder } = OrderSlice.actions;