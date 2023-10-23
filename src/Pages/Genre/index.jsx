import React, { useState } from "react";
import Layout from "../../Components/layout";
import useGenre from "./helper";
import Loader from "../../Components/loader";
import GenreButton from "../../Components/genreButton";
import Dialog from "../../Components/popup";
import InputField from "../../Components/InputField";
import Button from "../../Components/button";
import { BsFillPlusSquareFill } from "react-icons/bs"
import { Tooltip } from "@material-tailwind/react";

const Genre = () => {
    const {
        loading,
        genres,
        setGenreId,
        setGenreName,
        genreName,
        onUpdateGenreHandler,
        updateLoader,
        updatePopup,
        setUpdatePopup,
        onDeleteGenreHandler,
        deleteLoader,
        deletePopup,
        setDeletePopup,
        addPopup,
        setAddPopup,
        addLoader,
        addNewGenreHandler
    } = useGenre()


    return (
        <Layout>
            <div className="h-screen w-full flex flex-col py-10 px-20 bg-slate-50 overflow-auto">
                <div className="flex justify-between">
                    <h1 className="font-extrabold text-4xl text-gray-600 mb-5">Genres:</h1>
                    <Tooltip content="Add New Genre" className="text-xs px-2 py-1 bg-gray-500">
                        <div className="p-2 text-gray-500 cursor-pointer" onClick={() => {
                            setGenreName("")
                            setAddPopup(true)
                        }}>
                            <BsFillPlusSquareFill className="h-[2rem] w-[2rem]" />
                        </div>
                    </Tooltip>
                </div>
                {loading ? <div className=" h-3/5 w-full flex justify-center items-center"><Loader size={"3rem"} className={""}/></div>
                    :
                    genres?.length > 0 && genres?.map(item =>
                        <GenreButton
                            updatePopup={() => {
                                setUpdatePopup(!updatePopup)
                                setGenreId(item?._id)
                                setGenreName(item?.name)
                            }
                            }
                            deletePopup={() => {
                                setDeletePopup(true)
                                setGenreId(item?._id)
                            }}
                        >
                            {item?.name}
                        </GenreButton>
                    )
                }
            </div>

            {
                updatePopup &&
                <Dialog
                    title={"Update Genre"}
                    handleCloseDialog={() => setUpdatePopup(!updatePopup)}
                    actionsPannel={<div className="flex justify-end py-4 pl-40 pr-8">
                        <Button className={""} loading={updateLoader} onClick={onUpdateGenreHandler}>Update</Button>
                        <Button className={"bg-slate-300 ml-2"} textclr={"text-black"} onClick={() => setUpdatePopup(!updatePopup)}>Close</Button>
                    </div>}
                    size={'w-2/7'}
                >
                    <h1 className="mb-2">Name:</h1>
                    <InputField
                        className={"w-[20rem]"}
                        value={genreName}
                        onChange={(e) => setGenreName(e.target.value)} />
                </Dialog>
            }

            {
                deletePopup &&
                <Dialog
                    title={"Delete Genre"}
                    handleCloseDialog={() => setDeletePopup(false)}
                    actionsPannel={<div className="flex justify-end py-4 pl-40 pr-8">
                        <Button className={""} loading={deleteLoader} onClick={onDeleteGenreHandler}>Confirm</Button>
                        <Button className={"bg-slate-300 ml-2"} textclr={"text-black"} onClick={() => setDeletePopup(false)}>Cancel</Button>
                    </div>}
                    size={'w-2/7'}
                >
                    <p>Are you sure you want to delete this genre?</p>
                </Dialog>
            }

            {
                addPopup &&
                <Dialog
                    title={"Add New Genre"}
                    handleCloseDialog={() => setAddPopup(!addPopup)}
                    actionsPannel={<div className="flex justify-end py-4 pl-40 pr-8">
                        <Button className={""} loading={addLoader} onClick={addNewGenreHandler} >Add</Button>
                        <Button className={"bg-slate-300 ml-2"} textclr={"text-black"} onClick={() => setAddPopup(!addPopup)}>Cancel</Button>
                    </div>}
                    size={'w-2/7'}
                >
                    <h1 className="mb-2">Name:</h1>
                    <InputField
                        className={"w-[20rem]"}
                        value={genreName}
                        onChange={(e) => setGenreName(e.target.value)}
                    />
                </Dialog>
            }
        </Layout>
    )
}

export default Genre