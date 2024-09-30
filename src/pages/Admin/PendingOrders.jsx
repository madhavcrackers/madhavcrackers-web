import React, { useEffect, useState } from 'react'
import { Typography, Radio } from 'antd'
import { useSelector } from 'react-redux';
import OrderCard from '../../components/OrderCard';
const { Title } = Typography

function PendingOrders() {
    const [displayOrders, setDisplayOrders] = useState([])
    const ordersState = useSelector((state) => state.orders.orders);
    const [filter, setFilter] = useState(0)
    const options = [
        { label: 'All Orders', value: 0 },
        { label: 'Waiting for payment', value: 1 },
        { label: 'Picked orders', value: 2 },
    ];
    useEffect(() => {
        if (filter == 0)
            setDisplayOrders(ordersState.filter((order) => { return order.orderStatus != "Order dispatched" }))
        if (filter == 1)
            setDisplayOrders(ordersState.filter((order) => { return order.orderStatus == "Waiting for payment" }))
        if (filter == 2)
            setDisplayOrders(ordersState.filter((order) => { return order.orderStatus == "Order picked" }))
    }, [filter])
    return (
        <div className='w-100'>
            <Title level={5}>Pending Orders</Title>
            <div className='flex py-4'>
                <Radio.Group
                    block
                    options={options}
                    value={filter}
                    optionType="button"
                    buttonStyle="solid"
                    onChange={(e) => {
                        setFilter(e.target.value)
                    }}
                />
            </div>
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
                        <p>No orders found</p>
                }
            </div>
        </div>
    )
}


export default PendingOrders;