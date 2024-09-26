import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Menu, theme ,message} from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import Loader from '../../components/Loader'
import ManageCategory from './ManageCategory';
import AddProduct from './AddProduct';
import ManageProduct from './ManageProduct';
import ManageGallery from './ManageGallery';
import AdminSettings from './AdminSettings';
import { logoutAdmin } from '../../actions/AuthAction'
import {getCategories,getProducts, getSettings} from '../../actions/AdminAction'
import {getGallery} from '../../actions/UserAction'
import { MdSpaceDashboard } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { GiFireworkRocket } from "react-icons/gi";
import { MdAddToPhotos } from "react-icons/md";
import { IoHandLeftSharp } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { FiImage } from "react-icons/fi";
import { RiShoppingBag4Line } from "react-icons/ri";
import { TbProgress } from "react-icons/tb";
import { TbTruckDelivery } from "react-icons/tb";

function AdminMain() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAdmin = useSelector((state) => state.auth.isAdmin)
    const [open, setOpen] = useState(1)
    const loading = useSelector((state) => state.loader.loading);
    const[messageApi,ContextHolder]=message.useMessage()
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    useEffect(()=>{
        getCategories(dispatch)
        getProducts(dispatch)
        getSettings(dispatch)
        getGallery(dispatch)
    },[])
    useEffect(() => {
        if (isAdmin == false)
            navigate('/')
    }, [isAdmin])
    const items = [
        {
            key: 1,
            label: "Dashboard",
            icon: <MdSpaceDashboard />
        },
        {
            key: 2,
            label: "Manage Category",
            icon: <MdCategory />
        },
        {
            key:3,
            label:"Products",
            icon:<GiFireworkRocket/>,
            children:[
                {
                    key:4,
                    label:"Add Product",
                    icon:<MdAddToPhotos/>
                },
                {
                    key:5,
                    label:"Manage Product",
                    icon:<IoHandLeftSharp/>
                }
            ]
        },
        {
            key:8,
            label:"Orders",
            icon:<RiShoppingBag4Line/>,
            children:[
                {
                    key:9,
                    label:"Pending Orders",
                    icon:<TbProgress/>
                },
                {
                    key:10,
                    label:"Dispatched Orders",
                    icon:<TbTruckDelivery/>
                }
            ]
        },
        {
            key:6,
            label:"Manage Gallery",
            icon:<FiImage/>
        },
        {
            key:7,
            label:"Settings",
            icon:<IoSettingsOutline/>
        }
    ]
    return (
        <>
            {ContextHolder}
            {
                loading ?
                    <Loader />
                    :
                    <Layout
                        style={{
                            minHeight: '100vh',
                            backgroundColor:"white"
                        }}
                    >
                        <Sider
                            breakpoint="lg"
                            collapsedWidth={0}
                            width={240}
                            className='px-2'>
                            <div className="demo-logo-vertical py-2 my-3 bg-[#0020f1] mx-3 rounded-xl" >
                                <h1 className='text-center text-md text-white inter font-medium'>Admin</h1>
                            </div>
                            <Menu className='mt-5' theme="dark" selectedKeys={open} mode="inline" items={items} onClick={({ key }) => {
                                setOpen(key)
                            }} />
                        </Sider>
                        <Layout>
                            <Header
                                className='px-4 bg-white flex justify-end items-center'
                            >
                                <button className='px-4 border-2 h-[34px] flex items-center rounded-2xl hover:bg-[#ccc0a0] duration-500' onClick={() => {
                                    logoutAdmin(dispatch, navigate)
                                }}>Logout</button>
                            </Header>
                            <Content
                                style={{
                                    margin: '0 16px',
                                }}
                            >
                                <div
                                    className='mt-4'
                                    style={{
                                        padding: 24,
                                        minHeight: "90%",
                                        background: colorBgContainer,
                                        borderRadius: borderRadiusLG,
                                    }}
                                >
                                    {
                                        open == 2 ?
                                            <ManageCategory />
                                            :
                                            open==4?
                                            <AddProduct/>
                                            :
                                            open==5?
                                            <ManageProduct/>
                                            :
                                            open==6?
                                            <ManageGallery/>
                                            :
                                            open==7?
                                            <AdminSettings/>
                                            :
                                            <h1>Hello</h1>
                                    }
                                </div>
                            </Content>
                        </Layout>
                    </Layout>

            }
        </>
    )
}

export default AdminMain;