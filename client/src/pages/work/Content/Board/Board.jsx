import styled from 'styled-components';
import WorkHeader from '../../WorkHeader';
import {
  Excalidraw,
  serializeAsJSON,
  restoreFromJSON,
} from '@excalidraw/excalidraw';
import { useEffect, useRef } from 'react';
import { Button } from '../../Component/Button';

const Board = () => {
  const excalidrawRef = useRef(null);

  const saveToLocalStorage = () => {
    if (excalidrawRef.current) {
      console.log('hhah');
      const data = serializeAsJSON(excalidrawRef.current.getSceneElements());
      localStorage.setItem('excalidrawContent', data);
    }
  };

  const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem('excalidrawContent');
    if (savedData) {
      const elements = restoreFromJSON(savedData).elements;
      excalidrawRef.current.updateScene({ elements });
    }
  };

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  return (
    <>
      <WorkHeader title="Board" />
      <Wrap>
        <Excalidraw ref={excalidrawRef} />
        {/* <button onClick={saveToLocalStorage}>저장</button> */}
      </Wrap>
    </>
  );
};
export default Board;

const Wrap = styled.div`
  width: 100%;
  height: 80vh;
  margin-top: 10px;
  margin-bottom: auto;
  margin-left: auto;
  margin-right: auto;
`;
