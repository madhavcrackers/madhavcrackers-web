import React from "react";
import loader from '../assets/loader.gif'

function Loader(){
    return(
        <div className="w-[100vw] h-[100vh] fixed top-0 bg-[#fafafa] flex justify-center items-center ">
            <img className="w-48" src={loader}/>
        </div>
    )
}

export default Loader;