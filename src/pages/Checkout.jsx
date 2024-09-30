import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Select, message, Modal, Result } from 'antd';
import NavBar1 from '../components/NavBar1';
import NavBar2 from '../components/NavBar2';
import NavBar3 from '../components/NavBar3';
import Loader from '../components/Loader';
import Payment from '../components/Payment';
import Footer from '../components/Footer';
import { getSettings, updateCustomerInfoAndOrderId } from '../actions/UserAction';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getStates } from '../utils'
import { Helmet } from 'react-helmet';

function Checkout() {
    const [customerInfo, setCustomerInfo] = useState({ state: "", name: "", address: "", city: "", email: "", pincode: "", mobileNumber: "", whatsappNumber: "" })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector((state) => state.order.cart)
    const settings = useSelector((state) => state.product.settings)
    const productLoaded = useSelector((state) => state.product.loaded)
    const loading = useSelector((state) => state.loader.loading);
    const [sameNumber, setSameNumber] = useState(false)
    const [messageApi, ContextHolder] = message.useMessage()
    const [orderConfirmed, setOrderConfirmed] = useState(false)
    let order = JSON.parse(sessionStorage.getItem("madhav_order_details"))
    useEffect(() => {
        if (sameNumber)
            setCustomerInfo({ ...customerInfo, whatsappNumber: customerInfo?.mobileNumber })
        else
            setCustomerInfo({ ...customerInfo, whatsappNumber: "" })
    }, [sameNumber])
    useEffect(() => {
        if (!productLoaded) {
            getSettings(dispatch)
        }
    }, [])

    const handleBook = async (e) => {
        e.preventDefault()
        if (cart?.crackers.length == 0)
            message.error("Your cart is empty")
        if (sameNumber)
            setCustomerInfo({ ...customerInfo, whatsappNumber: customerInfo?.mobileNumber })
        const { name, state, city, address } = customerInfo
        if (name.trim() != "" && state.trim() != "" && city.trim() != "" && address.trim() != "") {
            const id = generateOrderId()
            const res = await updateCustomerInfoAndOrderId(dispatch, customerInfo, id)
            setOrderConfirmed(res)
        }
        else
            message.error("Please fill all the fields")
    }

    const handleClose = () => {
        setCustomerInfo({ state: "", name: "", address: "", city: "", email: "", pincode: "", mobileNumber: "", whatsappNumber: "" })
        setSameNumber(false)
        setOrderConfirmed(false)
        navigate('/quick-purchase')
    }

    return (
        <>{
            loading ?
                <Loader />
                :
                <div>
                    <Helmet>
                        <title>Checkout | Madhav Crackers</title>
                        <meta name="description" content="Best crackers shop in sivakasi." />
                    </Helmet>
                    <Modal width={800} footer={<p></p>} open={orderConfirmed} onCancel={handleClose}>
                        <Result
                            status="success"
                            title="Successfully Order placed!"
                            subTitle={<p className='font-medium text-black'>{`Order number: ${order?.orderID}  Make a payment for further dispatch process.`}</p>}
                            extra={[
                                <Button type="primary" key="console" onClick={() => {
                                    alert("Track order")
                                    navigate('/')
                                    handleClose()
                                }}>
                                    Track Order
                                </Button>,
                                <Button key="buy" onClick={() => {
                                    navigate('/quick-purchase')
                                    handleClose()
                                }}>Purchase Again</Button>,
                            ]}
                        />
                    </Modal>
                    {ContextHolder}
                    <NavBar1 />
                    <NavBar2 />
                    <NavBar3 />
                    <div className='w-full px-4 sm:px-6 md:px-12 py-8'>
                        <h1 className='text-lg font-bold text-[#4535C1]'>Complete Booking</h1>
                        <p className='font-medium mt-1'>Please enter your contact & address to complete booking.</p>
                    </div>
                    <form className='w-full px-4 sm:px-6 md:px-12 pb-8' onSubmit={handleBook}>
                        <div className='w-[100%] h-[auto] gap-8 sm:gap-0 overflow-y-hidden flex flex-col sm:items-end sm:flex-row'>
                            <div className='sm:w-[70%] w-[100%] flex flex-col gap-2 h-[auto]'>
                                <div className='w-100 flex flex-col sm:flex-row gap-3 sm:gap-5'>
                                    <div className="my-1 w-[100%] sm:w-[50%]">
                                        <p className='font-medium'>Full name</p>
                                        <input className="w-full mt-1 outline-none px-4 py-2 rounded-lg inter focus:border-[#00f] border-[2px]" placeholder='Enter full name' type="text" required onChange={(e) => {
                                            setCustomerInfo({ ...customerInfo, name: e.target.value })
                                        }} value={customerInfo?.name} />
                                    </div>
                                    <div className="my-1 w-[100%] sm:w-[50%]">
                                        <p className='font-medium'>Email Address</p>
                                        <input className="w-full mt-1 outline-none px-4 py-2 rounded-lg inter focus:border-[#00f] border-[2px]" placeholder='Enter valid email address' type="email" required onChange={(e) => {
                                            setCustomerInfo({ ...customerInfo, email: e.target.value })
                                        }} value={customerInfo?.email} />
                                        <p className='text-xs mt-2 font-medium'>Booking summary and payment information will be sent to this email.</p>
                                    </div>
                                </div>
                                <div className='w-100 flex flex-col sm:flex-row gap-3 sm:gap-5'>
                                    <div className="my-1 w-[100%] sm:w-[50%]">
                                        <p className='font-medium'>Mobile Number</p>
                                        <input className="w-full mt-1 outline-none px-4 py-2 rounded-lg inter focus:border-[#00f] border-[2px]" pattern='[6789]{1}[0-9]{9}' placeholder='10 digits mobile number' type="text" required onChange={(e) => {
                                            setCustomerInfo({ ...customerInfo, mobileNumber: e.target.value })
                                        }} value={customerInfo?.mobileNumber} title='Mobile Number should be 10 digits' />
                                        <Checkbox className='mt-2' onChange={(e) => {
                                            setSameNumber(e.target.checked)
                                        }}>Use mobile number as whatsapp number</Checkbox>
                                    </div>
                                    <div className="my-1 w-[100%] sm:w-[50%]">
                                        <p className='font-medium'>Whatsapp Number</p>
                                        <input className="w-full mt-1 outline-none px-4 py-2 rounded-lg inter focus:border-[#00f] border-[2px]" pattern='[6789]{1}[0-9]{9}' placeholder='10 digits mobile number' type="text" required onChange={(e) => {
                                            setCustomerInfo({ ...customerInfo, whatsappNumber: e.target.value })
                                        }} value={sameNumber ? customerInfo?.mobileNumber : customerInfo?.whatsappNumber} title='Mobile Number should be 10 digits' disabled={sameNumber} />
                                    </div>
                                </div>
                                <div className='w-100 flex flex-col sm:flex-row gap-3 sm:gap-5'>
                                    <div className="my-1 w-[100%]">
                                        <p className='font-medium'>Address</p>
                                        <textarea className='w-full mt-1 outline-none px-4 py-2 rounded-lg inter focus:border-[#00f] border-[2px]' placeholder='Enter your address' onChange={(e) => {
                                            setCustomerInfo({ ...customerInfo, address: e.target.value })
                                        }} value={customerInfo?.address} rows={4} required />

                                    </div>
                                </div>
                                <div className='w-100 flex flex-col sm:flex-row gap-3 sm:gap-5'>
                                    <div className="my-1 w-[100%] sm:w-[33%]">
                                        <p className='font-medium'>City</p>
                                        <input className="w-full mt-1 outline-none px-4 py-2 rounded-lg inter focus:border-[#00f] border-[2px]" placeholder='Delivery City' type="text" required onChange={(e) => {
                                            setCustomerInfo({ ...customerInfo, city: e.target.value })
                                        }} value={customerInfo?.city} />
                                        <p className='text-xs mt-2 font-medium'>Your package will be sent to the nearest transport office in this city and you will have to pick it up from there.</p>
                                    </div>
                                    <div className="my-1 w-[100%] sm:w-[33%]">
                                        <p className='font-medium'>Pincode</p>
                                        <input className="w-full mt-1 outline-none px-4 py-2 rounded-lg inter focus:border-[#00f] border-[2px]" pattern='[0-9]{6}' placeholder='6 digits pincode' type="text" required onChange={(e) => {
                                            setCustomerInfo({ ...customerInfo, pincode: e.target.value })
                                        }} value={customerInfo?.pincode} title='Pincode should be 6 digits' />
                                    </div>
                                    <div className="my-1 w-[100%] sm:w-[33%]">
                                        <p className='font-medium'>State</p>
                                        <Select aria-required="true" className='w-[100%] mt-1' size='large' placeholder="Choose your state" options={getStates()} onChange={(value) => {
                                            setCustomerInfo({ ...customerInfo, state: value })
                                        }} value={customerInfo?.state} />
                                    </div>
                                </div>
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
                                    <Button className="w-full my-1" size='large' htmlType='submit' type="primary" disabled={cart?.subtotal >= settings?.minimumAmount ? false : true} >Complete Booking</Button>
                                </div>
                            </div>
                        </div>
                        <hr className='border-[#ccc] mt-12' />
                    </form>
                    <Payment />
                    <Footer />
                </div>
        }
        </>
    )
}

const generateOrderId = () => {
    const date = new Date()
    const year = date.getFullYear()
    const datee = formatTime(date.getMonth() + 1) + formatTime(date.getDate())
    const time = formatTime(date.getHours() + 1) + formatTime(date.getMinutes() + 1) + formatTime(date.getSeconds() + 1)
    return (`${year}-${datee}-${time}`)
}

const formatTime = (value) => {
    let res = String(value)
    if (res.length == 1)
        res = "0" + res;
    return res;
}

export default Checkout;