import React from "react";

const SideBarButton = ({ onClick, children, icon }) => {

    return (
        <div className="w-full bg-gray-200 p-4 flex justify-center items-center rounded-2xl font-bold hover:text-2xl cursor-pointer shadow-md text-gray-600" onClick={onClick}>
            <div>{icon}</div> <div className="ml-2">{children}</div>
        </div>
    )

}

export default SideBarButton