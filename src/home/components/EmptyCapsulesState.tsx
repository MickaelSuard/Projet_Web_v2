import { Frown } from "lucide-react";

export function EmptyCapsulesState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-slate-400">
      <Frown className="h-12 w-12" strokeWidth={1.5} />
      <p className="text-sm font-medium">Aucune capsule trouvée</p>
    </div>
  );
}
