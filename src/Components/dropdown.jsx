import React from "react";
import Select from "react-select";
const DropDown = ({ options, label, name, value, onChange, className, dropdownLabel }) => {
    console.log("GenreValue",value);
    return (
        <div>
            <label className='text-xs text-slate-600'>{dropdownLabel}</label>
        <Select options={options} onChange={onChange} className="mb-4 mt-1 text-xs" value={value}>
            {
                label
            }
        </Select>
        </div>
       
    )
}

export default DropDown