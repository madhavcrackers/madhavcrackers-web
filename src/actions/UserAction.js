import { db } from '../db'
import { collection, getDocs, query, addDoc } from 'firebase/firestore'
import { message } from 'antd'
import { setLoadingFail, setLoadingSuccess } from '../slices/LoadingSlice'
import { setProducts, setSettings } from '../slices/ProductSlice'
import { setCart,setCustomerInfo ,setOrderId,resetOrder} from '../slices/OrderSlice'
import {setGallerySuccess} from '../slices/OtherSlice'
import store from '../store';

export const getProducts = async (dispatch) => {
    dispatch(setLoadingSuccess())
    try {
        const p = query(collection(db, "settings"))
        const res = await getDocs(p)
        let settings = {}
        if (res.docs.length > 0) {
            settings = res?.docs[0].data()
            settings = { ...settings }
        }
        const q = query(collection(db, "products"))
        const result = await getDocs(q)
        const products = []
        if (result.docs.length > 0) {
            result.docs.forEach((product) => {
                let data = product.data()
                products.push({ ...data, id: product.id, price: (data?.price - Math.round((data.price * (settings?.discount / 100)))) })
            })
        }
        dispatch(setProducts(products))
        dispatch(setLoadingFail())
    }
    catch (err) {
        console.log(err)
        dispatch(setLoadingFail())
    }
}

export const getSettings = async (dispatch) => {
    dispatch(setLoadingSuccess())
    try {
        const q = query(collection(db, "settings"))
        const result = await getDocs(q)
        let settings = {}
        if (result.docs.length > 0) {
            settings = result?.docs[0].data()
            settings = { ...settings }
        }
        dispatch(setSettings(settings))
        dispatch(setLoadingFail())
    }
    catch (err) {
        console.log(err)
        dispatch(setLoadingFail())
    }
}

export const addToCart = async (dispatch, product) => {
    let packageCharge = 70
    let existingCarts = store.getState().order.cart
    let existingCrackers=[...existingCarts.crackers];
    let index=existingCrackers.findIndex((cracker)=>cracker.id==product.id);
    if(index!=-1){
        existingCrackers.splice(index,1,product)
    }
    else
        existingCrackers.push(product)
    let subTotal = findSubTotal(existingCrackers)
    existingCarts = {
        crackers: existingCrackers.filter((cracker) => { return cracker.qty > 0 }),
        subtotal: subTotal,
        total: subTotal + packageCharge,
        totalQty: findTotalQty(existingCrackers)
    }
    dispatch(setCart(existingCarts))
}

export const handleCart=async(dispatch,crackers)=>{
    let packageCharge = 70
    let subTotal = findSubTotal(crackers)
    let existingCarts = {
        crackers: crackers.filter((cracker) => { return cracker.qty > 0 }),
        subtotal: subTotal,
        total: subTotal + packageCharge,
        totalQty: findTotalQty(crackers)
    }
    dispatch(setCart(existingCarts))
}

export const updateCustomerInfoAndOrderId=async(dispatch,customerInfo,orderId)=>{
    let result=false
    dispatch(setCustomerInfo(customerInfo))
    dispatch(setOrderId(orderId))
    let order={...store.getState().order,orderedAt:Date.now()};
    dispatch(setLoadingSuccess())
    try{
        const docRef=await addDoc(collection(db,"orders"),order)
        sessionStorage.setItem("madhav_order_details",JSON.stringify(order))
        dispatch(setLoadingFail())
        dispatch(resetOrder())
        localStorage.removeItem("madhav_cart")
        result=true
    }catch(err){
        console.log(err)
        dispatch(setLoadingFail())
        result=false
    }
    return result;
}

export const getGallery=async(dispatch)=>{
    dispatch(setLoadingSuccess())
    try {
        const q = query(collection(db, "gallery"))
        const result = await getDocs(q)
        let images = []
        if (result.docs.length > 0) {
            images=result.docs.map((image)=>{
                return {...image.data(),id:image.id}
            })
        }
        dispatch(setGallerySuccess(images))
        dispatch(setLoadingFail())
    }
    catch (err) {
        console.log(err)
        dispatch(setLoadingFail())
    }
}


const findSubTotal = (crackers) => {
    let subTotal = 0
    crackers?.map((cracker) => {
        subTotal = subTotal + cracker?.total
    })
    return subTotal
}

const findTotalQty = (crackers) => {
    let totalQty = 0
    crackers?.map((cracker) => {
        totalQty = totalQty + cracker?.qty
    })
    return totalQty
}