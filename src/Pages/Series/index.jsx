import React, { useState } from "react";
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
import DropDown from "../../Components/dropdown";
import { ImCross } from "react-icons/im"

const Series = () => {

    const {
        addPopup,
        setAddPopup,
        errors,
        addSeriesOnChangeHandler,
        seriesData,
        thumbnail,
        setThumbnail,
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
        getLoader,
        updatePopup, seriesOnClick,
        setUpdatePopup, filterOnChange,
        genre, option, onChangeDropDown, genreSeries, setFileId, setFile, genreId, setGenreId,
        updateSeriesHandler, updateLoader, setGenreNameHandler, genreSeriesIdHandler, genreValue,
        clearFilter, setClearFilter, setFilterValue, filterValue, navigate
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
                <div className="flex">
                    <DropDown options={option} className={"w-[10rem]"} value={filterValue} onChange={filterOnChange} placeholder={"Select Genre..."} />
                    <Tooltip content="Clear Filter" className="text-xs px-2 py-1 bg-gray-500">
                        <div className="p-3 text-gray-500 cursor-pointer" onClick={() => {
                            setClearFilter(!clearFilter)
                            setFilterValue({
                                value: "",
                                label: ""
                            })
                        }}>
                            <ImCross className="h-[1.5rem] w-[1.5rem]" />
                        </div>
                    </Tooltip>
                </div>
                <div className="flex flex-wrap">
                    {
                        getLoader ? <div className=" h-3/5 w-full flex justify-center items-center"><Loader size={"3rem"} className={"mt-[10rem]"} /></div>
                            :
                            series?.length > 0 && series?.map(e => <PostCard
                                name={e.name}
                                description={e.description}
                                thumbnail={e?.thumbnail_id?.path}
                                onClick={() => navigate(`/seasons?id=${e?._id}`)}
                                deletePopup={() => {
                                    setDeletePopup(true)
                                    setSeriesId(e?._id)
                                }}
                                updatePopup={() => {
                                    setUpdatePopup(true)
                                    setSeriesId(e?._id)
                                    setSeriesData({
                                        name: e?.name,
                                        description: e?.description,
                                        trailer_id: e?.trailer_id,
                                        thumbnail_id: e?.thumbnail_id
                                    })
                                    setFileId(e?.thumbnail_id?._id)
                                    setThumbnail(e?.thumbnail_id?.path)
                                    genreSeriesIdHandler(e)
                                }}
                                genre={setGenreNameHandler(e)}
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
                        setFile("")
                        setAddPopup(false)
                        setSeriesData(initialState)
                    }}
                    actionsPannel={<div className="flex justify-end pb-4 pl-40 pr-8">
                        <Button className={""} onClick={addNewSeriesHandler} loading={addLoader}>Add</Button>
                        <Button className={"bg-slate-300 ml-2"} textclr={"text-black"} onClick={() => {
                            onCloseFile()
                            setFile("")
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
                    <DropDown
                        options={option}
                        dropdownLabel={"Select Genre:"}
                        onChange={onChangeDropDown}
                    // value={genreId}
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
            {
                updatePopup &&
                <Dialog
                    title={"Update Series"}
                    handleCloseDialog={() => {
                        onCloseFile()
                        setFile("")
                        setUpdatePopup(false)
                        setSeriesData(initialState)
                    }}
                    actionsPannel={<div className="flex justify-end pb-4 pl-40 pr-8">
                        <Button className={""} onClick={updateSeriesHandler} loading={updateLoader}>Update</Button>
                        <Button className={"bg-slate-300 ml-2"} textclr={"text-black"} onClick={() => {
                            onCloseFile()
                            setFile("")
                            setUpdatePopup(false)
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
                    <DropDown
                        options={option}
                        dropdownLabel={"Select Genre:"}
                        onChange={onChangeDropDown}
                        value={genreValue}
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
        </Layout>
    )
}

export default Series