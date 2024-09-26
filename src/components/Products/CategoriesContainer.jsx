import React, { useEffect, useState } from 'react'
import ProductList from './ProductList';

function CategoriesContainer({category,data}){
    const[items,setItems]=useState([])
    useEffect(()=>{
        setItems([])
        setItems(data)
    },[data])
    return(
        <div className='w-100'>
            <div className='w-100 flex justify-center items-center py-3 my-1 bg-[#f3e8ff] font-medium'>
                {category}
            </div>
            {
                items&&items.map((product,index)=>{
                    return(
                        <ProductList product={product} key={index}/>
                    )
                })
            }
        </div>
    )
}

export default CategoriesContainer;