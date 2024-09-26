import React, { useEffect, useState } from 'react'
import { Typography, Input, Button, Divider, message } from 'antd'
const { Title } = Typography
import { addCategory, deleteCategory } from '../../actions/AdminAction';
import { useDispatch, useSelector } from 'react-redux';
import { AiTwotoneDelete } from "react-icons/ai";

function ManageCategory() {
    const categoriesState = useSelector((state) => state?.inventory.categories);
    const [newCategory, setNewCategory] = useState("")
    const [validCategory, setValidCategory] = useState(false)
    const dispatch = useDispatch()
    const [categories, setCategories] = useState([])
    useEffect(() => {
        setValidCategory(categories.includes(newCategory.trim()))
    }, [newCategory])
    useEffect(() => {
        setCategories(categoriesState.map((value) => {
            return value?.category
        }))
    }, [categoriesState])
    const handleAddCategory = (e) => {
        e.preventDefault()
        if (newCategory.trim() != "") {
            addCategory(dispatch, newCategory.trim())
        }
        else
            message.warning("Please provide valid category")
    }
    const handleDeleteCategory = (index, id) => {
        if (confirm("Are you surely want to delete..?")) {
            let newCategories = [...categoriesState]
            newCategories.splice(index, 1)
            deleteCategory(dispatch,newCategories,id)
        }
    }
    return (
        <div className='w-100'>
            <Title level={5}>Manage Category</Title>
            <Divider>Add New Category</Divider>
            <form className='flex gap-3 py-3 relative' onSubmit={handleAddCategory} >
                <Input placeholder='Enter the category' value={newCategory} onChange={(e) => {
                    setNewCategory(e.target.value.toUpperCase())
                }} required />
                <p className='absolute -bottom-3 text-xs text-[#f00] font-medium'>{validCategory ? "Category already exists" : ""}</p>
                <button className='py-[6px] px-4 bg-[#2563eb] text-white rounded-lg h-fit' type='submit' disabled={validCategory}>Add</button>
            </form>
            <Divider />
            <Title level={5}>Available Categories</Title>
            <div className='flex gap-8 flex-wrap py-3'>
                {
                    categoriesState?.map((value, index) => {
                        return (
                            <div className='flex items-center bg-[#dbeafe] w-fit py-2 px-6 rounded-xl gap-4' key={index}>
                                <p className='font-medium'>{value?.category}</p>
                                <button className='hover:bg-[#fca5a5] duration-500 p-1 rounded'>
                                    <AiTwotoneDelete className='text-lg text-[#7f1d1d]' onClick={() => { handleDeleteCategory(index, value?.id) }} />
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default ManageCategory;