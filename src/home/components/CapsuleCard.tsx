import type { Capsule } from "../types";
import { BookmarkButton } from "./BookmarkButton";
import { HeartButton } from "./HeartButton";

interface CapsuleCardProps {
  capsule: Capsule;
  onToggleLike: (id: number) => void;
  onToggleBookmark: (id: number) => void;
  onOpen: (capsule: Capsule) => void;
}

export function CapsuleCard({
  capsule,
  onToggleLike,
  onToggleBookmark,
  onOpen,
}: Readonly<CapsuleCardProps>) {
  const date = new Date(capsule.createdAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <button
      onClick={() => onOpen(capsule)}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onOpen(capsule);
      }}
    >
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        <img
          src={capsule.imagePath}
          alt={capsule.description}
          onError={(event) => {
            event.currentTarget.src = "/assets/image.png";
          }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute right-2 top-2 flex gap-1 rounded-full bg-white/80 px-1 py-1 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
          <HeartButton active={capsule.isLiked} onClick={() => onToggleLike(capsule.id)} />
          <BookmarkButton
            active={capsule.isBookmarked}
            onClick={() => onToggleBookmark(capsule.id)}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="line-clamp-2 text-sm font-medium leading-snug text-slate-800">
          {capsule.description}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500">
            par <span className="font-semibold text-slate-700">{capsule.username}</span>
          </span>
          <span className="text-xs text-slate-400">{date}</span>
        </div>
      </div>
    </button>
  );
}
