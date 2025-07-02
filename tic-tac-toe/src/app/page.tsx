"use client";

import { useState, useEffect } from "react";
import { Board } from "./components/tictactoe/Board";
import { GameControls } from "./components/tictactoe/GameControls";
import { calculateWinner, isBoardFull } from "../utils/gameLogic";
import confetti from 'canvas-confetti';
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

const fireworks = () => {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  const interval: any = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: Math.random(), y: Math.random() * 0.5 }
    });
  }, 250);
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
      fireworks();
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 animate-gradient overflow-hidden relative">
      <div className="absolute inset-0 bg-pattern floating-shapes opacity-70" />
      
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-200/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/3 -right-20 w-60 h-60 bg-purple-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }} />
        <div className="absolute -bottom-20 left-1/3 w-48 h-48 bg-pink-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-4s' }} />
      </div>

      <div className="relative flex flex-col items-center justify-center min-h-screen p-4">
        <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-white/20">
          <h1 className="text-4xl font-bold text-center mb-6 animate-pulse">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              Emilio's
            </span>
            <span className="block text-5xl mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
              Tic Tac Toe
            </span>
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
          <DialogContent className="sm:max-w-[425px] bg-white/95 backdrop-blur-sm border-2 animate-popup">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-center">
                {isDraw ? "It's a Draw! 🤝" : `${getPlayerEmoji(winner)} Wins! 🎉`}
              </DialogTitle>
              <DialogDescription className="text-center pt-4 text-lg text-gray-700">
                {isDraw 
                  ? "The game ended in a draw. Ready for another round?" 
                  : "Congratulations! Want to play again?"}
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center mt-6">
              <button
                onClick={resetGame}
                className="px-6 py-3 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl animate-bounce-in animate-pulse"
              >
                Play Again 🎮
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}