import React from "react";
import Layout from "../../Components/layout";
import { Tooltip } from "@material-tailwind/react";
import { BsFillPlusSquareFill } from "react-icons/bs";
import useEpisode from "./helper";

const Episode = () => {

    const {
        options, setAddPopup,  addPopup, setDeletePopup, deletePopup, setUpdatePopup, updatePopup,

    } = useEpisode()


    return (
        <Layout>
            <div className="h-screen w-full flex flex-col py-10 px-20 bg-slate-50 overflow-auto">
                <div className="flex justify-between">
                    <h1 className="font-extrabold text-4xl text-gray-600 mb-5">Episodes:</h1>
                    {
                        // series_id ?
                        <Tooltip content="Go to all Seasons" className="text-xs px-2 py-1 bg-gray-500">
                            <p className="text-sm text-gray-500 underline cursor-pointer p-3"
                                onClick={() => {
                                    // removeQueryParams("id")
                                    // getAllSeasonsHandler()
                                }}> All Episodes </p>
                        </Tooltip>
                        //   : ""
                    }
                    <Tooltip content="Add New Episode" className="text-xs px-2 py-1 bg-gray-500">
                        <div className="p-2 text-gray-500 cursor-pointer" onClick={() => {
                            // setGenreName("")
                            // setAddPopup(true)
                        }}>
                            <BsFillPlusSquareFill className="h-[2rem] w-[2rem]" />
                        </div>
                    </Tooltip>
                </div>
            </div>
        </Layout>
    )
}

export default Episode