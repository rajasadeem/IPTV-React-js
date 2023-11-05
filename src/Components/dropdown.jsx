import React from "react";
import Select from "react-select";
const DropDown = ({ options, label, name, value, onChange, className, dropdownLabel, placeholder }) => {
    return (
        <div>
            <label className='text-xs text-gray-500'>
                {dropdownLabel}
            </label>
            <Select
                options={options}
                onChange={onChange}
                className={`mb-4 mt-1 text-xs text-gray-500 ${className}`}
                value={value}
                placeholder={placeholder}>
                {
                    label
                }
            </Select>
        </div>

    )
}

export default DropDown