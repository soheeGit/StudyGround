import { useState } from 'react';

export function Button({ name, type, size, onClick, color, hoverColor }) {
  const [isHovered, setIsHovered] = useState(false);
  const buttonStyle = {
    backgroundColor: isHovered ? hoverColor : color,
    'background-color': `${color}`,
    border: 'none',
    'border-radius': '10px',
    color: 'white',
    'padding-top': '5px',
    'padding-bottom': '5px',
    'padding-left': '30px',
    'padding-right': '30px',
    'margin-left': '20px',
    cursor: 'pointer',
  };
  return (
    <div className="button-container">
      <button
        type={type}
        onClick={onClick}
        style={buttonStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {name}
      </button>
    </div>
  );
}
