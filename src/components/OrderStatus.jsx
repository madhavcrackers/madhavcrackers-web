import React, { useEffect, useState } from "react";
import { Input, Button, message } from 'antd'
import Loader from '../components/Loader'
import OrderCard from "./OrderCard";
import { useSelector, useDispatch } from "react-redux";
import { trackOrders } from '../actions/UserAction'
import { setOrdersFail } from '../slices/OrdersSlices'

function OrderStatus() {
    const dispatch = useDispatch()
    const [orderID, setOrderID] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")
    const ordersState = useSelector((state) => state.orders.orders);
    const loading = useSelector((state) => state.loader.loading);

    const [orders, setOrders] = useState([])

    useEffect(() => {
        setOrders(ordersState)
    }, [ordersState])

    const handleSubmit = () => {
        let orderReg = /[0-9]{4}-[0-9]{4}-[0-9]{6}/
        let mobReg = /[6789]{1}[0-9]{9}/
        if (orderReg.test(orderID) || mobReg.test(mobileNumber)) {
            trackOrders(dispatch, orderID, mobileNumber)
        }
        else
            message.error("Please enter valid order ID or Mobile number")
    }

    return (
        <>
            {
                loading ?
                    <Loader />
                    :
                    <>
                        <div className='bg-gradient-to-r from-blue-800 to-indigo-900 py-20 gap-4 flex justify-center items-center flex-col'>
                            <h1 className='text-2xl sm:text-4xl font-bold text-[#fff]'>Track Order</h1>
                            <p className='px-6 text-center text-md sm:text-lg text-[#fff]'>Track your order status here</p>
                            {
                                orders.length > 0 && (
                                    <Button danger type="primary" onClick={() => {
                                        dispatch(setOrdersFail())
                                        setOrderID("")
                                        setMobileNumber("")
                                    }}>Clear Orders</Button>
                                )
                            }
                        </div>
                        {
                            orders && orders.length > 0 ?
                                <div className='md:py-24 py-12 px-4 sm:px-12 md:px-24 flex gap-8 flex-wrap'>
                                    {
                                        orders && orders.map((order, index) => {
                                            return (
                                                <OrderCard key={index} order={order} />
                                            )
                                        })
                                    }

                                </div>
                                :
                                <div className="w-full py-12 flex justify-center">
                                    <form className="flex flex-col md:flex-row items-end gap-2 md:gap-8 items-center md:items-end">
                                        <div className="my-1">
                                            <p className='font-medium text-blue-900 mb-1'>Order Id</p>
                                            <Input className="w-[300px]" type="text" size="large" placeholder="Example : 0000-0000-000000" onChange={(e) => {
                                                setOrderID(e.target.value)
                                            }} value={orderID} />
                                        </div>
                                        <p className="text-blue-900 pb-3 font-medium">(or)</p>
                                        <div className="my-1">
                                            <p className='font-medium text-blue-900 mb-1'>Mobile Number</p>
                                            <Input className="w-[300px]" type="text" size="large" placeholder="Example : 9876543210" onChange={(e) => {
                                                setMobileNumber(e.target.value)
                                            }} value={mobileNumber} />
                                        </div>
                                        <Button className="mb-1 w-full md:w-auto mt-3 sm:mt-2" type="primary" size="large" danger onClick={handleSubmit}>Track Order</Button>
                                    </form>
                                </div>
                        }
                    </>
            }
        </>
    )
}

export default OrderStatus;