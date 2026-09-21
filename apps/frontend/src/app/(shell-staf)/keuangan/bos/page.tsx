"use client";

import React from "react";
import { PiggyBank, Plus, Download, TrendingUp } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { DataTable, Column } from "@/components/data-table/data-table";
import { formatRupiah } from "@/lib/utils";
import { mockBosFunds } from "@/lib/mock-data";
import { BosFund } from "@/types/entities";

export default function KeuanganBosPage() {
  const totalReceived = mockBosFunds.reduce((sum, b) => sum + b.jumlah_diterima, 0);
  const totalAllocated = mockBosFunds.reduce((sum, b) => sum + b.jumlah_dialokasikan, 0);
  const balance = totalReceived - totalAllocated;

  const columns: Column<BosFund>[] = [
    {
      key: "periode",
      header: "Tahap / periode",
      render: (item) => (
        <span className="font-semibold text-neutral-900 font-mono text-xs">{item.periode}</span>
      ),
    },
    {
      key: "jumlah_diterima",
      header: "Dana diterima",
      render: (item) => (
        <span className="font-mono text-xs font-semibold text-primary-600">
          {formatRupiah(item.jumlah_diterima)}
        </span>
      ),
    },
    {
      key: "jumlah_dialokasikan",
      header: "Teralokasi",
      render: (item) => (
        <span className="font-mono text-xs text-neutral-700">
          {formatRupiah(item.jumlah_dialokasikan)}
        </span>
      ),
    },
    {
      key: "sisa",
      header: "Sisa anggaran",
      render: (item) => {
        const remaining = item.jumlah_diterima - item.jumlah_dialokasikan;
        return (
          <span className="font-mono text-xs font-semibold text-accent-600">
            {formatRupiah(remaining)}
          </span>
        );
      },
    },
    {
      key: "catatan_alokasi",
      header: "Rincian alokasi",
      render: (item) => (
        <span className="text-xs text-neutral-600 max-w-sm block truncate">
          {item.catatan_alokasi}
        </span>
      ),
    },
    {
      key: "dibuat_pada",
      header: "Tanggal pencairan",
      render: (item) => <span className="text-xs text-neutral-500">{item.dibuat_pada}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[{ label: "Keuangan", href: "/keuangan/tagihan" }, { label: "Dana BOS" }]}
      />

      <Header
        title="Pengelolaan Dana Bantuan Operasional Sekolah (BOS)"
        subtitle="Pencatatan dana masuk APBN, rincian serapan anggaran, dan pelaporan pertanggungjawaban"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-neutral-0 p-4 rounded-lg border border-neutral-200 shadow-card">
          <p className="text-xs font-semibold text-neutral-600">Total BOS diterima</p>
          <p className="text-xl font-bold text-primary-600 mt-2">{formatRupiah(totalReceived)}</p>
          <p className="text-2xs text-neutral-500 mt-1">3 tahap pencairan tahun 2026</p>
        </div>

        <div className="bg-neutral-0 p-4 rounded-lg border border-neutral-200 shadow-card">
          <p className="text-xs font-semibold text-neutral-600">Total belanja & serapan</p>
          <p className="text-xl font-bold text-neutral-900 mt-2">{formatRupiah(totalAllocated)}</p>
          <p className="text-2xs text-neutral-500 mt-1">
            Persentase serapan: {Math.round((totalAllocated / totalReceived) * 100)}%
          </p>
        </div>

        <div className="bg-neutral-0 p-4 rounded-lg border border-neutral-200 shadow-card">
          <p className="text-xs font-semibold text-neutral-600">Sisa saldo kas BOS</p>
          <p className="text-xl font-bold text-accent-600 mt-2">{formatRupiah(balance)}</p>
          <p className="text-2xs text-neutral-500 mt-1">Tersedia di rekening giro sekolah</p>
        </div>
      </div>

      <DataTable
        data={mockBosFunds}
        columns={columns}
        keyExtractor={(item) => item.id}
        searchPlaceholder="Cari alokasi atau periode BOS..."
        searchFilter={(item, q) =>
          (item.catatan_alokasi || "").toLowerCase().includes(q) || item.periode.includes(q)
        }
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => alert("Laporan BOS LPJ siap dicetak")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 bg-neutral-0 border border-neutral-200 hover:bg-neutral-100 rounded transition"
            >
              <Download className="h-3.5 w-3.5" />
              Cetak LPJ BOS
            </button>
            <button
              type="button"
              onClick={() => alert("Pencatatan dana BOS baru dibuka")}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded transition shadow-sm"
            >
              <Plus className="h-4 w-4" />
              Catat pencairan BOS
            </button>
          </div>
        }
      />
    </div>
  );
}
