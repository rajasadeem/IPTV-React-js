import React from 'react'

const InputField = ({ value, placeholder, onChange, onKeyDown, error, label, className, type, name }) => {

    return (
        <div className={`flex flex-col gap-y-2 ${className}`}>
            {
                label &&
                <label className='text-xs text-slate-600'>
                    {label}
                </label>
            }
            <input
                name={name}
                value={value}
                placeholder={placeholder}
                className={`h-[2rem] border rounded-md focus: outline-none text-xs text-slate-700 px-2`}
                onChange={onChange}
                onKeyDown={onKeyDown}
                type={type}
            />
            {
                error &&
                <p className='text-red-500 text-xs'>
                    {error}
                </p>
            }
        </div>
    )
}

export default InputField