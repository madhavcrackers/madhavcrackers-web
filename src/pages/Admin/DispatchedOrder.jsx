import React, { useEffect, useState } from 'react'
import { Typography } from 'antd'
import { useSelector } from 'react-redux';
import OrderCard from '../../components/OrderCard';
const { Title } = Typography

function DispatchedOrder() {
    const [displayOrders, setDisplayOrders] = useState([])
    const ordersState = useSelector((state) => state.orders.orders);
    useEffect(()=>{
        setDisplayOrders(ordersState?.filter((order)=>{return order?.orderStatus=="Order dispatched"}))
    },[ordersState])
    return (
        <div className='w-100'>
            <Title level={5}>Dispatched Orders</Title>
            <div className='py-4 flex gap-8 flex-wrap'>
                {
                    displayOrders && displayOrders.length > 0 ?
                        <>
                            {
                                displayOrders && displayOrders.map((order, index) => {
                                    return (
                                        <OrderCard key={index} isAdmin={true} order={order} />
                                    )
                                })
                            }
                        </>
                        :
                        <p>No orders dispatched</p>
                }
            </div>
        </div>
    )
}


export default DispatchedOrder;