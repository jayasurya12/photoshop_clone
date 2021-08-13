import React from 'react'

const Slider = ({min,max,value,handleChange}) => {
    console.log(value);
    return (
        <div className="slider-container">
            <input type="range" className="slider" 
            min={min} max={max} 
            value={value}
            onChange={handleChange}
            /> 
        {value}
        </div>
    )
}

export default Slider
