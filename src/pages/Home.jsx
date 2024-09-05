import React from 'react'
import NavBar1 from '../components/NavBar1';
import NavBar2 from '../components/NavBar2';
import NavBar3 from '../components/NavBar3';
import Banner from '../components/Banner';

function Home(){
    return(
        <>
            <NavBar1/>
            <NavBar2/>
            <NavBar3/>
            <Banner/>
        </>
    )
}

export default Home;