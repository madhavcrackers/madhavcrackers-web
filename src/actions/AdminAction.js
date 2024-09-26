import {db} from '../db'
import { collection, getDocs, where,updateDoc, query ,addDoc,doc,deleteDoc} from 'firebase/firestore'
import { message } from 'antd'
import {setLoadingFail,setLoadingSuccess} from '../slices/LoadingSlice'
import {setCategory,setProduct,setSettings} from '../slices/InventorySlice';
import { setGallerySuccess } from '../slices/OtherSlice';
import store from '../store';

export const addCategory=async(dispatch,category)=>{
    dispatch(setLoadingSuccess())
    try{
        const docRef=await addDoc(collection(db,"categories"),{category})
        let oldCategories=store.getState().inventory.categories;
        oldCategories=[...oldCategories,{id:docRef.id,category}]
        dispatch(setCategory(oldCategories))
        message.success("Category added 🔥")
        dispatch(setLoadingFail())
    }catch(err){
        console.log(err)
        dispatch(setLoadingFail())
    }
}

export const deleteCategory=async(dispatch,categories,id)=>{
    dispatch(setLoadingSuccess())
    try{
        await deleteDoc(doc(db,"categories",id))
        message.success("Category deleted 🔥")
        dispatch(setCategory(categories))
        dispatch(setLoadingFail())
    }catch(err){
        console.log(err)
        dispatch(setLoadingFail())
    }
}

export const getCategories=async(dispatch)=>{
    dispatch(setLoadingSuccess())
    try{
        const q=query(collection(db,"categories"))
        const result=await getDocs(q)
        const categories=[]
        if(result.docs.length>0){
            result.docs.forEach((category)=>{
                categories.push({...category.data(),id:category.id})
            })
        }
        dispatch(setCategory(categories))
        dispatch(setLoadingFail())
    }
    catch(err){
        console.log(err)
        dispatch(setLoadingFail())
    }
}

export const addProduct=async(dispatch,data)=>{
    dispatch(setLoadingSuccess())
    try{
        const docRef=await addDoc(collection(db,"products"),data)
        let oldProducts=store.getState().inventory.products;
        oldProducts=[...oldProducts,{id:docRef.id,...data}]
        dispatch(setProduct(oldProducts))
        message.success("Product added 🔥")
        dispatch(setLoadingFail())
    }catch(err){
        console.log(err)
        dispatch(setLoadingFail())
    }
}

export const getProducts=async(dispatch)=>{
    dispatch(setLoadingSuccess())
    try{
        const q=query(collection(db,"products"))
        const result=await getDocs(q)
        const products=[]
        if(result.docs.length>0){
            result.docs.forEach((product)=>{
                products.push({...product.data(),id:product.id})
            })
        }
        dispatch(setProduct(products))
        dispatch(setLoadingFail())
    }
    catch(err){
        console.log(err)
        dispatch(setLoadingFail())
    }
}

export const deleteProduct=async(dispatch,products,id)=>{
    dispatch(setLoadingSuccess())
    try{
        await deleteDoc(doc(db,"products",id))
        message.success("Product deleted 🔥")
        dispatch(setProduct(products))
        dispatch(setLoadingFail())
    }catch(err){
        console.log(err)
        dispatch(setLoadingFail())
    }
}

export const updateProduct=async(dispatch,products,id,updatedProduct)=>{
    dispatch(setLoadingSuccess())
    try{
        await updateDoc(doc(db,"products",id),updatedProduct)
        message.success("Product updated 🔥")
        dispatch(setProduct(products))
        dispatch(setLoadingFail())
    }catch(err){
        console.log(err)
        dispatch(setLoadingFail())
    }
}

export const getSettings=async(dispatch)=>{
    dispatch(setLoadingSuccess())
    try{
        const q=query(collection(db,"settings"))
        const result=await getDocs(q)
        let settings={minimumAmount:0,discount:0}
        if(result.docs.length==0){
            const docRef=await addDoc(collection(db,"settings"),settings)
            settings={...settings,id:docRef.id}
        }
        else{
            settings=result?.docs[0].data()
            settings={...settings,id:result?.docs[0].id}
        }
        dispatch(setSettings(settings))
        dispatch(setLoadingFail())
    }
    catch(err){
        console.log(err)
        dispatch(setLoadingFail())
    }
}

export const updateSettings=async(dispatch,settings,id)=>{
    dispatch(setLoadingSuccess())
    try{
        let temp={...settings}
        delete temp?.id
        await updateDoc(doc(db,"settings",id),temp)
        message.success("Settings updated 🔥")
        dispatch(setSettings(settings))
        dispatch(setLoadingFail())
    }catch(err){
        console.log(err)
        dispatch(setLoadingFail())
    }
}

export const addGallery=async(dispatch,src)=>{
    dispatch(setLoadingSuccess())
    try{
        const docRef=await addDoc(collection(db,"gallery"),{src})
        let images=store.getState().others.gallery;
        images=[...images,{id:docRef.id,src}]
        dispatch(setGallerySuccess(images))
        message.success("Gallery added 🔥")
        dispatch(setLoadingFail())
    }catch(err){
        console.log(err)
        dispatch(setLoadingFail())
    }
}

export const deleteGallery=async(dispatch,image)=>{
    dispatch(setLoadingSuccess())
    try{
        await deleteDoc(doc(db,"gallery",image?.id))
        let images=[...store.getState().others.gallery];
        images=images.filter((pics)=>{return pics.id!=image.id})
        message.success("Gallery updated 🔥")
        dispatch(setGallerySuccess(images))
        dispatch(setLoadingFail())
    }catch(err){
        console.log(err)
        dispatch(setLoadingFail())
    }
}