import React, { useEffect, useState } from 'react'
import { Typography, Input, Button, Divider, message, Select, InputNumber,Image } from 'antd'
const { Title } = Typography
import {addProduct} from '../../actions/AdminAction'
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineCloudUpload } from 'react-icons/ai'

function AddProduct() {
    const dispatch = useDispatch()
    const categoriesState = useSelector((state) => state.inventory.categories)
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState("")
    const [productName, setProductName] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState(1)
    const [image, setImage] = useState("")
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
    const handleSubmit=()=>{
        setProductName(productName.trim())
        setImage(image.trim())
        if(productName!=""&&category!=""&&quantity!=""&&price){
            const doc={productName,category,quantity,price,image}
            addProduct(dispatch,doc)
        }
        else{
            message.warning("Please fill all fields")
        }
    }
    return (
        <>
            <div className='w-100'>
                <Title level={5}>Add Product</Title>
                <form className='py-5 flex flex-col sm:flex-row flex-wrap'>
                    <div className="relative sm:w-[45%] w-full py-4 my-3 me-8">
                        <Input className='' placeholder='Enter product name' size='large' type='text' onChange={(e) => {
                            setProductName(e.target.value)
                        }} value={productName} />
                        <p className='absolute -top-3 font-medium inter'>Product Name</p>
                    </div>
                    <div className="relative sm:w-[45%] w-full py-4 my-3 me-8">
                        <Select className='w-full' placeholder="Select category" size='large' value={category} options={categories} onChange={(value) => {
                            setCategory(value)
                        }} />
                        <p className='absolute -top-3 font-medium inter'>Product Category</p>
                    </div>
                    <div className="relative sm:w-[45%] w-full py-4 my-3 me-8">
                        <Select className='w-full' placeholder="Select quantity" size='large' value={quantity} options={quantities} onChange={(value) => {
                            setQuantity(value)
                        }} />
                        <p className='absolute -top-3 font-medium inter'>Product Quantity</p>
                    </div>
                    <div className="relative sm:w-[45%] w-full py-4 my-3 me-8">
                        <InputNumber className='w-full' min={1} placeholder='Enter product price' size='large' onChange={(value) => {
                            setPrice(value)
                        }} value={price} />
                        <p className='absolute -top-3 font-medium inter'>Product Price</p>
                    </div>
                    <div className="relative sm:w-[45%] flex gap-8 w-full py-4 my-3 me-8">
                        <label className="w-fit flex gap-2 items-center p-2 rounded-md border border-[#1677ff] h-fit" htmlFor="outputImg">
                            <AiOutlineCloudUpload className="text-lg text-[#1677ff]" />
                            <span className="text-[#1677ff]">Upload Output</span>
                        </label>
                        <input type="file" id="outputImg" accept="image/*" hidden onChange={(e) => {
                            imgToBase64(e.target.files[0], (res) => {
                                setImage(res)
                            })
                        }} />
                        {
                            image && (
                                <Image width={80} src={image} />
                            )
                        }
                        <p className='absolute -top-3 font-medium inter'>Product Image</p>
                    </div>
                    <div className='w-full flex justify-end py-4 sm:px-8'>
                        <Button size='large' type='primary' onClick={handleSubmit}>Add Product</Button>
                    </div>
                </form>
            </div>
        </>
    )
}

const imgToBase64 = (file, callback) => {
    var reader = new FileReader();
    reader.onloadend = function () {
        callback(reader.result)
    };
    reader.readAsDataURL(file);
}

export default AddProduct;