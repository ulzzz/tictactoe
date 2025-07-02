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
        "w-16 h-16 sm:w-24 sm:h-24 border border-indigo-100 text-3xl sm:text-5xl flex items-center justify-center",
        "transition-all duration-300 ease-in-out transform",
        "focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:hover:bg-white/80",
        "relative overflow-hidden group",
        isWinning 
          ? "bg-gradient-to-br from-green-100 to-green-200 animate-pulse shadow-lg shadow-green-200/50" 
          : value 
            ? "bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg" 
            : "bg-white/80 backdrop-blur-sm",
        disabled && !value ? "cursor-not-allowed hover:bg-white/90" : "cursor-pointer hover:bg-white/90",
        value && [
          "animate-cell-pop",
          "after:content-[''] after:absolute after:inset-0",
          "after:bg-white/40 after:rounded-full after:scale-0",
          "after:animate-ripple after:pointer-events-none",
          value === "🦊" 
            ? "shadow-orange-200/50 bg-gradient-to-br from-orange-50 to-amber-50" 
            : "shadow-blue-200/50 bg-gradient-to-br from-blue-50 to-purple-50"
        ],
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/50 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity"
      )}
      aria-label={value ? `Cell with ${value}` : "Empty cell"}
    >
      <span className={cn(
        "transform transition-all duration-300",
        !disabled && !value && "group-hover:scale-105 sm:group-hover:scale-110",
        value && [
          "animate-bounce-in",
          value === "🦊" 
            ? "drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]" 
            : "drop-shadow-[0_0_8px_rgba(147,197,253,0.5)]"
        ]
      )}>
        {value}
      </span>
    </button>
  );
};