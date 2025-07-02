"use client";

import { useState, useEffect } from "react";
import { Board } from "./components/tictactoe/Board";
import { GameControls } from "./components/tictactoe/GameControls";
import { calculateWinner, isBoardFull } from "../utils/gameLogic";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const PLAYER_SYMBOLS = {
  X: "🦊",
  O: "🐿️"
};

export default function TicTacToePage() {
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [isDraw, setIsDraw] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);

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
    setShowDialog(false);
  };

  useEffect(() => {
    const { winner: newWinner, line } = calculateWinner(squares);
    if (newWinner) {
      setWinner(newWinner);
      setWinningLine(line);
      setShowDialog(true);
    } else if (isBoardFull(squares)) {
      setIsDraw(true);
      setShowDialog(true);
    }
  }, [squares]);

  const getPlayerEmoji = (player: string | null) => {
    if (!player) return null;
    return PLAYER_SYMBOLS[player as keyof typeof PLAYER_SYMBOLS];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-white/20">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Emilio's Tic Tac Toe
        </h1>
        
        <div className="flex justify-center mb-8">
          <Board 
            squares={squares.map(getPlayerEmoji)} 
            winningLine={winningLine} 
            onCellClick={handleClick} 
            disabled={!!winner || isDraw}
          />
        </div>
        
        <GameControls 
          onReset={resetGame} 
          currentPlayer={isXNext ? PLAYER_SYMBOLS.X : PLAYER_SYMBOLS.O} 
          winner={winner ? PLAYER_SYMBOLS[winner as keyof typeof PLAYER_SYMBOLS] : null} 
          isDraw={isDraw} 
        />
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-lg font-medium text-gray-700">
          <span className="inline-flex items-center gap-2">
            Player Fox <span className="text-2xl">{PLAYER_SYMBOLS.X}</span>
          </span>
          <span className="mx-4">vs</span>
          <span className="inline-flex items-center gap-2">
            Player Squirrel <span className="text-2xl">{PLAYER_SYMBOLS.O}</span>
          </span>
        </p>
        <p className="mt-2 text-sm text-gray-600 font-medium">Winning moves are highlighted in green ✨</p>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px] bg-white/95 backdrop-blur-sm border-2">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-center">
              {isDraw ? "It's a Draw! 🤝" : `${getPlayerEmoji(winner)} Wins! 🎉`}
            </DialogTitle>
            <DialogDescription className="text-center pt-4 text-lg text-gray-700">
              {isDraw 
                ? "The game ended in a draw. Ready for another round?" 
                : `Congratulations! Want to play again?`}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-6">
            <button
              onClick={resetGame}
              className="px-6 py-3 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Play Again 🎮
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}