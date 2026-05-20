import { Plus } from "lucide-react";

interface HomeHeaderProps {
  capsuleCount: number;
  searchQuery: string;
}

export function HomeHeader({ capsuleCount, searchQuery }: Readonly<HomeHeaderProps>) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Toutes les capsules</h1>
        <p className="mt-0.5 text-sm text-slate-500">
          {capsuleCount} capsule{capsuleCount === 1 ? "" : "s"}{searchQuery && ` pour « ${searchQuery} »`}
        </p>
      </div>
      <a href="/create" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700">
        <Plus className="h-4 w-4" strokeWidth={2} />Créer
      </a>
    </div>
  );
}
