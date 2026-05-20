import { Bookmark } from "lucide-react";

interface BookmarkButtonProps {
  active: boolean;
  onClick: () => void;
}

export function BookmarkButton({ active, onClick }: Readonly<BookmarkButtonProps>) {
  return (
    <button
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClick();
      }}
      className={`group flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 ${
        active ? "text-amber-500" : "text-slate-400 hover:text-amber-400"
      }`}
      aria-label="Sauvegarder"
      type="button"
    >
      <Bookmark
        className={`h-4 w-4 transition-transform duration-150 group-active:scale-125 ${
          active ? "fill-current" : "fill-none"
        }`}
        strokeWidth={2.25}
      />
    </button>
  );
}
