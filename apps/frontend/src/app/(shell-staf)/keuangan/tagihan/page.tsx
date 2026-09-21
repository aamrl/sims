"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Wallet, Plus, Filter, Download, CheckCircle2, AlertTriangle, XCircle, Clock } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { DataTable, Column } from "@/components/data-table/data-table";
import { BadgeStatus } from "@/components/badge-status/badge-status";
import { formatRupiah } from "@/lib/utils";
import { mockInvoices } from "@/lib/mock-data";
import { Invoice } from "@/types/entities";

export default function KeuanganTagihanPage() {
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredInvoices = mockInvoices.filter((inv) => {
    if (statusFilter === "all") return true;
    return inv.status === statusFilter;
  });

  const totalPaid = mockInvoices
    .filter((i) => i.status === "paid")
    .reduce((acc, curr) => acc + curr.jumlah, 0);

  const totalUnpaid = mockInvoices
    .filter((i) => i.status === "unpaid" || i.status === "partial")
    .reduce((acc, curr) => acc + curr.jumlah, 0);

  const totalOverdue = mockInvoices
    .filter((i) => i.status === "overdue")
    .reduce((acc, curr) => acc + curr.jumlah, 0);

  const columns: Column<Invoice>[] = [
    {
      key: "siswa",
      header: "Nama santri",
      render: (item) => (
        <Link
          href={`/siswa/${item.id_referensi_siswa}`}
          className="font-medium text-neutral-900 hover:text-primary-600 hover:underline"
        >
          {item.siswa?.nama_lengkap}
        </Link>
      ),
    },
    {
      key: "kelas",
      header: "Kelas",
      render: (item) => <span className="text-xs text-neutral-600">{item.siswa?.kelas?.nama}</span>,
    },
    {
      key: "periode",
      header: "Periode SPP",
      render: (item) => <span className="text-xs font-mono text-neutral-900">{item.periode}</span>,
    },
    {
      key: "jumlah",
      header: "Nominal",
      render: (item) => (
        <span className="font-mono font-semibold text-xs text-neutral-900">
          {formatRupiah(item.jumlah)}
        </span>
      ),
    },
    {
      key: "tanggal_jatuh_tempo",
      header: "Jatuh tempo",
      render: (item) => (
        <span className="text-xs text-neutral-600 font-mono">{item.tanggal_jatuh_tempo}</span>
      ),
    },
    {
      key: "status",
      header: "Status pembayaran",
      render: (item) => {
        // According to design system: 'paid' is silent in staff table, other statuses are full
        const isSilent = item.status === "paid";
        return <BadgeStatus variant={item.status as any} mode={isSilent ? "silent" : "full"} />;
      },
    },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[{ label: "Keuangan", href: "/keuangan/tagihan" }, { label: "Tagihan SPP" }]}
      />

      <Header
        title="Tagihan SPP Santri"
        subtitle="Penerbitan tagihan bulanan, status verifikasi pembayaran, dan pelaporan piutang"
      />

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-neutral-0 p-4 rounded-lg border border-neutral-200 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-600">Total terbayar (Lunas)</span>
            <CheckCircle2 className="h-4 w-4 text-primary-600" />
          </div>
          <p className="text-xl font-bold text-primary-600 mt-2">{formatRupiah(totalPaid)}</p>
          <p className="text-2xs text-neutral-500 mt-1">
            {mockInvoices.filter((i) => i.status === "paid").length} transaksi lunas
          </p>
        </div>

        <div className="bg-neutral-0 p-4 rounded-lg border border-neutral-200 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-600">Belum dibayar</span>
            <Clock className="h-4 w-4 text-warning-fill" />
          </div>
          <p className="text-xl font-bold text-[#7A360A] mt-2">{formatRupiah(totalUnpaid)}</p>
          <p className="text-2xs text-neutral-500 mt-1">Menunggu pembayaran wali santri</p>
        </div>

        <div className="bg-neutral-0 p-4 rounded-lg border border-neutral-200 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-600">Lewat jatuh tempo</span>
            <XCircle className="h-4 w-4 text-danger-fill" />
          </div>
          <p className="text-xl font-bold text-[#7A1913] mt-2">{formatRupiah(totalOverdue)}</p>
          <p className="text-2xs text-neutral-500 mt-1">Perlu pengiriman notifikasi pengingat</p>
        </div>
      </div>

      {/* Filter toolbar */}
      <div className="bg-neutral-0 p-4 rounded-lg border border-neutral-200 shadow-card flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-neutral-600">
            <Filter className="h-3.5 w-3.5 text-neutral-500" />
            <span className="font-semibold">Status:</span>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs py-1.5 px-3 border border-neutral-450 rounded bg-neutral-0 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">Semua status</option>
            <option value="paid">Lunas</option>
            <option value="unpaid">Belum bayar</option>
            <option value="partial">Sebagian</option>
            <option value="overdue">Jatuh tempo</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => alert("Laporan rekap tagihan diunduh")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 bg-neutral-0 border border-neutral-200 hover:bg-neutral-100 rounded transition"
          >
            <Download className="h-3.5 w-3.5" />
            Ekspor rekap
          </button>
          <button
            type="button"
            onClick={() => alert("Generate tagihan SPP bulan baru berhasil")}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded transition shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Terbitkan tagihan SPP
          </button>
        </div>
      </div>

      <DataTable
        data={filteredInvoices}
        columns={columns}
        keyExtractor={(item) => item.id}
        searchPlaceholder="Cari nama santri atau periode..."
        searchFilter={(item, q) =>
          (item.siswa?.nama_lengkap || "").toLowerCase().includes(q) ||
          item.periode.includes(q)
        }
      />
    </div>
  );
}
