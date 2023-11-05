import React from "react";
import { useNavigate } from "react-router-dom";
import useSetDataInBrowserStorage from "../Hooks/useSetDataInBrowserStorage";
import SideBarButton from "./sidebarButton";
import { MdOutlineHistoryToggleOff } from "react-icons/md"
import { MdMenuBook } from "react-icons/md"
import { RiMovieLine } from "react-icons/ri"
import { BiMoviePlay } from "react-icons/bi"
import { FiLogOut } from "react-icons/fi"
import { CgProfile } from "react-icons/cg"
import { useSelector } from "react-redux";

const SideBar = () => {
    const navigate = useNavigate()
    const { removeDataInCookies } = useSetDataInBrowserStorage()
    const sidebarItems = [
        {
            name: "Stream",
            path: "/streams",
            icon: <MdOutlineHistoryToggleOff/>
        },
        {
            name: "Genre",
            path: "/genre",
            icon: <MdMenuBook/>
        },
        {
            name: "Series",
            path: "/series",
            icon: <RiMovieLine/>
        },
        {
            name: "Seasons",
            path: "/seasons",
            icon: <BiMoviePlay/>
        },
        {
            name: "Episodes",
            path: "/episodes",
            icon: <RiMovieLine/>
        }
    ]
    const state = useSelector(state => state)
    console.log(state);
    const name = state?.user?.user_detail?.first_name + " " + state?.user?.user_detail?.last_name

    return (
        <div className="flex flex-col h-screen bg-slate-50 w-full">
            <div className="flex bg-gray-200 px-4 py-4 justify-evenly shadow-md cursor-pointer w-full">
                <div className="text-gray-600"><CgProfile className=" w-[3rem] h-[3rem]"/></div>
                <div className="text-gray-600 font-extrabold text-2xl  py-2">{ name }</div>
            </div>

            <div className="w-full h-4/5 flex flex-col items-center justify-evenly px-10">
                {
                    sidebarItems?.map(e => <SideBarButton onClick={() => navigate(e.path)} icon={e.icon}>
                        {e.name}
                    </SideBarButton>
                    )
                }
            </div>

            <div className="w-full h-1/5 flex justify-center items-end px-5">

                <div className="bg-gray-200 p-4 w-full flex justify-center items-center rounded-2xl font-bold hover:text-xl cursor-pointer mb-8 shadow-md text-gray-600 bg-slate-300"
                    onClick={() => {
                        removeDataInCookies("token")
                        navigate("/login")
                    }}>
                    <FiLogOut/> <div className="ml-2">Logout </div>
                </div>
            </div>

        </div>
    )
}

export default SideBar











