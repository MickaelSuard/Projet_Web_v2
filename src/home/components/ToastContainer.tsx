import type { ToastItem } from "../types";

interface ToastContainerProps {
  toasts: ToastItem[];
}

export function ToastContainer({ toasts }: Readonly<ToastContainerProps>) {
  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-100 flex -translate-x-1/2 flex-col items-center gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-in fade-in slide-in-from-bottom-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-xl"
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
