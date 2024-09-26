import React, { useEffect, useState } from 'react'
import { Typography, Input, Button, Divider, message, Select, InputNumber, Image, Table, Drawer } from 'antd'
const { Title } = Typography
import { deleteProduct,updateProduct } from '../../actions/AdminAction'
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineCloudUpload } from 'react-icons/ai'
import _ from 'underscore'

function ManageProduct() {
    const dispatch = useDispatch()
    const productState = useSelector((state) => state.inventory.products);
    const [products, setProducts] = useState([])
    const [open, setOpen] = useState(false)

    const [currentProduct, setCurrentProduct] = useState({})

    const categoriesState = useSelector((state) => state.inventory.categories)
    const [categories, setCategories] = useState([])
    useEffect(() => {
        setCategories(categoriesState?.map((value) => {
            return { value: value?.category, label: value?.category }
        }))
    }, [categoriesState])
    const quantities = [
        {
            value: "1 Pkt",
            label: "1 Pkt"
        },
        {
            value: "1 Box",
            label: "1 Box"
        },
        {
            value: "1 Tin",
            label: "1 Tin"
        }
    ]

    useEffect(() => {
        let temp=_.sortBy(productState,'category')
        setProducts(temp.map((product, index) => {
            return { ...product, key: index + 1 }
        }))
    }, [productState])

    const columns = [
        {
            title: 'Sno',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Name',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (value) => <Image width={40} src={value || "https://avatar.iran.liara.run/public/45"} />
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Qty',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            render: (id) => {
                return (
                    <div>
                        <Button type='link' onClick={() => {
                            handleEdit(id)
                        }}>Edit</Button>
                        <Button type='link' danger onClick={() => {
                            handleDeleteProduct(id)
                        }} >Delete</Button>
                    </div>
                )
            }
        },
    ];

    const handleEdit = (id) => {
        setCurrentProduct(products.filter((product) => { return product.id == id })[0])
        setOpen(true)
    }

    const handleUpdate=()=>{
        let oldProducts=products.filter((product) => { return product.id != currentProduct?.id })
        oldProducts=[...oldProducts,currentProduct]
        let id=currentProduct?.id;
        delete currentProduct.id
        delete currentProduct.key
        updateProduct(dispatch,oldProducts,id,currentProduct)
        setCurrentProduct({})
    }

    const handleDeleteProduct = (id) => {
        if (confirm("Are you surely want to delete..?")) {
            let newProducts = [...products]
            newProducts = newProducts.filter((product) => { return product.id != id })
            deleteProduct(dispatch, newProducts, id)
        }
    }

    return (
        <div className='w-100'>
            <Title level={5}>Manage Product</Title>
            <div>
                <Table className="my-5 max-w-[100%] overflow-x-scroll" dataSource={products} columns={columns} />
            </div>
            <Drawer
                title={"Update Product"}
                placement="right"
                size={"large"}
                onClose={() => {
                    setOpen(false)
                    setCurrentProduct({})
                }}
                open={open}
            >
                <form className='py-5 flex flex-col sm:flex-row flex-wrap'>
                    <div className="relative sm:w-[45%] w-full py-4 my-3 me-8">
                        <Input className='' placeholder='Enter product name' size='large' type='text' onChange={(e) => {
                            setCurrentProduct({...currentProduct,productName:e.target.value})
                        }} value={currentProduct?.productName} />
                        <p className='absolute -top-3 font-medium inter'>Product Name</p>
                    </div>
                    <div className="relative sm:w-[45%] w-full py-4 my-3 me-8">
                        <Select className='w-full' placeholder="Select category" size='large' value={currentProduct?.category} options={categories} onChange={(value) => {
                            setCurrentProduct({...currentProduct,category:value})
                        }} />
                        <p className='absolute -top-3 font-medium inter'>Product Category</p>
                    </div>
                    <div className="relative sm:w-[45%] w-full py-4 my-3 me-8">
                        <Select className='w-full' placeholder="Select quantity" size='large' value={currentProduct?.quantity} options={quantities} onChange={(value) => {
                            setCurrentProduct({...currentProduct,quantity:value})
                        }} />
                        <p className='absolute -top-3 font-medium inter'>Product Quantity</p>
                    </div>
                    <div className="relative sm:w-[45%] w-full py-4 my-3 me-8">
                        <InputNumber className='w-full' min={1} placeholder='Enter product price' size='large' onChange={(value) => {
                            setCurrentProduct({...currentProduct,price:value})
                        }} value={currentProduct?.price} />
                        <p className='absolute -top-3 font-medium inter'>Product Price</p>
                    </div>
                    <div className="relative sm:w-[45%] flex gap-8 w-full py-4 my-3 me-8">
                        <label className="w-fit flex gap-2 items-center p-2 rounded-md border border-[#1677ff] h-fit" htmlFor="outputImg">
                            <AiOutlineCloudUpload className="text-lg text-[#1677ff]" />
                            <span className="text-[#1677ff]">Upload Output</span>
                        </label>
                        <input type="file" id="outputImg" accept="image/*" hidden onChange={(e) => {
                            imgToBase64(e.target.files[0], (res) => {
                                setCurrentProduct({...currentProduct,image:res})
                            })
                        }} />
                        {
                            currentProduct?.image && (
                                <Image width={80} src={currentProduct?.image} />
                            )
                        }
                        <p className='absolute -top-3 font-medium inter'>Product Image</p>
                    </div>
                    <div className='w-full flex justify-end py-4 sm:px-8'>
                        <Button size='large' type='primary' onClick={handleUpdate}>Update Product</Button>
                    </div>
                </form>
            </Drawer>
        </div>
    )
}

const imgToBase64 = (file, callback) => {
    var reader = new FileReader();
    reader.onloadend = function () {
        callback(reader.result)
    };
    reader.readAsDataURL(file);
}

export default ManageProduct;