import React, { useEffect, useState } from "react";
import { Button, message, Layout, Divider, ConfigProvider } from 'antd';
import NavBar2 from '../components/NavBar2';
import NavBar3 from '../components/NavBar3';
import CategoriesContainer from "../components/Products/CategoriesContainer";
import { getProducts, getSettings } from '../actions/UserAction'
import { useDispatch, useSelector } from "react-redux";
import _ from 'underscore'
import { FaFilter } from "react-icons/fa";
import { HiOutlineEye } from "react-icons/hi2";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

const { Sider, Content } = Layout;

function QuickPurchase() {
    const [messageApi, ContextHolder] = message.useMessage()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [productsByCategory, setProductByCategory] = useState([])

    const [listProduct, setListProduct] = useState([])

    const productLoaded = useSelector((state) => state.product)
    const productsState = useSelector((state) => state.product.products)
    const settings = useSelector((state) => state.product.settings)
    const cart = useSelector((state) => state.order.cart)

    useEffect(() => {
        localStorage.setItem("madhav_cart", JSON.stringify(cart))
    }, [cart])

    const contentStyle = {
        minHeight: 80,
        backgroundColor: '#fff',
    };
    const siderStyle = {
        backgroundColor: '#fff',
    };
    const layoutStyle = {
        overflow: 'hidden',
        width: "100%",
        height: "100%",
        backgroundColor: "#fff"
    };

    useEffect(() => {
        setProductByCategory(_.groupBy(productsState, 'category'))
        setListProduct(_.groupBy(productsState, 'category'))
    }, [productsState])

    useEffect(() => {
        if (!productLoaded.loaded)
            getSettings(dispatch)
        if (!productLoaded.loaded || productLoaded.products.length == 0)
            getProducts(dispatch)
    }, [])
    return (
        <div className="w-100 h-[100vh] relative bg-white">
            <Helmet>
                <title>Quick Purchase| Madhav Crackers</title>
                <meta name="description" content="Buy the sivakasi crackers online." />
                <meta name="keywords" content="online crackers sivakasi, Madhav Crackers, Madhav Pattasu, Diwali Crackers Sivakasi"></meta>
            </Helmet>
            <NavBar2 />
            <NavBar3 />
            <ConfigProvider
                theme={{
                    token: {
                        colorBgContainer: '#fff',
                    },
                }}
            >
                <Layout className="bg-white bg-quick-purchase" style={layoutStyle}>
                    <Layout className="px-3 sm:px-4 md:px-12">
                        <Sider className="hidden sm:block py-5 pe-8 mb-[80px] overflow-y-scroll" width="25%" style={siderStyle}>
                            <div className="flex items-center gap-2 text-[#4535C1] mb-3">
                                <FaFilter />
                                <span className="font-bold text-[16px]">Filter by Category</span>
                            </div>
                            <div className="pb-5">
                                {
                                    productsByCategory && Object.keys(productsByCategory)?.map((category, index) => {
                                        return (
                                            <div key={index} className="w-100 flex select-none cursor-pointer items-center justify-between text-[14px] font-medium py-2 my-1 border-b-[1px] hover:text-[#4535C1]" onClick={() => {
                                                let obj = {}
                                                obj[category] = productsByCategory[category]
                                                console.log(obj)
                                                setListProduct({})
                                                setListProduct(obj)
                                            }}>
                                                <h1>{category}</h1>
                                                <span className="w-8 h-8 flex justify-center text-[12px] items-center text-white rounded-3xl bg-[#4535C1]">{productsByCategory[category].length}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Sider>
                        <Content className="py-5 px-3 sm:px-8 md:px-12 overflow-auto mb-[80px] hide-scrollbar" style={contentStyle}>
                            <h1 className="font-bold text-xl text-[#4535C1]">Quick Purchase</h1>
                            <p className="my-2 font-medium text-md">Select the quantity of your required crackers and complete your booking.</p>
                            <div className="py-3 flex justify-end">
                                <Button type="primary" shape="round" size="middle" icon={<HiOutlineEye />} onClick={() => {
                                    setListProduct(productsByCategory)
                                }}>Show All products</Button>
                            </div>
                            <Divider />
                            {
                                listProduct && Object.keys(listProduct)?.map((category, index) => {
                                    return (
                                        <CategoriesContainer category={category} data={listProduct[category]} key={index} />
                                    )
                                })
                            }
                        </Content>
                    </Layout>
                </Layout>
            </ConfigProvider>
            <div className="flex sm:px-12 h-[90px] items-center justify-between w-[100%] border-t-[2px] py-3 bg-[#f9fafb] px-3 fixed right-0 sm:right-0 bottom-0">
                <div className="sm:flex flex-col sm:flex-row flex sm:gap-4 text-sm sm:text-md">
                    <p className="font-medium">Qty : <span className="font-normal">{cart?.totalQty}</span></p>
                    <p className="font-medium">Total Amount : <span className="font-normal">Rs. {cart?.subtotal}</span></p>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-[12px] font-medium">Minimum order value Rs. {settings?.minimumAmount}</p>
                    <Button className="w-fit" icon={<FaLongArrowAltRight />} type="primary" size="small" disabled={cart?.subtotal >= settings?.minimumAmount ? false : true} onClick={() => {
                        navigate('/cart')
                    }} >View Cart</Button>
                </div>
            </div>
        </div>
    )
}

export default QuickPurchase;