import React from 'react'
import { FloatButton,message } from 'antd';
import NavBar1 from '../components/NavBar1';
import NavBar2 from '../components/NavBar2';
import NavBar3 from '../components/NavBar3';
import Payment from '../components/Payment';
import AboutFooter from '../components/AboutFooter';
import Footer from '../components/Footer';
function PaymentInfo(){
    const [messageApi,ContextHolder]=message.useMessage()
    return(
        <>
            {ContextHolder}
            <NavBar1/>
            <NavBar2/>
            <NavBar3/>
            <div className='bg-gradient-to-r from-blue-800 to-indigo-900 py-24 gap-4 flex justify-center items-center flex-col'>
                    <h1 className='text-2xl sm:text-4xl font-bold text-[#fff]'>Payment Information</h1>
                    <p className='px-6 text-center text-md sm:text-lg text-[#fff]'>Please find our Bank account details for payment.</p>
            </div>
            <Payment/>
            <div className='px-4 sm:px-12 md:px-24 py-4'>
            <hr className='border-[#ccc]' />
            </div>
            <AboutFooter/>
            <Footer/>
            <FloatButton.BackTop/>
        </>
    )
}

export default PaymentInfo;