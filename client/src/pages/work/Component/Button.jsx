export function Button({ name, onClick, color }) {
  const containerStyle = {};
  const buttonStyle = {
    'background-color': `${color}`,
    border: 'none',
    'border-radius': '10px',
    color: 'white',
    'padding-top': '5px',
    'padding-bottom': '5px',
    'padding-left': '10px',
    'padding-right': '10px',
  };
  console.log(buttonStyle);
  return (
    <div className="button-container" style={containerStyle}>
      <button onClick={onClick} style={buttonStyle}>
        {name}
      </button>
    </div>
  );
}
