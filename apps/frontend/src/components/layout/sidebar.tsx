"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, ClipboardList, CalendarCheck,
  ShieldAlert, BookOpen, Wallet, Receipt, PiggyBank,
  UserCog, UserCheck, CalendarOff, ChevronRight, GraduationCap,
  LogOut, Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  children?: { label: string; href: string }[];
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard",    href: "/dashboard",        icon: LayoutDashboard },
  { label: "Siswa",        href: "/siswa",            icon: Users           },
  { label: "PPDB",         href: "/ppdb",             icon: ClipboardList   },
  { label: "Absensi",      href: "/absensi",          icon: CalendarCheck   },
  { label: "Kedisiplinan", href: "/kedisiplinan",     icon: ShieldAlert     },
  { label: "Nilai",        href: "/nilai",            icon: BookOpen        },
  {
    label: "Keuangan", href: "/keuangan", icon: Wallet,
    children: [
      { label: "Tagihan SPP", href: "/keuangan/tagihan" },
      { label: "Payroll",     href: "/keuangan/payroll" },
      { label: "Dana BOS",    href: "/keuangan/bos"     },
    ],
  },
  {
    label: "HRIS", href: "/hris", icon: UserCog,
    children: [
      { label: "Data Pegawai",  href: "/hris/pegawai"   },
      { label: "Kehadiran",     href: "/hris/kehadiran" },
      { label: "Cuti & Izin",  href: "/hris/cuti"      },
    ],
  },
];

interface SidebarProps {
  userName?: string;
  userRole?: string;
}

export function Sidebar({ userName = "Admin", userRole = "Administrator" }: SidebarProps) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  }

  return (
    <aside className="flex h-screen w-60 flex-col bg-primary-700 text-white flex-shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-primary-600/50">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-400">
          <GraduationCap className="h-5 w-5 text-neutral-900" aria-hidden="true" />
        </div>
        <div>
          <p className="text-base font-bold leading-none tracking-wide">SIMS</p>
          <p className="text-2xs text-primary-200 mt-0.5 leading-none">Pondok Pesantren</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map((item) => (
          <NavEntry key={item.href} item={item} isActive={isActive} pathname={pathname} />
        ))}
      </nav>

      {/* Footer User */}
      <div className="border-t border-primary-600/50 px-3 py-3 space-y-1">
        <Link
          href="/portal-ortu/dashboard"
          className="w-full flex items-center gap-2.5 rounded px-3 py-2 text-xs font-semibold bg-accent-400 hover:bg-accent-300 text-neutral-900 transition-colors shadow-sm"
        >
          <GraduationCap className="h-4 w-4" aria-hidden="true" />
          <span>Buka Portal Wali Santri</span>
        </Link>
        <button className="w-full flex items-center gap-2.5 rounded px-3 py-2 text-sm text-primary-100 hover:bg-primary-600/50 transition-colors">
          <Settings className="h-4 w-4" aria-hidden="true" />
          <span>Pengaturan</span>
        </button>
        <div className="flex items-center gap-2.5 px-3 py-2">
          <div className="h-7 w-7 rounded-full bg-accent-400 flex items-center justify-center text-xs font-bold text-neutral-900 flex-shrink-0">
            {userName.slice(0, 1).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate">{userName}</p>
            <p className="text-2xs text-primary-200 truncate">{userRole}</p>
          </div>
          <Link href="/login" className="text-primary-200 hover:text-white transition-colors">
            <LogOut className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </aside>
  );
}

function NavEntry({
  item,
  isActive,
  pathname,
}: {
  item: NavItem;
  isActive: (href: string) => boolean;
  pathname: string;
}) {
  const active = isActive(item.href);
  const Icon = item.icon;
  const [isOpen, setIsOpen] = React.useState(active);

  // Keep expanded if active path changes to this section
  React.useEffect(() => {
    if (active) setIsOpen(true);
  }, [active]);

  if (item.children) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            "w-full flex items-center gap-2.5 rounded px-3 py-2 text-sm cursor-pointer select-none transition-colors",
            isOpen || active ? "bg-primary-600/60 text-white font-medium" : "text-primary-100 hover:bg-primary-600/40 hover:text-white",
          )}
        >
          <Icon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          <span className="flex-1 text-left">{item.label}</span>
          <ChevronRight className={cn("h-3.5 w-3.5 transition-transform", isOpen && "rotate-90")} aria-hidden="true" />
        </button>
        {isOpen && (
          <div className="ml-6 mt-0.5 space-y-0.5 border-l border-primary-600/40 pl-3">
            {item.children.map((child) => {
              const childActive = pathname === child.href;
              return (
                <Link
                  key={child.href}
                  href={child.href}
                  className={cn(
                    "block rounded px-2 py-1.5 text-sm transition-colors",
                    childActive
                      ? "text-white font-medium bg-primary-600/80"
                      : "text-primary-200 hover:text-white hover:bg-primary-600/30",
                  )}
                >
                  {child.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-2.5 rounded px-3 py-2 text-sm transition-colors",
        active
          ? "bg-primary-600 text-white font-medium"
          : "text-primary-100 hover:bg-primary-600/40 hover:text-white",
      )}
    >
      <Icon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
      <span>{item.label}</span>
    </Link>
  );
}
