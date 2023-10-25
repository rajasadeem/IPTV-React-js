import React from "react";
import Layout from "../../Components/layout";
import useSeasons from "./helper";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { Tooltip } from "@material-tailwind/react";
import Loader from "../../Components/loader";
import GenreButton from "../../Components/genreButton";
import Dialog from "../../Components/popup";
import InputField from "../../Components/InputField";
import Button from "../../Components/button";
import Description from "../../Components/textArea";
import DropDown from "../../Components/dropdown";

const Season = () => {

    const {
        getAllSeasonsHandler,
        loader, seasons, addPopup, setAddPopup, options, onChangeDropDown, addSeasonOnChangeHandler,
        seasonData, errors, onClose, addSeasonHandler, deletePopup, updatePopup, setDeletePopup, setUpdatePopup,
        setSeasonId, deleteSeasonHandler, setSeasonData, seriesValue, setSeriesValueHandler, updateSeasonHandler,
        series_id, removeQueryParams
    } = useSeasons()


    return (
        <Layout>
            <div className="h-screen w-full flex flex-col py-10 px-20 bg-slate-50 overflow-auto">
                <div className="flex justify-between">
                    <h1 className="font-extrabold text-4xl text-gray-600 mb-5">Seasons:</h1>
                    {
                        series_id ?
                        <Tooltip content="Go to all Seasons" className="text-xs px-2 py-1 bg-gray-500">
                         <p className="text-sm text-gray-500 underline cursor-pointer p-3" 
                         onClick={() => {
                            removeQueryParams("id")
                            getAllSeasonsHandler()
                         }}> All Seasons </p>
                         </Tooltip>
                          : ""
                    }
                    <Tooltip content="Add New Genre" className="text-xs px-2 py-1 bg-gray-500">
                        <div className="p-2 text-gray-500 cursor-pointer" onClick={() => {
                            // setGenreName("")
                            setAddPopup(true)
                        }}>
                            <BsFillPlusSquareFill className="h-[2rem] w-[2rem]" />
                        </div>
                    </Tooltip>
                </div>
                {
                    loader ? <Loader /> :
                        seasons?.length > 0 && seasons?.map(item => <GenreButton
                            updatePopup={() => {
                                setUpdatePopup(true)
                                setSeasonId(item?._id)
                                setSeasonData({
                                    name: item?.name,
                                    description: item?.description
                                })
                                setSeriesValueHandler(item)
                            }}
                            deletePopup={() => {
                                setDeletePopup(true)
                                setSeasonId(item?._id)
                            }}
                        >
                            <div className="font-extrabold text-xl text-gray-500">{item?.name}</div>
                            <div className="text-xs text-gray-500"> {item?.description}</div>
                            <div className="text-sm font-semibold text-gray-500 mt-3">
                                <div className="p-2 bg-gray-500 w-2/5 flex justify-center rounded-lg text-white">Series: {"  "} {item?.series_id?.name}</div>
                            </div>
                        </GenreButton>)
                }

                {
                    addPopup &&
                    <Dialog
                        title={"Add New Season"}
                        handleCloseDialog={() => {
                            setAddPopup(!addPopup)
                            onClose()
                        }}
                        actionsPannel={<div className="flex justify-end py-4 pl-40 pr-8">
                            <Button className={""} onClick={addSeasonHandler} >Add</Button>
                            <Button className={"bg-slate-300 ml-2"} textclr={"text-black"} onClick={() => {
                                setAddPopup(!addPopup)
                                onClose()
                            }}>Cancel</Button>
                        </div>}
                        size={'w-2/7'}
                    >
                        <InputField
                            label={"Name:"}
                            name={"name"}
                            value={seasonData?.name}
                            onChange={addSeasonOnChangeHandler}
                            error={errors.name}
                            className={"w-[20rem]"}

                        />
                        <Description
                            label={"Description:"}
                            name={"description"}
                            onChange={addSeasonOnChangeHandler}
                            value={seasonData?.description}
                            error={errors.description}
                        />
                        <DropDown
                            options={options}
                            dropdownLabel={"Select Season:"}
                            onChange={onChangeDropDown}
                        // value={genreId}
                        />
                    </Dialog>
                }
                {
                    deletePopup &&
                    <Dialog
                        title={"Delete Series"}
                        handleCloseDialog={() => setDeletePopup(false)}
                        actionsPannel={<div className="flex justify-end py-4 pl-40 pr-8">
                            <Button className={""} onClick={deleteSeasonHandler}>Confirm</Button>
                            <Button className={"bg-slate-300 ml-2"} textclr={"text-black"} onClick={() => setDeletePopup(false)}>Cancel</Button>
                        </div>}
                        size={'w-2/7'}
                    >
                        <p>Are you sure you want to delete this season?</p>
                    </Dialog>
                }
                {
                    updatePopup &&
                    <Dialog
                        title={"Update Season"}
                        handleCloseDialog={() => {
                            onClose()
                            setUpdatePopup(false)
                        }}
                        actionsPannel={<div className="flex justify-end pb-4 pl-40 pr-8">
                            <Button className={""} onClick={updateSeasonHandler}>Update</Button>
                            <Button className={"bg-slate-300 ml-2"} textclr={"text-black"} onClick={() => {
                                onClose()
                                setUpdatePopup(false)
                            }}>Cancel</Button>
                        </div>}
                        size={'w-2/7'}
                    >
                        <InputField
                            label={"Name:"}
                            name={"name"}
                            value={seasonData?.name}
                            onChange={addSeasonOnChangeHandler}
                            error={errors.name}
                            className={"w-[20rem]"}

                        />
                        <Description
                            label={"Description:"}
                            name={"description"}
                            value={seasonData?.description}
                            onChange={addSeasonOnChangeHandler}
                            error={errors.description}
                        />
                        <DropDown
                            options={options}
                            dropdownLabel={"Select Series:"}
                            onChange={onChangeDropDown}
                            value={seriesValue}
                        />
                    </Dialog>
                }


            </div>
        </Layout>
    )
}

export default Season