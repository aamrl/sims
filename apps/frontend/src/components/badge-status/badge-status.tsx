"use client";

import {
  CheckCircle, XCircle, AlertTriangle, Info, Award, Minus, Clock,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Token semantic mapping (design-system-revisi-warna.md §5) ─────────────────
type BadgeToken = "success" | "warning" | "error" | "info" | "accent" | "neutral";

const TOKEN_STYLES: Record<BadgeToken, { full: string; silent: string; icon: LucideIcon }> = {
  success: {
    full:   "bg-primary-50 border border-primary-200 text-primary-700",
    silent: "text-neutral-600",
    icon:   CheckCircle,
  },
  warning: {
    full:   "bg-[#FBEBDD] border border-[#F0C9A8] text-[#7A360A]",
    silent: "text-neutral-600",
    icon:   AlertTriangle,
  },
  error: {
    full:   "bg-[#FBEAE9] border border-[#EFB9B5] text-[#7A1913]",
    silent: "text-neutral-600",
    icon:   XCircle,
  },
  info: {
    full:   "bg-info-bg border border-info-border text-info-text",
    silent: "text-neutral-600",
    icon:   Info,
  },
  accent: {
    full:   "bg-accent-50 border border-accent-300 text-accent-600",
    silent: "text-neutral-600",
    icon:   Award,
  },
  neutral: {
    full:   "bg-neutral-100 border border-neutral-300 text-neutral-600",
    silent: "text-neutral-600",
    icon:   Minus,
  },
};

// ── Semua nilai enum → {token, label} (design-system-revisi-warna.md §5 tabel) ─
type BadgeVariant =
  | "aktif" | "lulus" | "pindah" | "keluar"         // students.status
  | "unpaid" | "partial" | "paid" | "overdue"        // invoices.status
  | "submitted" | "verified" | "selected" | "accepted" | "rejected" // ppdb
  | "hadir" | "sakit" | "izin" | "alpa"              // attendances.status
  | "pending" | "approved"                            // leave_requests.status
  | "draft"                                           // payrolls.status
  | "tetap" | "honorer"                               // employee jenis
  | "nonaktif";                                       // employee status

const VARIANT_MAP: Record<BadgeVariant, { token: BadgeToken; label: string; useClockIcon?: boolean }> = {
  aktif:      { token: "success", label: "Aktif"          },
  lulus:      { token: "accent",  label: "Lulus"          },
  pindah:     { token: "neutral", label: "Pindah"         },
  keluar:     { token: "error",   label: "Keluar"         },
  unpaid:     { token: "neutral", label: "Belum bayar"    },
  partial:    { token: "warning", label: "Sebagian"       },
  paid:       { token: "success", label: "Lunas"          },
  overdue:    { token: "error",   label: "Jatuh tempo"    },
  submitted:  { token: "info",    label: "Terkirim"       },
  verified:   { token: "info",    label: "Terverifikasi"  },
  selected:   { token: "accent",  label: "Terpilih"       },
  accepted:   { token: "success", label: "Diterima"       },
  rejected:   { token: "error",   label: "Ditolak"        },
  hadir:      { token: "success", label: "Hadir"          },
  sakit:      { token: "warning", label: "Sakit"          },
  izin:       { token: "info",    label: "Izin"           },
  alpa:       { token: "error",   label: "Alpa"           },
  pending:    { token: "warning", label: "Menunggu",     useClockIcon: true },
  approved:   { token: "success", label: "Disetujui"      },
  draft:      { token: "neutral", label: "Draft"          },
  tetap:      { token: "success", label: "Tetap"          },
  honorer:    { token: "info",    label: "Honorer"        },
  nonaktif:   { token: "neutral", label: "Nonaktif"       },
};

// ── Props ─────────────────────────────────────────────────────────────────────
interface BadgeStatusProps {
  variant: BadgeVariant;
  /**
   * "full" (default): background + border + ikon
   * "silent": hanya titik + teks — hanya untuk tabel padat staf (aktif/hadir/paid)
   */
  mode?: "full" | "silent";
  className?: string;
}

export function BadgeStatus({ variant, mode = "full", className }: BadgeStatusProps) {
  const mapping = VARIANT_MAP[variant];
  const tokenStyle = TOKEN_STYLES[mapping.token];
  const Icon = mapping.useClockIcon ? Clock : tokenStyle.icon;

  if (mode === "silent") {
    return (
      <span className={cn("inline-flex items-center gap-1.5 text-sm", tokenStyle.silent, className)}>
        <span
          className="h-1.5 w-1.5 rounded-full flex-shrink-0 bg-primary-500"
          aria-hidden="true"
        />
        {mapping.label}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
        tokenStyle.full,
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
      {mapping.label}
    </span>
  );
}
