import React from 'react'
import { FloatButton, message } from 'antd';
import NavBar1 from '../components/NavBar1';
import NavBar2 from '../components/NavBar2';
import NavBar3 from '../components/NavBar3';
import AboutFooter from '../components/AboutFooter';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
function ContactUs() {
    const [messageApi, ContextHolder] = message.useMessage()
    return (
        <>
            <Helmet>
                <title>Contact Us | Madhav Crackers</title>
                <meta name="description" content="Buy Quality Crackers from sivakasi factory"/>
            </Helmet>
            {ContextHolder}
            <NavBar1 />
            <NavBar2 />
            <NavBar3 />
            <div className='px-4 sm:px-12 md:px-24 pt-12 pb-4'>
                <h1 className='text-2xl font-bold text-[#4535C1]'>Madhav Crackers</h1>
                <p className='text-md mt-2 font-medium'>Leading wholesale dealer for Sivakasi Crackers</p>
                <iframe className='w-[100%] my-8' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7868.6963690393095!2d77.8652788!3d9.5652238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06d30039848a91%3A0x75761d34bec380e2!2sMadhav%20Crackers!5e0!3m2!1sen!2sin!4v1727192602746!5m2!1sen!2sin" height="450" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                <hr className='border-[#ccc]' />
                <p className='text-md mt-2 text-justify'>Madhav Crackers is the leading wholesale dealer offering quality crackers straight from Sivakasi, Tamilnadu. Our crackers are of the best quality comes at affordable price for everyone. We take immense effort is ensuring the quality of the products and packaging. We ship the products through leading transport agencies across india.</p>
                <p className='text-md my-6 text-justify'>Our Crackers are well suited for Diwali Celebrations, New Year Celebrations, Corporate events Celebrations, Marriage functions, Birthdays and more.</p>
                <p className='text-md my-6 text-left'><span className='font-medium'>Brands we deal : </span>Standard, Mothers, Sony, Vanitha etc.</p>
                <hr className='border-[#ccc]' />
                <p className='text-lg mt-6 mb-2 text-left'><span className='font-medium'>Our Store</span></p>
                <p className='text-md my-1 mb-6 text-left'>No: 4/273-11/7, Virudhunagar to Sivakasi Main Road,
                    Amathur, Sivakasi.</p>
                <hr className='border-[#ccc]' />
                <p className='text-md mt-6 mb-2 text-left'><span className='font-medium'>Mobile Number : </span><a href='tel:9363935429'>9363935429</a></p>
                <p className='text-md mb-6 text-left'><span className='font-medium'>Email : </span><a href='mailto:madhavcrackers@gmail.com'>madhavcrackers@gmail.com</a></p>
                <hr className='border-[#ccc]' />
            </div>
            <AboutFooter />
            <Footer />
            <FloatButton.BackTop />
        </>
    )
}

export default ContactUs;