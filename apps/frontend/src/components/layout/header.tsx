"use client";

import { Bell, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function Header({ title, subtitle, className }: HeaderProps) {
  return (
    <header
      className={cn(
        "flex h-14 items-center justify-between border-b border-neutral-200 bg-white px-6 flex-shrink-0",
        className,
      )}
    >
      {/* Kiri: judul halaman */}
      <div>
        <h1 className="text-base font-semibold text-neutral-900 leading-tight">{title}</h1>
        {subtitle && <p className="text-xs text-neutral-500">{subtitle}</p>}
      </div>

      {/* Kanan: aksi */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search
            className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Cari..."
            className="h-8 w-48 rounded border border-neutral-200 bg-neutral-25 pl-8 pr-3 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 transition-shadow"
          />
        </div>

        {/* Notifikasi */}
        <button
          id="btn-notifikasi"
          className="relative flex h-8 w-8 items-center justify-center rounded border border-neutral-200 bg-white text-neutral-500 hover:bg-neutral-100 transition-colors"
          aria-label="Notifikasi"
        >
          <Bell className="h-4 w-4" aria-hidden="true" />
          {/* Dot indikator */}
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#C1560F]" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
