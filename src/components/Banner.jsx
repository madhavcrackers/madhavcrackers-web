import React from "react";
import {Carousel} from 'antd'
import Banner1Desk from '../assets/banner1-desk.png'
import Banner2Desk from '../assets/banner2-desk.png'
import Banner1Mob from '../assets/banner1-mob.png'
import Banner2Mob from '../assets/banner2-mob.png'

function Banner(){
    const bannerDesk=[
        Banner1Desk,Banner2Desk
    ]
    const bannerMob=[Banner1Mob,Banner2Mob]
    return(
        <Carousel autoplay={true}>
            {
                window.innerWidth<=768?
                bannerMob.map((banner,index)=>{
                    return(
                        <img src={banner} key={index}/>
                    )
                }):
                bannerDesk.map((banner,index)=>{
                    return(
                        <img src={banner} key={index}/>
                    )
                })
            }
        </Carousel>
    )
}

export default Banner;