import { Button } from "@/components/ui/button";    

interface GameControlsProps {
  onReset: () => void;
  currentPlayer: string;
  winner: string | null;
  isDraw: boolean;
}

export const GameControls = ({ onReset, currentPlayer, winner, isDraw }: GameControlsProps) => {
  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      <div className="text-2xl font-medium h-10 bg-white/50 px-6 py-1 rounded-full backdrop-blur-sm border border-white/20">
        {winner ? (
          <span>
            {winner} Wins! 🎉
          </span>
        ) : isDraw ? (
          <span>
            It&apos;s a draw! 🤝
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <span className="text-gray-700">Next player:</span> 
            <span className="text-3xl">{currentPlayer}</span>
          </span>
        )}
      </div>
      <Button 
        onClick={onReset} 
        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        {winner || isDraw ? "Play Again 🎮" : "Reset Game 🔄"}
      </Button>
    </div>
  );
};