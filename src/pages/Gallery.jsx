import React, { useEffect } from 'react'
import { FloatButton, message, Image } from 'antd';
import NavBar1 from '../components/NavBar1';
import NavBar2 from '../components/NavBar2';
import NavBar3 from '../components/NavBar3';
import AboutFooter from '../components/AboutFooter';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import PhotoAlbum from "react-photo-album";
import { useSelector, useDispatch } from 'react-redux';
import { getGallery } from '../actions/UserAction'
function Gallery() {
    const dispatch = useDispatch()
    const [messageApi, ContextHolder] = message.useMessage()
    const { gallery, galleryLoaded } = useSelector((state) => state.others)
    const loading = useSelector((state) => state.loader.loading);
    useEffect(() => {
        if (!galleryLoaded)
            getGallery(dispatch)
    }, [])
    return (
        <>
            {ContextHolder}
            {
                loading ?
                    <Loader />
                    :
                    <>
                        <NavBar1 />
                        <NavBar2 />
                        <NavBar3 />
                        <div className='bg-gradient-to-r from-blue-800 to-indigo-900 py-24 gap-4 flex justify-center items-center flex-col'>
                            <h1 className='text-2xl sm:text-4xl font-bold text-[#fff]'>Our Gallery</h1>
                        </div>
                        <div className='py-12 px-4 sm:px-12 md:px-24 flex flex-wrap gap-8 justify-center'>
                            {
                                gallery && gallery.map((image, index) => {
                                    return (
                                        <Image width={280} key={index} src={image.src} />
                                    )
                                })
                            }
                        </div>
                        <div className='py-4 px-4 sm:px-12 md:px-24'>
                            <hr className='border-[#ccc]' />
                        </div>
                        <AboutFooter />
                        <Footer />
                        <FloatButton.BackTop />
                    </>
            }
        </>
    )
}

export default Gallery;