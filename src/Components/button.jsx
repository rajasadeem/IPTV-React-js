import React from 'react'
import Loader from './loader'

const Button = ({ children, className, onClick, disabled, loading, textclr }) => {

    return (
        <button
            className={`w-full h-[2rem] bg-purple-800 px-2 py-1 rounded-md ${textclr ? textclr : "text-white"} hover:shadow-lg shadow-purple-800 text-xs ${className}`}
            onClick={onClick}
            disabled={ loading ? true : disabled}
        >
            { loading ? <Loader size={"1rem"}/> : children}
        </button>
    )

}
export default Button