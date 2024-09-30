import React, { useState } from "react";
import Marquee from "react-fast-marquee";
import { useNavigate } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function Categories() {
    const categorieImages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const navigate = useNavigate()
    const [dir, setDir] = useState("left")
    return (
        <div className="py-12 flex flex-col items-center bg-[#4535C1]">
            <h1 className="text-2xl sm:text-3xl text-center font-medium text-[#facc15]">Our Categories...</h1>
            <p className="mt-3 text-center text-[#fff] mx-5 sm:mx-2">Explore our product categories to discover the perfect fireworks for your special occasions</p>
            <div className="relative w-[100%]">
                {/* <Marquee className="my-12"
                    gradient={window.innerWidth <= 768 ? false : true}
                    gradientColor="#4535C1"
                    pauseOnHover={true}
                    direction={dir}
                >
                    {
                        categorieImages.map((value) => {
                            return (
                                <img className="w-[280px] py-5 mx-5 hover:rounded-xl hover:-translate-y-3 duration-500 hover:drop-shadow-xl" key={value} src={`https://ik.imagekit.io/madhav/categories/category${value}.png`} alt="best online crackers" />
                            )
                        })
                    }
                </Marquee> */}
                <Carousel
                    additionalTransfrom={0}
                    arrows
                    autoPlay
                    autoPlaySpeed={2000}
                    centerMode={true}
                    className=""
                    containerClass="container-with-dots"
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    infinite
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={80}
                    pauseOnHover
                    renderArrowsWhenDisabled={false}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={{
                        desktop: {
                            breakpoint: {
                                max: 3000,
                                min: 1024
                            },
                            items: 4,
                            partialVisibilityGutter: 30
                        },
                        mobile: {
                            breakpoint: {
                                max: 464,
                                min: 0
                            },
                            items: 1,
                            partialVisibilityGutter: 30
                        },
                        tablet: {
                            breakpoint: {
                                max: 1024,
                                min: 464
                            },
                            items: 3,
                            partialVisibilityGutter: 30
                        }
                    }}
                    rewind={false}
                    rewindWithAnimation={false}
                    rtl={false}
                    shouldResetAutoplay
                    showDots={false}
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                >
                    {
                        categorieImages.map((value) => {
                            return (
                                <img className="w-[280px] py-5 mx-5 hover:rounded-xl hover:-translate-y-3 duration-500 hover:drop-shadow-xl" key={value} src={`https://ik.imagekit.io/madhav/categories/category${value}.png`} alt="best online crackers" />
                            )
                        })
                    }
                </Carousel>
            </div>
            <button className="py-2 px-8 rounded-lg bg-[#fff] hover:-translate-y-2 duration-500" onClick={() => {
                navigate('/quick-purchase')
            }}>Quick Purchase</button>
        </div>
    )
}

export default Categories;