"use client";

import { useState, useEffect } from "react";
import { Board } from "./components/tictactoe/Board";
import { GameControls } from "./components/tictactoe/GameControls";
import { calculateWinner, isBoardFull } from "../utils/gameLogic";

export default function TicTacToePage() {
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [isDraw, setIsDraw] = useState<boolean>(false);

  const handleClick = (index: number) => {
    if (squares[index] || winner || isDraw) return;
    
    const newSquares = [...squares];
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine(null);
    setIsDraw(false);
  };

  useEffect(() => {
    const { winner: newWinner, line } = calculateWinner(squares);
    if (newWinner) {
      setWinner(newWinner);
      setWinningLine(line);
    } else if (isBoardFull(squares)) {
      setIsDraw(true);
    }
  }, [squares]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-6 md:p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Tic Tac Toe</h1>
        
        <div className="flex justify-center mb-8">
          <Board 
            squares={squares} 
            winningLine={winningLine} 
            onCellClick={handleClick} 
            disabled={!!winner || isDraw}
          />
        </div>
        
        <GameControls 
          onReset={resetGame} 
          currentPlayer={isXNext ? "X" : "O"} 
          winner={winner} 
          isDraw={isDraw} 
        />
      </div>
      
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>Player X: <span className="text-blue-600">Blue</span> | Player O: <span className="text-red-600">Red</span></p>
        <p className="mt-2">Winning cells are highlighted in green</p>
      </div>
    </div>
  );
}