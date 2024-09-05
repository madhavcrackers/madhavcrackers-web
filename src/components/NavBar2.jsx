import React from "react";
import Logo from '../assets/Madhav Crackers Logo.jpg'
import { RiRoadMapLine } from "react-icons/ri";
import { IoBagHandleOutline } from "react-icons/io5";

function NavBar2(){
    return(
        <div className="w-full flex flex-col gap-4 items-center sm:flex-row justify-around py-3 px-4">
            <img className="w-[130px]" src={Logo} alt="Madhav Crackers"/>
            <div className="flex select-none w-full sm:w-auto justify-center sm:gap-5 gap-3">
                <span className="flex items-center gap-2 cursor-pointer py-2 px-4 duration-500 rounded-md hover:bg-[#e0f2fe]">
                    <RiRoadMapLine className="text-[#4535C1] text-lg"/>
                    <span className="text-[#4535C1] text-sm font-medium">Track Order</span>
                </span>
                <span className="flex items-center gap-2 cursor-pointer py-2 px-4 duration-500 rounded-md hover:bg-[#e0f2fe]">
                    <IoBagHandleOutline className="text-[#4535C1] text-lg"/>
                    <span className="text-[#4535C1] text-sm font-medium">Cart</span>
                </span>
            </div>
        </div>
    )
}

export default NavBar2;