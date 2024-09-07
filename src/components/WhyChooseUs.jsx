import React from "react";
import { GiFireworkRocket } from "react-icons/gi";
import { IoMdPricetag } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineSentimentSatisfied } from "react-icons/md";

function WhyChooseUs() {
    return (
        <div className="py-12">
            <h1 className="text-2xl sm:text-3xl font-medium text-[#2563eb] text-center">Why Choose Us</h1>
            <p className="mx-8 sm:mx-3 text-center my-4">Our services created a positive image among our customers</p>
            <div className="flex flex-wrap items-center justify-center gap-8 my-12">
                <div className="flex flex-col items-center gap-3 py-8 px-12 w-[280px] rounded-xl  shadow-lg hover:-translate-y-2 duration-500">
                    <GiFireworkRocket className="text-5xl text-[#991b1b]" />
                    <p className="font-medium">Quality Products</p>
                </div>
                <div className="flex flex-col items-center gap-3 py-8 px-12 w-[280px] rounded-xl  shadow-lg hover:-translate-y-2 duration-500">
                    <IoMdPricetag className="text-5xl text-[#eab308]" />
                    <p className="font-medium">Genuine Price</p>
                </div>
                <div className="flex flex-col items-center gap-3 py-8 px-12 w-[280px] rounded-xl shadow-lg hover:-translate-y-2 duration-500">
                    <TbTruckDelivery className="text-5xl text-[#16a34a]" />
                    <p className="font-medium">Fast Delivery</p>
                </div>
                <div className="flex flex-col items-center gap-3 py-8 px-12 w-[280px] rounded-xl shadow-lg hover:-translate-y-2 duration-500">
                    <MdOutlineSentimentSatisfied className="text-5xl text-[#f43f5e]" />
                    <p className="font-medium">Satisfaction</p>
                </div>
            </div>
        </div>
    )
}

export default WhyChooseUs;