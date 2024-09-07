import React from "react";
import {Carousel} from 'antd'

const Banner1Desk="https://ik.imagekit.io/madhav/Banner/banner1-desk.png"
const Banner2Desk="https://ik.imagekit.io/madhav/Banner/banner2-desk.png"
const Banner1Mob="https://ik.imagekit.io/madhav/Banner/banner1-mob.png"
const Banner2Mob="https://ik.imagekit.io/madhav/Banner/banner2-mob.png"

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