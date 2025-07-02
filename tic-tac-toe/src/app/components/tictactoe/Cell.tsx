import { cn } from "@/lib/utils";

interface CellProps {
  value: string | null;
  onClick: () => void;
  isWinning: boolean;
  disabled: boolean;
}

export const Cell = ({ value, onClick, isWinning, disabled }: CellProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-24 h-24 border-2 border-gray-300 text-4xl font-bold flex items-center justify-center transition-all duration-300",
        "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:hover:bg-white",
        isWinning ? "bg-green-200" : "bg-white",
        value === "X" ? "text-blue-600" : "text-red-600",
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      )}
      aria-label={value ? `Cell with ${value}` : "Empty cell"}
    >
      {value}
    </button>
  );
};