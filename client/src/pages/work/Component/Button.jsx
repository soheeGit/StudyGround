import { useState } from 'react';
import styled from 'styled-components';

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
    <ButtonWrap>
      <button
        type={type}
        onClick={onClick}
        style={buttonStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {name}
      </button>
    </ButtonWrap>
  );
}

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
