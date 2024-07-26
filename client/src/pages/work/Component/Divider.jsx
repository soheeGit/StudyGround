import React from 'react';

const Divider = ({ color, height, margin }) => {
  return (
    <div
      className="horizontal-divider"
      style={{
        backgroundColor: color,
        height: height,
        'margin-top': margin,
        'margin-bottom': margin,
      }}
    ></div>
  );
};

export default Divider;
