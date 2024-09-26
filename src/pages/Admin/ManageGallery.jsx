import React, { useEffect, useState } from 'react'
import { Typography, Input, Button, Divider, message, Image } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { addGallery, deleteGallery } from '../../actions/AdminAction'
const { Title } = Typography
import {AiOutlineCloudUpload} from 'react-icons/ai';

function ManageGallery() {
    const dispatch = useDispatch()
    const [images, setImages] = useState([])
    const[image,setImage]=useState("")
    const galleryState = useSelector((state) => state.others.gallery);
    useEffect(() => {
        setImages(galleryState);
    }, [galleryState])
    return (
        <div className='w-100'>
            <Title level={5}>Manage Gallery</Title>
            <Divider>Add Image</Divider>
            <div>
                <div className="relative sm:w-[45%] flex gap-8 w-full py-4 my-3 me-8">
                    <label className="w-fit flex gap-2 items-center p-2 rounded-md border border-[#1677ff] h-fit" htmlFor="outputImg">
                        <AiOutlineCloudUpload className="text-lg text-[#1677ff]" />
                        <span className="text-[#1677ff]">Upload</span>
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
                    <p className='absolute -top-3 font-medium inter'>Upload Image</p>
                    <Button htmlType='submit' type='primary' onClick={()=>{
                        if(image!=""){
                            addGallery(dispatch,image)
                            setImage("")
                        }
                        else
                            message.error("Please select an image")
                    }}>Add Image</Button>
                </div>
            </div>
            <Divider>Your Gallery</Divider>
            <div className='flex gap-4 flex-wrap py-4'>
                {
                    images && images.length > 0 ?
                        images.map((image, index) => {
                            return (
                                <div key={index} className='p-2 border-2 rounded-lg flex flex-col gap-2'>
                                    <Image width={100} src={image?.src} />
                                    <Button type='primary' danger onClick={() => {
                                        if (confirm("Want to delete the image from gallery..?")) {
                                            deleteGallery(dispatch, image)
                                        }
                                    }}>Delete</Button>
                                </div>
                            )
                        })
                        :
                        <p>Your gallery was empty</p>
                }
            </div>
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

export default ManageGallery;