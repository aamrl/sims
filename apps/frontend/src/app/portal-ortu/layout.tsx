"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  CalendarCheck,
  Receipt,
  LogOut,
  User,
  ShieldAlert,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockStudents } from "@/lib/mock-data";

export default function PortalOrtuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentChild = mockStudents[0]; // Ahmad Fauzi

  const navItems = [
    { label: "Ringkasan", href: "/portal-ortu/dashboard", icon: LayoutDashboard },
    { label: "Nilai & Rapor", href: "/portal-ortu/nilai", icon: BookOpen },
    { label: "Kehadiran", href: "/portal-ortu/absensi", icon: CalendarCheck },
    { label: "Tagihan SPP", href: "/portal-ortu/tagihan", icon: Receipt },
  ];

  return (
    <div className="min-h-screen bg-neutral-25 flex flex-col">
      {/* Top Header Portal Ortu */}
      <header className="bg-primary-900 text-white border-b border-accent-400/40 sticky top-0 z-30 shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Brand */}
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-accent-400 flex items-center justify-center text-neutral-900 font-bold shadow-sm">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <span className="font-bold text-sm tracking-tight text-white block">
                  Portal Wali Santri
                </span>
                <span className="text-2xs text-accent-300 block">SIMS Pesantren Terpadu</span>
              </div>
            </div>

            {/* Child Selector & Parent Profile */}
            <div className="flex items-center gap-4">
              {/* Active Child Indicator */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-primary-700/80 border border-primary-500/40 text-xs">
                <span className="text-neutral-300">Santri:</span>
                <span className="font-semibold text-white">{currentChild.nama_lengkap}</span>
                <span className="text-accent-300">({currentChild.kelas?.nama})</span>
              </div>

              {/* User Switcher / Logout */}
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs text-neutral-200 hover:text-white hover:bg-primary-700 transition"
                  title="Ganti akun / keluar"
                >
                  <LogOut className="h-3.5 w-3.5 text-neutral-400" />
                  <span className="hidden md:inline">Keluar</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation Bar */}
          <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto py-2 border-t border-primary-700/60 scrollbar-none">
            {navItems.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium whitespace-nowrap transition",
                    active
                      ? "bg-primary-600 text-white font-semibold shadow-sm"
                      : "text-neutral-300 hover:text-white hover:bg-primary-700/50"
                  )}
                >
                  <Icon className={cn("h-4 w-4", active ? "text-accent-300" : "text-neutral-400")} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-neutral-0 border-t border-neutral-200 py-6 mt-12 text-center text-xs text-neutral-500">
        <div className="max-w-6xl mx-auto px-4">
          <p>Layanan Informasi Wali Santri & Pesantren Terpadu • Dukungan Informasi: 0812-3456-7890</p>
          <p className="mt-1 text-2xs text-neutral-400">
            Akses staf administrasi?{" "}
            <Link href="/dashboard" className="text-primary-600 hover:underline">
              Buka Shell Staf
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
