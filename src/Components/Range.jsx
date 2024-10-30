import React from "react";
import "./Range.css"

function Range({ value, onChange, min = 0, max = 10000000, step = 2 }) {
  const handleRangeChange = (event) => {
    const newValue = event.target.value;
    onChange(newValue);
  };

  return (
    <div className="Slider">
    <div className="Range">
      <input
       id="range"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleRangeChange}
      />
    </div>
    </div>
  );
}

export default Range;
