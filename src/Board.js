import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=5, ncols=5, chanceLightStartsOn=0.5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    const lightsValues = Array.from({ length: nrows * ncols }, (_, index) => (Math.random() >= chanceLightStartsOn) ? true : false);
    initialBoard = lightsValues.reduce((row, isLit, idx) => {
      const chuckIndex = Math.floor(idx / ncols);
      if (!row[chuckIndex]) {
        row[chuckIndex] = [];
      }
      row[chuckIndex].push(isLit);

      return row;
    },[]);
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    const isWon = !board.flat().filter((light) => light === true);
    return isWon;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const newBoard = oldBoard.map((newRow) => newRow.map((newCell) => newCell));
      // TODO: in the copy, flip this cell and the cells around it
      const coordOffset = [1, 0, -1];

      const toFlipCoords = coordOffset.flatMap((yOffset) => 
      coordOffset.map((xOffset) => ({
        newY: yOffset + y, 
        newX: xOffset + x
        }))
      );

      toFlipCoords.map((coords) => flipCell(coords.newY, coords.newX, newBoard));

      // TODO: return the copy
      return newBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  if(hasWon()) {
    return (
      <>
        <p>Congratulations, you won!</p>
      </>
    )
  }

  // make table board
  return (
    <div className="Board">
      <table ClassName="Board-grid">
        <tbody>
          {board.map((row, rowIdx) => {
            return (<tr>
              {row.map((cell, cellIdx) => <Cell flipCellsAroundMe={flipCellsAround} isLit={cell} coord={`${rowIdx}-${cellIdx}`} />)}
            </tr>)
          })
          }
        </tbody>
      </table>
    </div>
  );
  // TODO
}

export default Board;
