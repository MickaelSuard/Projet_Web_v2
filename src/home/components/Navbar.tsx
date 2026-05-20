import { ChevronDown, Heart, LogOut, Plus, Search, Shield, SquarePen } from "lucide-react";
import { useState } from "react";
import type { User } from "../types";
import { DropdownLink } from "./DropdownLink";

interface NavbarProps {
  user: User;
  favoriteCount: number;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function Navbar({ user, favoriteCount, searchQuery, onSearchChange }: Readonly<NavbarProps>) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <a href="/" className="shrink-0 text-xl font-black tracking-tight text-slate-900 transition-colors hover:text-indigo-600" style={{ fontFamily: "'Georgia', serif" }}>
          Bloutub
        </a>

        <div className="relative max-w-md flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input type="text" value={searchQuery} onChange={(event) => onSearchChange(event.target.value)} placeholder="Rechercher..." className="w-full rounded-full border border-transparent bg-slate-100 py-2 pl-9 pr-4 text-sm transition-all focus:border-indigo-400 focus:bg-white focus:outline-none" />
        </div>

        <div className="relative ml-auto">
          
          <button onClick={() => setMenuOpen((isOpen) => !isOpen)} type="button" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-indigo-600">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">{user.username[0].toUpperCase()}</span>
            <span className="hidden sm:inline">{user.username}</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${menuOpen ? "rotate-180" : ""}`} />
          </button>

          {menuOpen && (
            <div className="animate-in fade-in slide-in-from-top-2 absolute right-0 z-50 mt-2 w-52 rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
              <DropdownLink href="/my-creations" icon={<SquarePen className="h-4 w-4" />}>Mes créations</DropdownLink>
              <DropdownLink href="/favorites" icon={<Heart className="h-4 w-4" />}>
                Favoris<span className="ml-auto rounded-full bg-rose-100 px-2 py-0.5 text-xs font-semibold text-rose-600">{favoriteCount}</span>
              </DropdownLink>
              <DropdownLink href="/create" icon={<Plus className="h-4 w-4" />}>Créer une capsule</DropdownLink>
              {user.role === "admin" && (
                <>
                  <div className="my-1 border-t border-slate-100" />
                  <DropdownLink href="/admin" icon={<Shield className="h-4 w-4" />}>Panneau Admin</DropdownLink>
                </>
              )}
              <div className="my-1 border-t border-slate-100" />
              <a href="/" className="flex items-center gap-2 px-4 py-2 text-sm text-rose-600 transition-colors hover:bg-rose-50">
                <LogOut className="h-4 w-4" /> Déconnexion
              </a>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
