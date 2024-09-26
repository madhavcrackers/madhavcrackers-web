import React from "react";
import { IoMdCall,IoMdMail  } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { RiLoginCircleLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {useAuthState} from 'react-firebase-hooks/auth'
import { loginAdmin } from "../actions/AuthAction";
import { auth } from "../db";
import { useNavigate } from "react-router-dom";

const PriceList="https://ik.imagekit.io/madhav/PriceList.pdf"


function NavBar1(){
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const[user]=useAuthState(auth)
    return(
        <div className="w-full flex flex-col gap-4 items-center sm:flex-row justify-around py-5 px-4 bg-[#4535C1]">
            <div className="flex sm:flex-row w-full sm:w-auto items-center  flex-col sm:gap-5 gap-3">
                <span className="flex items-center gap-2">
                    <IoMdCall className="text-[#facc15] text-lg"/>
                    <a className="text-white text-sm" href="tel:9363935429">9363935429</a>
                    <a className="text-white text-sm" href="tel:9343565251">9343565251</a>
                </span>
                <span className="flex items-center gap-2">
                    <IoMdMail className="text-[#facc15] text-lg"/>
                    <a className="text-white text-sm" href="mailto:madhavcrackers@gmail.com">madhavcrackers@gmail.com</a>
                </span>
                <span className="flex items-center gap-2">
                    <IoLocationSharp className="text-[#facc15] text-lg"/>
                    <p className="text-white text-sm">Amathur, Sivakasi.</p>
                </span>
            </div>
            <a className="text-sm font-medium open-sans py-2 px-4 bg-[#facc15] hover:bg-[#fbbf24] rounded-lg w-fit" href={PriceList}>Download Price List</a>
            <button className="absolute top-5 right-5 bg-[#fff] p-2 rounded-2xl outline-none border-0" onClick={()=>{
                loginAdmin(dispatch,user?.email,navigate)
            }}>
                <RiLoginCircleLine className="text-xl text-[#000aff]"/>
            </button>
        </div>
    )
}
export default NavBar1;