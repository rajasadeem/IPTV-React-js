import React from "react";
import Layout from "../../Components/layout";
import { useSelector } from "react-redux";

const Episode = () => {
    const state = useSelector(state => state)
    console.log("EPISODE",state);
    return (
        <Layout>
            <div className="h-screen">
                This is episodes Page
            </div>
        </Layout>
    )
}

export default Episode