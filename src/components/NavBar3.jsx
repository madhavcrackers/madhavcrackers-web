import React, { useState, useEffect } from "react";
import { IoMenu } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function NavBar3() {
    const navigate=useNavigate()
    const [isSmallerDevice, setIsSmallerDevice] = useState(false);
    const[open,setOpen]=useState(false)
    useEffect(() => {
        const handleResize = () => {
            setIsSmallerDevice(window.innerWidth<=768?true:false);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);
    const menuItems = [
        {
            title: "Home",
            path: '/'
        },
        {
            title: "Products",
            path: '/quick-purchase'
        },{
            title:"Payment Info",
            path:'/payment-info'
        },
        {
            title: "Gallery",
            path: '/gallery'
        },
        {
            title: "About Us",
            path: '/about-us'
        },
        {
            title: "Contact Us",
            path: '/contact-us'
        },
    ]
    return (
        <>
            <div className="w-full h-fit bg-[#4535C1] py-3 sm:px-12 px-4 flex sm:justify-between justify-end items-center">
                <div className="sm:flex gap-8 px-5 hidden">
                    {
                        menuItems.map((menu, index) => {
                            return (
                                <span className="cursor-pointer h-fit text-[#fff] hover:text-[#facc15] hover:font-medium duration-100" key={index} onClick={()=>{
                                    navigate(menu.path)
                                }}>{menu.title}</span>
                            )
                        })
                    }
                </div>
                <span className="flex select-none items-center gap-2 cursor-pointer py-2 px-4 duration-500 rounded-md sm:invisible visible" onClick={()=>{
                    setOpen(true)
                }}>
                    <IoMenu className="text-[#facc15] text-lg" />
                    <span className="text-[#facc15] text-md font-medium">Menu</span>
                </span>
            </div>
            <div className={`w-full fixed top-0 bg-[#4535C1] py-12 px-12 flex flex-col gap-6 z-20 ${open?'visible':"invisible"}`} style={{ height: "100vh" }}>
                {
                    menuItems.map((menu, index) => {
                        return (
                            <span className="cursor-pointer select-none text-xl text-[#fff] hover:text-[#facc15] hover:font-medium hover:ps-4 hover:border-l-4" key={index} onClick={()=>{
                                setOpen(false)
                                navigate(menu.path)
                            }}>{menu.title}</span>
                        )
                    })
                }
                <IoMdCloseCircleOutline className="text-4xl text-[#fff] absolute top-8 right-8" onClick={()=>{setOpen(false)}}/>
            </div>
        </>
    )
}

export default NavBar3;