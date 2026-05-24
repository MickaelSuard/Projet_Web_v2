import { Bookmark, Grid2X2, Heart, Plus, UserRound } from "lucide-react";

export type CapsuleFilter = "all" | "mine" | "liked" | "bookmarked";

interface HomeHeaderProps {
  capsuleCount: number;
  likedCount: number;
  bookmarkedCount: number;
  searchQuery: string;
  activeFilter: CapsuleFilter;
  onFilterChange: (filter: CapsuleFilter) => void;
  onCreateClick: () => void;
}

const FILTERS = [
  { value: "all", label: "Toutes", icon: Grid2X2 },
  { value: "mine", label: "Mes créations", icon: UserRound },
  { value: "liked", label: "Likées", icon: Heart },
  { value: "bookmarked", label: "Sauvegardées", icon: Bookmark },
] satisfies { value: CapsuleFilter; label: string; icon: typeof Grid2X2 }[];

export function HomeHeader({ capsuleCount, likedCount, bookmarkedCount, searchQuery, activeFilter, onFilterChange, onCreateClick }: Readonly<HomeHeaderProps>) {
  const getFilterCount = (filter: CapsuleFilter) => {
    if (filter === "liked") return likedCount;
    if (filter === "bookmarked") return bookmarkedCount;
    return null;
  };

  return (
    <div className="mb-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Toutes les capsules</h1>
          <p className="mt-0.5 text-sm text-slate-500">{capsuleCount} capsule{capsuleCount === 1 ? "" : "s"}{searchQuery && ` pour « ${searchQuery} »`}</p>
        </div>
        <button onClick={onCreateClick} className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700" type="button">
          <Plus className="h-4 w-4" strokeWidth={2} />Créer
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map(({ value, label, icon: Icon }) => {
          const count = getFilterCount(value);
          return (
            <button key={value} onClick={() => onFilterChange(value)} className={` cursor-pointer inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition-colors ${activeFilter === value ? "border-indigo-200 bg-indigo-50 text-indigo-700" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`} type="button">
              <Icon className={`h-4 w-4 ${value === "liked" && activeFilter === value ? "fill-current" : ""}`} />{label}
              {count !== null && <span className={`rounded-full px-2 py-0.5 text-xs ${activeFilter === value ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-500"}`}>{count}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
