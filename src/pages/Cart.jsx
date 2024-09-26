import React, { useEffect, useState } from 'react'
import { Button } from 'antd';
import NavBar1 from '../components/NavBar1';
import NavBar2 from '../components/NavBar2';
import NavBar3 from '../components/NavBar3';
import AboutFooter from '../components/AboutFooter';
import Footer from '../components/Footer';
import ProductList from '../components/Products/ProductList';
import { getSettings } from '../actions/UserAction';
import { useSelector ,useDispatch} from 'react-redux';
import { FaArrowRight } from "react-icons/fa6";
import {FaLongArrowAltRight} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

function Cart() {
    const dispatch=useDispatch()
    const navigate = useNavigate()
    const [crackers, setCrackers] = useState([])
    const cart = useSelector((state) => state.order.cart)
    const settings = useSelector((state) => state.product.settings)
    const productLoaded = useSelector((state) => state.product.loaded)
    useEffect(() => {
        if (!productLoaded) {
            getSettings(dispatch)
        }
    }, [])
    useEffect(() => {
        setCrackers(cart?.crackers)
        localStorage.setItem("madhav_cart", JSON.stringify(cart))
    }, [cart])
    return (
        <div>
            <NavBar1 />
            <NavBar2 />
            <NavBar3 />
            <div className='w-full px-4 sm:px-6 md:px-12 py-8'>
                <h1 className='text-lg font-bold text-[#4535C1]'>Manage Cart</h1>
                <p className='font-medium mt-1'>Minimum order value is Rs. {settings?.minimumAmount}</p>
            </div>
            <div className='w-full px-4 sm:px-6 md:px-12 pb-8'>
                {
                    crackers?.length == 0 ?
                        <div className='flex flex-col items-center gap-3 h-[25vh]'>
                            <p className='text-xl font-medium'>Your cart is empty..!</p>
                            <Button icon={<FaArrowRight />} type='link' onClick={() => {
                                navigate('/quick-purchase')
                            }}>Make Purchase</Button>
                        </div>
                        :
                        <div className='w-[100%] h-[auto] gap-8 sm:gap-0 overflow-y-hidden flex flex-col sm:flex-row'>
                            <div className='sm:w-[70%] w-[100%] h-[auto]'>
                                {
                                    crackers.map((cracker, index) => {
                                        return (
                                            <ProductList product={cracker} isCart={true} key={index} />
                                        )
                                    })
                                }
                            </div>
                            <div className='w-[100%] sm:w-[30%] h-fit flex justify-center'>
                                <div className='w-[100%] sm:w-[80%] bg-[#ccfbf1] py-4 px-4 rounded-lg flex flex-col gap-2'>
                                    <h1 className='font-bold text-[#4535C1]'>Notes</h1>
                                    <p>Currently delivering the crackers to All over India.</p>
                                    <h1 className='font-bold text-[#4535C1]'>Booking Summary</h1>
                                    <p className='font-medium'>Sub Total : <span className='font-normal'>Rs. {cart?.subtotal}</span></p>
                                    <p className='font-medium'>Secured Packing Charges : <span className='font-normal'>Rs. {cart?.total - cart?.subtotal}</span></p>
                                    <p className='font-medium'>Payable Amount : <span className='font-normal'>Rs. {cart?.total}</span></p>
                                    <p className='font-medium'>Transport charges : <span className='font-normal'>To be paid directly to transport agency</span></p>
                                    <Button className="w-full my-1" icon={<FaLongArrowAltRight />} type="primary" disabled={cart?.subtotal >= settings?.minimumAmount ? false : true} onClick={() => {
                                        navigate('/checkout')
                                    }} >Proceed to Book</Button>
                                </div>
                            </div>
                        </div>
                }
                <hr className='border-[#ccc]' />
            </div>
            <AboutFooter/>
            <Footer/>
        </div>
    )
}


export default Cart;