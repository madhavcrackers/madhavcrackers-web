import React from 'react'
import NavBar1 from '../components/NavBar1';
import NavBar2 from '../components/NavBar2';
import NavBar3 from '../components/NavBar3';
import Banner from '../components/Banner';
import AboutUs from '../components/AboutUs';
import Categories from '../components/Categories';
import WhyChooseUs from '../components/WhyChooseUs';
import BottomBanner from '../components/BottomBanner';
import Footer from '../components/Footer';
function Home(){
    return(
        <>
            <NavBar1/>
            <NavBar2/>
            <NavBar3/>
            <Banner/>
            <AboutUs/>
            <Categories/>
            <WhyChooseUs/>
            <BottomBanner/>
            <Footer/>
        </>
    )
}

export default Home;