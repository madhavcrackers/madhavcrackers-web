import React from "react";
import qr from '../assets/qr-madhav.jpg'

function Payment() {
    return (
        <div className="py-5 mt-12 mb-8 px-4 sm:px-12 md:px-24 flex flex-col sm:flex-row gap-12 sm:gap-4">
            <div className="w-[100%] sm:w-[60%]">
                <h1 className='text-2xl font-bold text-[#4535C1] mt-4'>Bank Account Details</h1>
                <p className='text-lg mt-6 mb-2 text-left'><span className='font-bold'>Account Holder Name : </span>Mr.Mariappan V</p>
                <p className='text-lg mt-2 mb-2 text-left'><span className='font-bold'>Account Number : </span>003100660200344</p>
                <p className='text-lg mt-2 mb-2 text-left'><span className='font-bold'>Account Type : </span>Savings</p>
                <p className='text-lg mt-2 mb-2 text-left'><span className='font-bold'>Bank : </span>Tamilnad Mercantile Bank</p>
                <p className='text-lg mt-2 mb-2 text-left'><span className='font-bold'>Branch : </span>Sivakasi</p>
                <p className='text-lg mt-2 mb-2 text-left'><span className='font-bold'>IFSC Code : </span>TMBL0000003</p>
                <p className='text-lg mt-2 mb-2 text-left'><span className='font-bold'>UPI Address : </span><a className="text-[#00f]" href='upi://pay?pa=mariappanvelusamy1979-1@okicici&cu=INR'>mariappanvelusamy1979-1@okicici</a></p>
                <p className='text-lg mt-2 mb-2 text-left'><span className='font-bold'>GPay Number : </span>9363935429</p>
                <div className="w-100 px-6 py-8 bg-[#fee2e2] rounded-lg border-[1px] border-[#dc2626] my-3">
                    <span className="font-bold">Note :</span> Once you transfer the payment, please submit the payment information to the mentioned whatsapp number.
                </div>
            </div>
            <div className="w-[100%] sm:w-[40%] flex justify-center">
                <img className="w-[350px] h-auto" src={qr}/>
            </div>
        </div>
    )
}
export default Payment;