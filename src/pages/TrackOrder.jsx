import React from 'react'
import { FloatButton, message } from 'antd';
import NavBar1 from '../components/NavBar1';
import NavBar2 from '../components/NavBar2';
import NavBar3 from '../components/NavBar3';
import OrderStatus from '../components/OrderStatus';
import AboutFooter from '../components/AboutFooter';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';

function TrackOrder() {
    const [messageApi, ContextHolder] = message.useMessage()
    return (
        <div className='relative'>
            <Helmet>
                <title>Track order | Madhav Crackers</title>
                <meta name="description" content="Track your orders via mobile number." />
                <meta name="keywords" content="online crackers sivakasi, Madhav Crackers, Madhav Pattasu, Diwali Crackers Sivakasi,best cracker shop sivakasi tamilnadu"></meta>
            </Helmet>
            {ContextHolder}
            <NavBar1 />
            <NavBar2 />
            <NavBar3 />
            <OrderStatus />
            <AboutFooter />
            <Footer />
            <FloatButton.BackTop />
        </div>
    )
}

export default TrackOrder;