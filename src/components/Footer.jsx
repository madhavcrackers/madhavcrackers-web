import React from "react";
import { Link } from "react-router-dom";
import { IoMdCall, IoMdMail } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { FaGooglePay } from "react-icons/fa6";
import '../index.css';

function Footer() {
    return (
        <>
            <div className="w-100 py-1 bg-[#4535C1]">
            </div>
            <div className="w-100 bg-[#4535C1] py-5 mt-2 ">
                <h1 className="text-center text-xl sm:text-2xl mt-2 text-[#facc15] font-medium">Madhav Crackers</h1>
                <p className="text-center text-[#fff] mt-2">Best crackers shop in sivakasi</p>
                <div className="w-100 px-5 py-12 flex flex-col gap-12 sm:gap-4 sm:justify-evenly sm:flex-row">
                    <div className="flex flex-col gap-3">
                        <p className="text-lg text-[#facc15] font-medium border-b-[3px] w-fit">Contact Us</p>
                        <div className="flex gap-2">
                            <IoLocationSharp className="text-[#facc15] text-lg" />
                            <p className="text-[#fff] text-sm leading-6">No: 4/273-11/7, Virudhunagar to Sivakasi Main Road,<br />
                                Amathur, Sivakasi.<br />
                                Tamilnadu-626005,India.<br />
                                <a className="text-[#facc15] font-medium" target="_blank" referrerPolicy={"noreferrer"} href="https://maps.app.goo.gl/SBtJM13sdW3yeU6W6">View on map</a>                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <IoMdCall className="text-[#facc15] text-lg" />
                            <a className="text-white text-sm" href="tel:9363935429">9363935429</a>
                            <a className="text-white text-sm" href="tel:9343565251">9343565251</a>
                        </div>
                        <div className="flex items-center gap-2">
                            <IoMdMail className="text-[#facc15] text-lg" />
                            <a className="text-white text-sm" href="mailto:madhavcrackers@gmail.com">madhavcrackers@gmail.com</a>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <p className="text-lg text-[#facc15] font-medium border-b-[3px] w-fit">Quick Links</p>
                        <div className="flex flex-col gap-1">
                            <Link className="text-[#fff] hover:translate-x-2 duration-500" to={"/"}>Home</Link>
                            <Link className="text-[#fff] hover:translate-x-2 duration-500" to={"/quick-purchase"}>Products</Link>
                            <Link className="text-[#fff] hover:translate-x-2 duration-500" to={"/payment-info"}>Payment Info</Link>
                            <Link className="text-[#fff] hover:translate-x-2 duration-500" to={"/gallery"}>Gallery</Link>
                            <Link className="text-[#fff] hover:translate-x-2 duration-500" to={"/about-us"}>About Us</Link>
                            <Link className="text-[#fff] hover:translate-x-2 duration-500" to={"/contact-us"}>Contact Us</Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <p className="text-lg text-[#facc15] font-medium border-b-[3px] w-fit">Payment Information</p>
                        <div className="flex flex-col gap-1">
                            <FaGooglePay className="text-6xl text-[#fff]"/>
                            <p className="text-[#fff] hover:translate-x-2 duration-500">9363935429</p>
                            <p className="text-[#fff] hover:translate-x-2 duration-500">9343565251</p>
                        </div>
                    </div>
                </div>
                <div className="h-[80px] bg-contain bg-repeat w-100" style={{backgroundImage:"url(https://ik.imagekit.io/madhav/border.png)"}}>
                </div>
                <p className="px-8 py-5 text-[#fff] text-sm">Copyright &copy; <a className="text-[#facc15] font-medium" href="/">Madhav Crackers</a> all right reserved.</p>
            </div>
        </>
    )
}

export default Footer;