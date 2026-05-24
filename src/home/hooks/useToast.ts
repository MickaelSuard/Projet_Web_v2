import { useState } from "react";
import type { ToastItem } from "../types";

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = (id: number) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  };

  const addToast = (message: string) => {
    const id = Date.now();
    setToasts((currentToasts) => [...currentToasts, { id, message }]);
    setTimeout(() => removeToast(id), 2500);
  };
  return { toasts, addToast };
}
