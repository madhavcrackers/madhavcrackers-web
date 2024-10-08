import React from 'react'
import { FloatButton, message } from 'antd';
import NavBar1 from '../components/NavBar1';
import NavBar2 from '../components/NavBar2';
import NavBar3 from '../components/NavBar3';
import Banner from '../components/Banner';
import AboutUs from '../components/AboutUs';
import Categories from '../components/Categories';
import WhyChooseUs from '../components/WhyChooseUs';
import AboutFooter from '../components/AboutFooter';
import BottomBanner from '../components/BottomBanner';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
function Home() {
    const [messageApi, ContextHolder] = message.useMessage()
    return (
        <div className='relative'>
            <Helmet>
                <title>Purchase Best Online Crackers Sivakasi - Madhav Crackers</title>
                <meta name="description" content="Buy quality crackers straight from Sivakasi for your Diwali celebrations online at wholesale price with faster delivery from Madhav Crackers"></meta>
            </Helmet>
            {ContextHolder}
            <NavBar1 />
            <NavBar2 />
            <NavBar3 />
            <Banner />
            <AboutUs />
            <Categories />
            <WhyChooseUs />
            <BottomBanner/>
            <AboutFooter />
            <Footer />
            <FloatButton.BackTop />
        </div>
    )
}

export default Home;