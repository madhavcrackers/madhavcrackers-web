import React, { useEffect, useState } from 'react';
import { Typography, Button, Divider, message, Badge, Tag, Drawer, Space, Modal, Select } from 'antd'
import { PiShoppingCartSimpleDuotone } from "react-icons/pi";
import { MdOutlineEmail } from "react-icons/md";
import { IoCall, IoLogoWhatsapp } from "react-icons/io5";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaTruckLoading } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { updateOrder } from '../actions/AdminAction'

function OrderCard({ order, isAdmin }) {
    const [openCart, setOpenCart] = useState(false)
    const [open, setOpen] = useState(false)
    const [products, setProducts] = useState([])
    const [currentOrder, setCurrentOrder] = useState({})
    const dispatch = useDispatch()
    const onCartClose = () => {
        setOpenCart(false)
    }

    const orderStatus = [
        {
            label: "Waiting for payment",
            value: "Waiting for payment"
        },
        {
            label: "Order picked",
            value: "Order picked"
        },
        {
            label: "Order dispatched",
            value: "Order dispatched"
        }
    ]

    const paymentStatus = [
        {
            label: "Not paid",
            value: "Not paid"
        },
        {
            label: "Paid",
            value: "Paid"
        }
    ]

    useEffect(() => {
        setProducts(order?.cart?.crackers)
        setCurrentOrder(order)
    }, [])


    const submitUpdate = () => {
        if (order?.paymentStatus != currentOrder?.paymentStatus || order?.orderStatus != currentOrder?.orderStatus) {
            updateOrder(dispatch, currentOrder, order?.id)
        }
        else
            message.info("Please select status first")
    }

    return (
        <>
            <div className='order-card bg-[#ecfeff] w-[320px] p-4 rounded-xl border-[1px] border-[#22d3ee] relative'>
                <div className='order-card-header flex justify-between items-center'>
                    <div className='flex flex-col gap-1'>
                        <p className='font-medium'>Order Number</p>
                        <h1 className='font-bold'>#{order?.orderID}</h1>
                    </div>
                    <Badge count={order?.cart?.totalQty} size='small' color='#3b82f6' className='me-2 cursor-pointer'>
                        <div className='bg-white p-2 rounded-xl drop-shadow-lg' onClick={() => {
                            setOpenCart(true)
                        }}>
                            <PiShoppingCartSimpleDuotone className='text-xl text-[#3b82f6]' />
                        </div>
                    </Badge>
                </div>
                <Divider className='my-3' />
                {
                    isAdmin && (
                        <div className='text-xs font-medium flex flex-col gap-1 text-[#475569]'>
                            <p>{order?.customerInfo?.name}</p>
                            <p>{order?.customerInfo?.address}</p>
                            <p>{order?.customerInfo?.city}-{order?.customerInfo?.pincode},{order?.customerInfo?.state}.</p>
                        </div>
                    )
                }
                {
                    isAdmin && (
                        <div className='mt-3'>
                            <a href={`mailto:${order?.customerInfo?.email}`} className='flex items-center text-xs gap-1' target='_blank'>
                                <MdOutlineEmail className='text-sm' />
                                {order?.customerInfo?.email}
                            </a>
                            <div className='py-2 flex gap-4'>
                                <a href={`tel:${order?.customerInfo?.mobileNumber}`} className='flex items-center text-xs gap-1' target='_blank'>
                                    <IoCall className='text-sm' />
                                    {order?.customerInfo?.mobileNumber}
                                </a>
                                <a href={`https://api.whatsapp.com/send?phone=+91${order?.customerInfo?.whatsappNumber}&text=Hello20%from20%Madhav20%Crackers:`} className='flex items-center text-xs gap-1' target='_blank'>
                                    <IoLogoWhatsapp className='text-sm' />
                                    {order?.customerInfo?.whatsappNumber}
                                </a>
                            </div>
                        </div>
                    )
                }
                <div className='flex gap-2 py-2'>
                    <Tag className='flex items-center gap-1 py-[1px] w-fit' color='red'>
                        <FaMoneyCheckDollar className='text-sm' />
                        <p className='text-[10px] font-medium'>{order?.paymentStatus}</p>
                    </Tag>
                    <Tag className='flex items-center gap-1 py-[1px] w-fit' color='blue'>
                        <FaTruckLoading className='text-sm' />
                        <p className='text-[10px] font-medium'>{order?.orderStatus}</p>
                    </Tag>
                </div>
                <p className='flex items-center text-xs gap-1 font-medium mt-1 text-[#15803d]' target='_blank'>
                    <IoTime className='text-sm' />
                    {timeFormat(order?.orderedAt)}
                </p>
                {
                    isAdmin && (
                        <Button className='absolute right-3 bottom-3' size='small' icon={<MdModeEditOutline />} type='primary' shape='round' onClick={() => {
                            setOpen(true)
                        }} />
                    )
                }
            </div>

            {/* Divider */}

            <Drawer
                title={`#${order?.orderID}`}
                placement="right"
                size={'large'}
                onClose={onCartClose}
                open={openCart}
                extra={
                    <Space>
                        <Button onClick={onCartClose}>Cancel</Button>
                        <Button type="primary" onClick={onCartClose}>
                            OK
                        </Button>
                    </Space>
                }
            >
                <div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Product name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Quantiy
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Total
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products && products.map((product, index) => {
                                    return (
                                        <tr key={index} className="bg-white border-b">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {product?.productName}<br />
                                                <p className='text-xs text-gray-500 mt-1'>{product?.category}</p>
                                            </th>
                                            <td className="px-6 py-4">
                                                ₹{product?.price}
                                            </td>
                                            <td className="px-6 py-4">
                                                {product?.qty}
                                            </td>
                                            <td className="px-6 py-4">
                                                ₹{product?.total}
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            <tr className="bg-white border-b">
                                <th colSpan={3} scope="row" className="px-6  text-right py-4 font-medium text-gray-900 whitespace-nowrap">
                                    Sub Total
                                </th>
                                <td className="px-6 py-4 font-bold">
                                    ₹ {order?.cart?.subtotal}
                                </td>
                            </tr>
                            <tr className="bg-white border-b">
                                <th colSpan={3} scope="row" className="px-6 text-right py-4 font-medium text-gray-900 whitespace-nowrap">
                                    Packing Charge
                                </th>
                                <td className="px-6 py-4 font-bold">
                                    ₹ 70
                                </td>
                            </tr>
                            <tr className="bg-white border-b">
                                <th colSpan={3} scope="row" className="px-6 py-4 text-right  font-medium text-gray-900 whitespace-nowrap">
                                    Total Amount
                                </th>
                                <td className="px-6 py-4 font-bold">
                                    ₹ {order?.cart?.total}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Drawer>


            {/* Update Model */}
            <Modal
                open={open}
                title={`Update Order : ${currentOrder?.orderID}`}
                onCancel={() => { setOpen(false) }}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        <Button type='primary' onClick={submitUpdate}>Update Status</Button>
                        <CancelBtn />
                    </>)}
            >
                <div className='my-5'>
                    <p className='font-medium mb-1'>Update order status</p>
                    <Select className='w-full' defaultValue={currentOrder?.orderStatus} value={currentOrder?.orderStatus} options={orderStatus} onChange={(value) => {
                        setCurrentOrder({ ...currentOrder, orderStatus: value })
                    }} />
                </div>
                <div className='my-5'>
                    <p className='font-medium mb-1'>Update payment status</p>
                    <Select className='w-full' defaultValue={currentOrder?.paymentStatus} value={currentOrder?.paymentStatus} options={paymentStatus} onChange={(value) => {
                        setCurrentOrder({ ...currentOrder, paymentStatus: value })
                    }} />
                </div>
            </Modal >
        </>
    )
}

function timeFormat(str) {
    const date = new Date(str)
    return date.toDateString()
}

export default OrderCard;