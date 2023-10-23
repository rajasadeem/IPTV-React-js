import React from "react";
import Layout from "../../Components/layout";
import PostCard from "../../Components/postCard";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { Tooltip } from "@material-tailwind/react";
import useSeries from "./helper";
import Dialog from "../../Components/popup";
import Button from "../../Components/button";
import InputField from "../../Components/InputField";
import Description from "../../Components/textArea";
import Loader from "../../Components/loader";

const Series = () => {

    const {
        addPopup,
        setAddPopup,
        errors,
        addSeriesOnChangeHandler,
        seriesData,
        thumbnail,
        setSeriesData,
        initialState,
        fileInputRef,
        onCloseFile,
        addNewSeriesHandler,
        series,
        deletePopup,
        setDeletePopup,
        setSeriesId,
        deleteSeriesHandler,
        deleteLoader,
        addLoader,
        getLoader
    } = useSeries()

    return (
        <Layout>
            <div className="h-screen w-full flex flex-col py-10 px-20 bg-slate-50 overflow-auto">
                <div className="flex justify-between">
                    <h1 className="font-extrabold text-4xl text-gray-600 mb-5">Series:</h1>
                    <Tooltip content="Add New Series" className="text-xs px-2 py-1 bg-gray-500">
                        <div className="p-2 text-gray-500 cursor-pointer" onClick={() => {
                            setAddPopup(true)
                        }}>
                            <BsFillPlusSquareFill className="h-[2rem] w-[2rem]" />
                        </div>
                    </Tooltip>
                </div>
                <div className="flex flex-wrap justify-between">
                    {
                        getLoader ? <div className=" h-3/5 w-full flex justify-center items-center"><Loader size={"3rem"} className={"mt-[10rem]"} /></div>
                            :
                            series?.length > 0 && series?.map(e => <PostCard
                                name={e.name}
                                description={e.description}
                                thumbnail={e?.thumbnail_id?.path}
                                deletePopup={() => {
                                    setDeletePopup(true)
                                    setSeriesId(e?._id)
                                }}
                            />)
                    }
                </div>
            </div>

            {
                addPopup &&
                <Dialog
                    title={"Add New Series"}
                    handleCloseDialog={() => {
                        onCloseFile()
                        setAddPopup(false)
                        setSeriesData(initialState)
                    }}
                    actionsPannel={<div className="flex justify-end pb-4 pl-40 pr-8">
                        <Button className={""} onClick={addNewSeriesHandler} loading={addLoader}>Add</Button>
                        <Button className={"bg-slate-300 ml-2"} textclr={"text-black"} onClick={() => {
                            onCloseFile()
                            setAddPopup(false)
                            setSeriesData(initialState)
                        }}>Cancel</Button>
                    </div>}
                    size={'w-2/7'}
                >
                    <InputField
                        label={"Name:"}
                        name={"name"}
                        value={seriesData?.name}
                        onChange={addSeriesOnChangeHandler}
                        error={errors.name}
                        className={"w-[20rem]"}

                    />
                    <Description
                        label={"Description:"}
                        name={"description"}
                        value={seriesData?.description}
                        onChange={addSeriesOnChangeHandler}
                        error={errors.description}
                    />
                    {thumbnail && <img src={thumbnail} className="w-[8rem] h-[7rem] mt-2" />}
                    <label htmlFor="fileInput" className="mt-4">
                        <span className="mt-2 bg-purple-800 text-white rounded-lg px-8 py-2 cursor-pointer">Upload Thumbnail</span>
                        <input
                            type="file"
                            name="file"
                            className="hidden"
                            id="fileInput"
                            onChange={addSeriesOnChangeHandler}
                            ref={fileInputRef}
                        />
                    </label>

                </Dialog>
            }
            {
                deletePopup &&
                <Dialog
                    title={"Delete Series"}
                    handleCloseDialog={() => setDeletePopup(false)}
                    actionsPannel={<div className="flex justify-end py-4 pl-40 pr-8">
                        <Button className={""} onClick={deleteSeriesHandler} loading={deleteLoader}>Confirm</Button>
                        <Button className={"bg-slate-300 ml-2"} textclr={"text-black"} onClick={() => setDeletePopup(false)}>Cancel</Button>
                    </div>}
                    size={'w-2/7'}
                >
                    <p>Are you sure you want to delete this series?</p>
                </Dialog>
            }
        </Layout>
    )
}

export default Series