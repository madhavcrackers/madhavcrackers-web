import React from 'react'
import { FloatButton,message } from 'antd';
import NavBar1 from '../components/NavBar1';
import NavBar2 from '../components/NavBar2';
import NavBar3 from '../components/NavBar3';
import AboutUs from '../components/AboutUs';
import WhyChooseUs from '../components/WhyChooseUs';
import AboutFooter from '../components/AboutFooter';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
function About(){
    const [messageApi,ContextHolder]=message.useMessage()
    return(
        <>
            <Helmet>
                <title>About Us | Madhav Crackers</title>
                <meta name="description" content=" Madhav Crackers Sale! 2024 DIWALI SALE! 90% Discount  Pricelist"/>
            </Helmet>
            {ContextHolder}
            <NavBar1/>
            <NavBar2/>
            <NavBar3/>
            <div className='bg-gradient-to-r from-blue-800 to-indigo-900 py-24 gap-4 flex justify-center items-center flex-col'>
                    <h1 className='text-2xl sm:text-4xl font-bold text-[#fff]'>Madhav Crackers</h1>
                    <p className='px-6 text-center text-md sm:text-lg text-[#fff]'>Leading wholesale dealer for Sivakasi Crackers</p>
            </div>
            <AboutUs/>
            <WhyChooseUs/>
            <AboutFooter/>
            <Footer/>
            <FloatButton.BackTop/>
        </>
    )
}

export default About;