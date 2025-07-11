import styled from 'styled-components';
import { lighten } from 'polished';

const IconButton = ({
  children,
  name,
  backgroundColor = 'black',
  className,
  onClick,
  ...rest
}) => {
  return (
    <>
      <StyledButton
        backgroundColor={backgroundColor}
        className={className}
        onClick={onClick}
        {...rest}
      >
        {children}
        {name}
      </StyledButton>
    </>
  );
};
const StyledButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.backgroundColor};
  height: 50px;
  width: 80px;
  border: none;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  padding-left: 10px;
  padding-right: 10px;

  &:hover {
    background: ${(props) => lighten(0.1, props.backgroundColor)};
  }
  span {
    padding: 4px 7px;
    position: absolute;
    top: -12px;
    right: 5px;
    font-size: 12px;
    font-weight: bold;
    margin-left: 8px;
    border-radius: 10px;
    background: white;
    color: white;
  }
`;
export default IconButton;
