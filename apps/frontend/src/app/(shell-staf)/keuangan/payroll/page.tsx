"use client";

import React, { useState } from "react";
import { Receipt, Plus, Download, CheckCircle2, Clock } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { DataTable, Column } from "@/components/data-table/data-table";
import { BadgeStatus } from "@/components/badge-status/badge-status";
import { formatRupiah } from "@/lib/utils";
import { mockPayrolls } from "@/lib/mock-data";
import { Payroll } from "@/types/entities";

export default function KeuanganPayrollPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("2026-09");

  const totalPayroll = mockPayrolls.reduce((sum, p) => sum + p.gaji_bersih, 0);
  const totalPaid = mockPayrolls
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.gaji_bersih, 0);
  const totalDraft = mockPayrolls
    .filter((p) => p.status === "draft")
    .reduce((sum, p) => sum + p.gaji_bersih, 0);

  const columns: Column<Payroll>[] = [
    {
      key: "pegawai",
      header: "Nama guru / pegawai",
      render: (item) => (
        <div>
          <span className="font-medium text-neutral-900 block">{item.pegawai?.nama_lengkap}</span>
          <span className="text-2xs text-neutral-500">{item.pegawai?.jabatan}</span>
        </div>
      ),
    },
    {
      key: "periode",
      header: "Periode",
      render: (item) => <span className="font-mono text-xs text-neutral-600">{item.periode}</span>,
    },
    {
      key: "gaji_pokok",
      header: "Gaji pokok",
      render: (item) => (
        <span className="font-mono text-xs text-neutral-700">{formatRupiah(item.gaji_pokok)}</span>
      ),
    },
    {
      key: "total_tunjangan",
      header: "Tunjangan",
      render: (item) => (
        <span className="font-mono text-xs text-primary-600">+{formatRupiah(item.total_tunjangan)}</span>
      ),
    },
    {
      key: "total_potongan",
      header: "Potongan",
      render: (item) => (
        <span className="font-mono text-xs text-danger-text">
          {item.total_potongan > 0 ? `-${formatRupiah(item.total_potongan)}` : "Rp 0"}
        </span>
      ),
    },
    {
      key: "gaji_bersih",
      header: "Gaji bersih (THP)",
      render: (item) => (
        <span className="font-mono font-bold text-xs text-neutral-900">
          {formatRupiah(item.gaji_bersih)}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status pembayaran",
      render: (item) => {
        // 'paid' is silent in staff table, 'draft' is full
        const isSilent = item.status === "paid";
        return <BadgeStatus variant={item.status as any} mode={isSilent ? "silent" : "full"} />;
      },
    },
    {
      key: "action",
      header: "Slip",
      className: "text-right",
      render: (item) => (
        <button
          type="button"
          onClick={() => alert(`Cetak slip gaji: ${item.pegawai?.nama_lengkap}`)}
          className="text-xs font-semibold text-primary-600 hover:text-primary-700 hover:underline"
        >
          Lihat slip
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[{ label: "Keuangan", href: "/keuangan/tagihan" }, { label: "Payroll & penggajian" }]}
      />

      <Header
        title="Penggajian Guru & Pegawai"
        subtitle="Perhitungan gaji pokok, tunjangan kehadiran, potongan BPJS, dan penerbitan slip gaji"
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-neutral-0 p-4 rounded-lg border border-neutral-200 shadow-card">
          <p className="text-xs font-semibold text-neutral-600">Total alokasi gaji bulan ini</p>
          <p className="text-xl font-bold text-neutral-900 mt-2">{formatRupiah(totalPayroll)}</p>
          <p className="text-2xs text-neutral-500 mt-1">{mockPayrolls.length} staf & guru</p>
        </div>

        <div className="bg-neutral-0 p-4 rounded-lg border border-neutral-200 shadow-card">
          <p className="text-xs font-semibold text-neutral-600">Sudah ditransfer</p>
          <p className="text-xl font-bold text-primary-600 mt-2">{formatRupiah(totalPaid)}</p>
          <p className="text-2xs text-neutral-500 mt-1">
            {mockPayrolls.filter((p) => p.status === "paid").length} penerima terbayar
          </p>
        </div>

        <div className="bg-neutral-0 p-4 rounded-lg border border-neutral-200 shadow-card">
          <p className="text-xs font-semibold text-neutral-600">Menunggu otorisasi (Draft)</p>
          <p className="text-xl font-bold text-warning-fill mt-2">{formatRupiah(totalDraft)}</p>
          <p className="text-2xs text-neutral-500 mt-1">Perlu persetujuan pimpinan</p>
        </div>
      </div>

      <div className="bg-neutral-0 p-4 rounded-lg border border-neutral-200 shadow-card flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-neutral-600">Periode penggajian:</span>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="py-1.5 px-3 border border-neutral-450 rounded bg-neutral-0 text-neutral-900 focus:ring-2 focus:ring-primary-500"
          >
            <option value="2026-09">September 2026</option>
            <option value="2026-08">Agustus 2026</option>
            <option value="2026-07">Juli 2026</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => alert("Slip gaji massal sedang digenerate ke PDF")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 bg-neutral-0 border border-neutral-200 hover:bg-neutral-100 rounded transition"
          >
            <Download className="h-3.5 w-3.5" />
            Cetak semua slip
          </button>
          <button
            type="button"
            onClick={() => alert("Kalkulasi payroll berhasil dijalankan")}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded transition shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Hitung payroll baru
          </button>
        </div>
      </div>

      <DataTable
        data={mockPayrolls}
        columns={columns}
        keyExtractor={(item) => item.id}
        searchPlaceholder="Cari pegawai atau jabatan..."
        searchFilter={(item, q) =>
          (item.pegawai?.nama_lengkap || "").toLowerCase().includes(q) ||
          (item.pegawai?.jabatan || "").toLowerCase().includes(q)
        }
      />
    </div>
  );
}
