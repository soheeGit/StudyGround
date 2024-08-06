import React, { useEffect, useRef, useState } from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';
import io from 'socket.io-client';
import './excalidraw.css';

const socket = io('http://localhost:5000');

const ExcalidrawCanvas = () => {
  const excalidrawRef = useRef(null);
  const [elements, setElements] = useState([]);

  useEffect(() => {
    socket.on('init-elements', (initialElements) => {
      setElements(initialElements);
    });

    socket.on('update-elements', (updatedElements) => {
      setElements(updatedElements);
    });

    return () => {
      socket.off('init-elements');
      socket.off('update-elements');
    };
  }, []);

  const handleChange = (updatedElements) => {
    setElements(updatedElements);
    socket.emit('update-elements', updatedElements);
  };

  return (
    <div className="excalidraw-wrapper">
      <Excalidraw
        ref={excalidrawRef}
        initialData={{ elements }}
        onChange={(elements) => handleChange(elements)}
      />
    </div>
  );
};

export default ExcalidrawCanvas;
