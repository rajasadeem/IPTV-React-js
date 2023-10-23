import React from "react";

const Description = ({ value, className, label, error, name, onChange }) => {
    return (
        <>
            {
                label &&
                <label className='text-xs text-slate-600 my-2'>
                    {label}
                </label>
            }
            <textarea className={`border rounded-md focus: outline-none text-xs text-slate-700 px-2 h-[5rem] ${className}`} name={name} onChange={onChange}>
                {
                    value
                }
            </textarea>
            {
                error &&
                <p className='text-red-500 text-xs'>
                    {error}
                </p>
            }
        </>
    )
}

export default Description