import './Range.css';
import React, { useState } from 'react';

function Range () {
    const [showOptions, setShowOptions] = useState(false);

    const toggleOptions = () => {
    setShowOptions(!showOptions);
};

    return (
        <div className='range' style={{ position: 'absolute', top: '37%', right: '12%', transform: 'translate(20%, -10%)' }}>
            <a href="#" onClick={toggleOptions}>정렬 +</a>
            {showOptions && (
                <div className='col' style={{ position: 'absolute', top: '100%', right: 0, backgroundColor: '#fff', border: '1px solid #000', zIndex: 1 }}>
                    <div className="tag"> <a href="#">최신순</a></div>
                    <div className="tag"> <a href="#">오래된순</a></div>
                    <div className="tag"> <a href="#">인기순</a></div>
                </div>
            )}
        </div>
    );
}

export default Range;
