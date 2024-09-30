import React from 'react'
import { FloatButton, Result } from 'antd';
import NavBar1 from '../components/NavBar1';
import NavBar2 from '../components/NavBar2';
import NavBar3 from '../components/NavBar3';
import AboutFooter from '../components/AboutFooter';
import Footer from '../components/Footer';
function Error404() {
    return (
        <div className='relative'>
            <NavBar1 />
            <NavBar2 />
            <NavBar3 />
            <Result status={404} title={"Page not found"}/>
            <AboutFooter />
            <Footer />
            <FloatButton.BackTop />
        </div>
    )
}

export default Error404;