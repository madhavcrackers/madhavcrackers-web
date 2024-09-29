import React, { useEffect, useState } from 'react'
import { Divider, Typography } from 'antd'
import { useSelector } from 'react-redux';
const { Title } = Typography

function Dashboard() {
    const ordersState = useSelector((state) => state.orders.orders);
    const inventory=useSelector((state)=>state?.inventory)
    const [revenue,setRevenue]=useState(0)
    useEffect(()=>{
        let amt=0
        ordersState?.map((order)=>{
            if(order?.orderStatus=="Order dispatched")
                amt=amt+order?.cart?.total
        })
        setRevenue(amt)
    },[ordersState])
    return (
        <div className='w-100'>
            <Title level={5}>Dashboard</Title>
            <Divider orientation='left'>Sales</Divider>
            <div className='flex gap-5 flex-wrap'>
                <div className="relative px-4 py-4 w-[200px] h-[100px] bg-[#fef2f2] border-[1px] border-[#ef4444] rounded-xl">
                    <h1 className="font-inter font-medium text-[16px]">Total Orders</h1>
                    <p className="my-1 text-lg font-inter text-right font-bold pe-5 pt-2">{ordersState?.length}</p>
                </div>
                <div className="relative px-4 py-4 w-[200px] h-[100px] bg-[#fefce8] border-[1px] border-[#eab308] rounded-xl">
                    <h1 className="font-inter font-medium text-[16px]">Today Orders</h1>
                    <p className="my-1 text-lg font-inter text-right font-bold pe-5 pt-2">{ordersState?.filter((order)=>{return new Date(order?.orderedAt).toDateString()==new Date().toDateString()}).length}</p>
                </div>
                <div className="relative px-4 py-4 w-[200px] h-[100px] bg-[#eef2ff] border-[1px] border-[#6366f1] rounded-xl">
                    <h1 className="font-inter font-medium text-[16px]">Waiting Orders</h1>
                    <p className="my-1 text-lg font-inter text-right font-bold pe-5 pt-2">{ordersState?.filter((order)=>{return order?.orderStatus=="Waiting for payment"}).length}</p>
                </div>
                <div className="relative px-4 py-4 w-[200px] h-[100px] bg-[#f0fdfa] border-[1px] border-[#14b8a6] rounded-xl">
                    <h1 className="font-inter font-medium text-[16px]">Picked Orders</h1>
                    <p className="my-1 text-lg font-inter text-right font-bold pe-5 pt-2">{ordersState?.filter((order)=>{return order?.orderStatus=="Order picked"}).length}</p>
                </div>
                <div className="relative px-4 py-4 w-[200px] h-[100px] bg-[#f0f9ff] border-[1px] border-[#22d3ee] rounded-xl">
                    <h1 className="font-inter font-medium text-[16px]">Dispatched Orders</h1>
                    <p className="my-1 text-lg font-inter text-right font-bold pe-5 pt-2">{ordersState?.filter((order)=>{return order?.orderStatus=="Order dispatched"}).length}</p>
                </div>
                <div className="relative px-4 py-4 w-[200px] h-[100px] bg-[#fff1f2] border-[1px] border-[#f43f5e] rounded-xl">
                    <h1 className="font-inter font-medium text-[16px]">Online Revenue</h1>
                    <p className="my-1 text-lg font-inter text-right font-bold pe-5 pt-2">₹ {revenue}</p>
                </div>
            </div>
            <Divider orientation='left'>Stock</Divider>
            <div className='flex gap-5 flex-wrap'>
                <div className="relative px-4 py-4 w-[200px] h-[100px] bg-[#fef2f2] border-[1px] border-[#ef4444] rounded-xl">
                    <h1 className="font-inter font-medium text-[16px]">Total Categories</h1>
                    <p className="my-1 text-lg font-inter text-right font-bold pe-5 pt-2">{inventory?.categories.length}</p>
                </div>
                <div className="relative px-4 py-4 w-[200px] h-[100px] bg-[#fefce8] border-[1px] border-[#eab308] rounded-xl">
                    <h1 className="font-inter font-medium text-[16px]">Today Products</h1>
                    <p className="my-1 text-lg font-inter text-right font-bold pe-5 pt-2">{inventory?.products.length}</p>
                </div>
            </div>
        </div>
    )
}


export default Dashboard;