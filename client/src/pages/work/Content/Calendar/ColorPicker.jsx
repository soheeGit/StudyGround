import React from 'react';
import './ColorPicker.css';

const colors = [
  '#FFD235',
  '#F7323F',
  '#72D54A',
  '#C2D9F4',
  '#D9D9D9',
  '#FFDEAC',
];

const ColorPicker = ({ selectedColor, setSelectedColor }) => {
  return (
    <div className="color-picker">
      <div className="color-picker-grid">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`color-picker-box ${
              selectedColor === color ? 'selected' : ''
            }`}
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
