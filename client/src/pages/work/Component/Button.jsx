import { useState } from 'react';

export function Button({ name, type, size, onClick, color, hoverColor }) {
  const [isHovered, setIsHovered] = useState(false);
  const buttonStyle = {
    width: `${size}`,
    backgroundColor: isHovered ? hoverColor : color,
    backgroundColor: `${color}`,
    border: 'none',
    borderRadius: '10px',
    color: 'white',
    paddingTop: '5px',
    paddingBottom: '5px',
    paddingLeft: '30px',
    paddingRight: '30px',
    marginRight: '20px',
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
