import React from 'react'
import AboutImage from '../assets/about-madhav-crackers.png'

function AboutUs(){
    return(
        <div className='flex flex-col sm:flex-row py-16 px-5'>
            <div className='w-[100%] sm:w-[40%] flex justify-center items-center'>
                <img className='w-[70%] sm:w-[60%]' src={AboutImage} alt='best crackers shop in sivakasi'/>
            </div>
            <div className='w-[100%] sm:w-[60%]'>
                <h1 className='text-2xl sm:text-3xl text-[#e11d48] font-bold py-5 sm:py-0'>About<span className='text-[#2563eb]'> Madhav Crackers</span></h1>
                <p className='sm:me-16 text-justify leading-7 sm:mt-4'>We provide all top branded deepavali crackers & other occasional Fire crackers retails and wholesale. We build your surprising occasion with lighting and sensational Gift box with our inspiring crackers. Buy our Branded crackers with Low price & Get excellent discounts. We provide variety of firecrackers including single and multi-sound crackers, sparklers, ground chakkars, flower pots, twinkling stars, pencils, fancy rockets, aerial and fancy fireworks, fancy whistling varieties, amorces, chorsa garlands, atom crackers and electric crackers. We are specialists in fireworks gift boxes and we have variety of gift boxes. We introduce new crackers and packages every year for our beloved customers.</p>
            </div>
        </div>
    )
}

export default AboutUs;