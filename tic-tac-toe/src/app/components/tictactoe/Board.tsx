import { Cell } from "./Cell";
import { calculateWinner } from "@/utils/gameLogic";

interface BoardProps {
  squares: (string | null)[];
  winningLine: number[] | null;
  onCellClick: (index: number) => void;
  disabled: boolean;
}

export const Board = ({ squares, winningLine, onCellClick, disabled }: BoardProps) => {
  return (
    <div className="grid grid-cols-3 gap-0 w-fit border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg">
      {squares.map((square, index) => (
        <Cell
          key={index}
          value={square}
          onClick={() => onCellClick(index)}
          isWinning={winningLine?.includes(index) || false}
          disabled={disabled || !!square}
        />
      ))}
    </div>
  );
};