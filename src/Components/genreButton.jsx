import { Tooltip } from "@material-tailwind/react";
import React from "react";
import { MdDelete } from "react-icons/md"
import { MdUpdate } from "react-icons/md"

const GenreButton = ({ children, updatePopup, deletePopup }) => {

    return (
        <div>
            <div className="w-full min-h-[4rem] mb-2 bg-gray-200 text-gray-600 rounded-2xl px-8 py-4 mb-5 flex">
                <div className="w-4/5 hover:text-xl cursor-pointer">
                    {
                        children
                    }
                </div>
                <div className="flex w-1/5 justify-end cursor-pointer items-center">
                    <Tooltip content="Update" className="text-xs p-1 bg-gray-500">
                        <div onClick={updatePopup}><MdUpdate className="h-[1.5rem] w-[3rem] hover:h-[2rem]" /></div>
                    </Tooltip>
                    <Tooltip content="Delete" className="text-xs p-1 bg-gray-500">
                    <div onClick={deletePopup}><MdDelete className="h-[1.5rem] w-[3rem] hover:h-[2rem]" /></div>
                    </Tooltip>
                </div>
            </div>
        </div>
    )

}

export default GenreButton