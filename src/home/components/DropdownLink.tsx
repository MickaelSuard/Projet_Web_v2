import type { ReactNode } from "react";

interface DropdownLinkProps {
  href: string;
  icon: ReactNode;
  children: ReactNode;
}

export function DropdownLink({ href, icon, children }: Readonly<DropdownLinkProps>) {
  return (
    <a
      href={href}
      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50"
    >
      <span className="flex h-4 w-4 items-center justify-center">{icon}</span>
      {children}
    </a>
  );
}
