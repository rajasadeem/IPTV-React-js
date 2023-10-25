import React from "react";
import { Card, CardBody, CardFooter, Tooltip, Typography } from "@material-tailwind/react";
import { MdDelete, MdUpdate } from "react-icons/md";

const PostCard = ({ thumbnail, name, description, updatePopup, deletePopup, genre, onClick }) => {

    return (
        <Card className="max-w-[18rem] overflow-hidden shadow-md rounded-xl cursor-pointer mb-4 mr-2">
            <img src={thumbnail ? thumbnail : `${process.env.PUBLIC_URL}/dummyThumbnail.jpg`} className="w-[20rem] h-[10rem]" />
            <CardBody className="p-2">
                <Typography variant="h4" className="text-gray-500" onClick={onClick}>
                    {name}
                </Typography>
                <Typography variant="lead" className="mt-2 text-xs text-gray-500 min-h-[5rem]">
                    {description}
                </Typography>
            </CardBody>
            <CardFooter className="flex justify-between p-2">
                <div className="text-sm font-bold text-gray-500">{genre[0]?.genre_id?.name}</div>
                <div className="flex">
                <Tooltip content="Update" className="text-xs p-1 bg-gray-500">
                    <div onClick={updatePopup}><MdUpdate className="h-[1.5rem] w-[3rem] text-gray-500" /></div>
                </Tooltip>
                <Tooltip content="Delete" className="text-xs p-1 bg-gray-500">
                    <div onClick={deletePopup}><MdDelete className="h-[1.5rem] w-[3rem] text-gray-500" /></div>
                </Tooltip>
                </div>
            </CardFooter>

        </Card>


    )
}

export default PostCard