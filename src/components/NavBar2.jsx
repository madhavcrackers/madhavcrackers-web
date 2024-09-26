import React, { useEffect } from "react";
import Logo from '../assets/Madhav Crackers Logo.jpg'
import {setCart} from '../slices/OrderSlice'
import { RiRoadMapLine } from "react-icons/ri";
import { IoBagHandleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function NavBar2() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const crackers = useSelector((state) => state.order?.cart?.crackers)
    useEffect(()=>{
        let cart=JSON.parse(localStorage.getItem("madhav_cart"))
        if(cart)
            dispatch(setCart(cart))
    },[])
    return (
        <div className="w-full flex flex-col gap-4 items-center sm:flex-row justify-around py-3 px-4 bg-white">
            <img className="w-[130px] cursor-pointer" src={Logo} alt="Madhav Crackers" onClick={()=>{navigate('/')}}/>
            <div className="flex select-none w-full sm:w-auto justify-center sm:gap-5 gap-3">
                <span className="flex items-center gap-2 cursor-pointer py-2 px-4 duration-500 rounded-md hover:bg-[#e0f2fe]">
                    <RiRoadMapLine className="text-[#4535C1] text-lg" />
                    <span className="text-[#4535C1] text-sm font-medium">Track Order</span>
                </span>
                <span className="flex items-center gap-2 cursor-pointer py-2 px-4 duration-500 rounded-md relative hover:bg-[#e0f2fe]" onClick={()=>{
                    navigate('/cart')
                }}>
                    <IoBagHandleOutline className="text-[#4535C1] text-lg" />
                    <span className="text-[#4535C1] text-sm font-medium">Cart</span>
                    {crackers?.length > 0 &&
                        <span className="absolute w-2 h-2 border-2 border-[#00f] top-0 right-0 rounded-3xl"></span>}
                </span>
            </div>
        </div>
    )
}

export default NavBar2;