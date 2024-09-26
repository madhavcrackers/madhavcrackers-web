import React, { useEffect, useState } from "react";
import { Button, Image } from 'antd'
import { addToCart } from '../../actions/UserAction'
import logo from '../../assets/about-madhav-crackers.png'
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FiTrash2 } from "react-icons/fi";

function ProductList({ product, isCart }) {
    const dispatch = useDispatch()
    const [items, setItem] = useState({})
    const crackers = useSelector((state) => state.order?.cart?.crackers);
    useEffect(() => {
        const inCartCrackcer = crackers.filter((cracker) => { return cracker?.id == product?.id })[0]
        if (inCartCrackcer) {
            setItem(inCartCrackcer)
        }
        else
            setItem({ ...product, qty: 0, total: 0 })
    }, [product, crackers])
    return (
        <div className="w-100 py-2 border-b-[1px]">
            <div className="w-100 flex flex-col gap-2 sm:flex-row sm:justify-between ">
                <div className="flex items-center gap-4">
                    <Image className="p-1 border-[1px] rounded" width={70} src={items?.image || logo} />
                    <div>
                        <p className="text-[12px] text-[#14b8a6] font-medium">{items?.category}</p>
                        <p className="text-[16px] font-medium">{items?.productName}</p>
                        <p className="text-[12px] text-[#14b8a6]">{items?.quantity}</p>
                        <p className="text-[14px] text-[#3f6212] font-bold">Rs.{items?.price}</p>
                    </div>
                </div>
                <div className="flex flex-row sm:flex-col items-center sm:justify-center sm:gap-3 justify-between">
                    <div className="flex items-center gap-3">
                        <Button icon={<FaMinus />} disabled={items?.qty == 0 ? true : false} onClick={() => {
                            setItem({ ...items, qty: items.qty - 1, total: (items?.price * (items.qty - 1)) })
                            addToCart(dispatch, { ...items, qty: items.qty - 1, total: (items?.price * (items.qty - 1)) })
                        }}></Button>
                        <p className="text-lg">{items?.qty}</p>
                        <Button icon={<FaPlus />} onClick={() => {
                            setItem({ ...items, qty: items.qty + 1, total: (items?.price * (items.qty + 1)) })
                            addToCart(dispatch, { ...items, qty: items.qty + 1, total: (items?.price * (items.qty + 1)) })
                        }}></Button>
                    </div>
                    <div className="px-4 py-1 bg-[#bbf7d0] font-medium rounded">
                        Rs. {items?.total}
                    </div>
                </div>
            </div>
            {
                isCart && (
                    <div className="pb-1 pt-2 flex justify-end">
                        <Button type="primary" size="small" icon={<FiTrash2 />} danger onClick={() => {
                            if (confirm("Want to remove from cart..?"))
                                addToCart(dispatch, { ...items, qty: 0, total: 0 })
                        }}>Remove Item</Button>
                    </div>
                )
            }
        </div>
    )
}

export default ProductList;