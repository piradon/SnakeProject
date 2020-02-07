import React from 'react';
import Board from '../Board/Board.js'
import './GameWrapper.css';

function GameWrapper() {
  return (
    <Board columnsNumber={parseInt(
      window
        .getComputedStyle(document.documentElement)
        .getPropertyValue("--columns-number")
    )} rowsNumber={parseInt(
      window
        .getComputedStyle(document.documentElement)
        .getPropertyValue("--rows-number")
    )}></Board>
  );
}

export default GameWrapper;