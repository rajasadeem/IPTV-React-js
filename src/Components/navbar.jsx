import React from "react";
import { useNavigate } from "react-router-dom";
import {RiComputerLine} from "react-icons/ri"

const NavBar = () => {
    const navigate = useNavigate()

    return (

        <div className="fixed top-0 left-0 bg-gray-100 h-[4rem] shadow-md w-full flex z-50">

            <div className="w-10/12 p-3 ml-10 flex">
                <RiComputerLine className="w-[3rem] h-[2.5rem]" />

                <div className="text-3xl font-extrabold hover:text-4xl cursor-pointer w-[4rem]" onClick={() => navigate("/home")}>
                    IPTV
                </div>
            </div>
            <div className="flex w-1/2 justify-evenly px-5 py-4">

                <div className="w-[7rem] h-9 px-8 py-1 cursor-pointer text-gray-600 font-bold hover:bg-white hover:text-black rounded-lg hover:shadow-md">
                    Home
                </div>
                <div className="w-[7rem] h-9 px-8 py-1 cursor-pointer text-gray-600 font-bold hover:bg-white hover:text-black rounded-lg hover:shadow-md">
                    About
                </div>
                <div className="w-[7rem] h-9 px-6 py-1 cursor-pointer text-gray-600 font-bold hover:bg-white hover:text-black rounded-lg hover:shadow-md">
                    Contact
                </div>
            </div>

        </div>
    )
}


export default NavBar