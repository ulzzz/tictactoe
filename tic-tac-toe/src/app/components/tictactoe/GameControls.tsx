import { Button } from "@/components/ui/button";    

interface GameControlsProps {
  onReset: () => void;
  currentPlayer: string;
  winner: string | null;
  isDraw: boolean;
}

export const GameControls = ({ onReset, currentPlayer, winner, isDraw }: GameControlsProps) => {
  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <div className="text-xl font-semibold h-8">
        {winner ? (
          <span className="text-green-600">Player {winner} wins!</span>
        ) : isDraw ? (
          <span className="text-yellow-600">It's a draw!</span>
        ) : (
          <span>Player <span className={currentPlayer === "X" ? "text-blue-600" : "text-red-600"}>{currentPlayer}</span>'s turn</span>
        )}
      </div>
      <Button 
        onClick={onReset} 
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
      >
        {winner || isDraw ? "Play Again" : "Reset Game"}
      </Button>
    </div>
  );
};