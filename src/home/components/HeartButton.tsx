import { Heart } from "lucide-react";

interface HeartButtonProps {
  active: boolean;
  onClick: () => void;
}

export function HeartButton({ active, onClick }: Readonly<HeartButtonProps>) {
  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClick();
      }}
      className={`group relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 ${
        active ? "text-rose-500" : "text-slate-400 hover:text-rose-400"
      }`}
      aria-label="Aimer"
      type="button"
    >
      <Heart
        className={`h-5 w-5 transition-transform duration-150 group-active:scale-125 ${
          active ? "fill-current" : "fill-none"
        }`}
        strokeWidth={2.25}
      />
    </button>
  );
}
