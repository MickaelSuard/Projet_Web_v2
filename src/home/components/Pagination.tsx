interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: Readonly<PaginationProps>) {
  if (totalPages <= 1) return null;
  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30" type="button">
        ← Précédent
      </button>
      <div className="flex gap-1">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button key={page} onClick={() => onPageChange(page)} className={`h-9 w-9 rounded-lg text-sm font-medium transition-all ${page === currentPage ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"}`} type="button">
            {page}
          </button>
        ))}
      </div>
      <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30" type="button">
        Suivant →
      </button>
    </div>
  );
}
