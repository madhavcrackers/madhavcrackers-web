import React, { useEffect, useState } from "react";
import { Typography, InputNumber, Button } from "antd";
import { useSelector,useDispatch } from "react-redux";
import {updateSettings} from '../../actions/AdminAction'

const { Title, Text } = Typography;

function AdminSettings() {
    const dispatch=useDispatch()
    const [settings, setSettings] = useState({})
    const settingsState = useSelector((state) => state.inventory.settings)
    useEffect(() => {
        setSettings(settingsState)
    }, [settingsState])
    return (
        <div className='w-100'>
            <Title level={5}>Settings</Title>
            <div className="flex py-5 gap-8 flex-wrap">
                <div className="flex flex-col gap-2 w-[320px] px-4 py-8 bg-[#dcfce7] rounded-xl">
                    <Text strong>Minimum Purchase Amount</Text>
                    <p className="text-[12px]">In rupees ₹ </p>
                    <InputNumber
                        className="w-full"
                        size="large"
                        value={settings?.minimumAmount}
                        onChange={(value) => {
                            setSettings({ ...settings, minimumAmount: value })
                        }}
                        min={1}
                    />
                </div>
                <div className="flex flex-col gap-2 w-[320px] px-4 py-8 bg-[#cffafe] rounded-xl">
                    <Text strong>Discount</Text>
                    <p className="text-[12px]">In percentage % which deduced from orginal amount for all products </p>
                    <InputNumber
                        className="w-full"
                        size="large"
                        value={settings?.discount}
                        onChange={(value) => {
                            setSettings({ ...settings, discount: value })
                        }}
                        min={0}
                        max={100}
                    />
                </div>
            </div>
            <div className="flex justify-end sm:gap-8 gap-3 mt-12">
                <Button onClick={()=>{
                    setSettings(settingsState)
                }}>Reset</Button>
                <Button type="primary" onClick={()=>{
                    updateSettings(dispatch,settings,settings?.id)
                }}>Update Settings</Button>
            </div>
        </div>
    )
}

export default AdminSettings;