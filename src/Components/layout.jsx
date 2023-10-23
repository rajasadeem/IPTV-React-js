import React, { useEffect } from "react";
import NavBar from "./navbar";
import SideBar from "./sidebar";

const Layout = ({ children }) => {

    return (
        <div className="w-full h-screen bg-slate-50">
            <div className="h-[4rem]">
                <NavBar />
            </div>
            <div className="flex min-h-screen">
                <div className="w-1/5 border-r-8 border-gray">
                    <SideBar />
                </div>
                <div className="w-4/5">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout