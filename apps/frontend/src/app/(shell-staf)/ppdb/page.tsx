"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Filter } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { DataTable, Column } from "@/components/data-table/data-table";
import { BadgeStatus } from "@/components/badge-status/badge-status";
import { mockPpdbApplicants } from "@/lib/mock-data";
import { PpdbApplicant } from "@/types/entities";

export default function PpdbListPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredData = mockPpdbApplicants.filter((item) => {
    if (statusFilter === "all") return true;
    return item.status === statusFilter;
  });

  const columns: Column<PpdbApplicant>[] = [
    {
      key: "nomor_pendaftaran",
      header: "No. pendaftaran",
      render: (item) => (
        <span className="font-mono text-xs font-semibold text-primary-600">
          {item.nomor_pendaftaran}
        </span>
      ),
    },
    {
      key: "nama_lengkap",
      header: "Nama calon santri",
      render: (item) => (
        <Link
          href={`/ppdb/${item.id}`}
          className="font-medium text-neutral-900 hover:text-primary-600 hover:underline transition"
        >
          {item.nama_lengkap}
        </Link>
      ),
    },
    {
      key: "nama_orang_tua",
      header: "Nama orang tua",
      render: (item) => <span className="text-xs text-neutral-600">{item.nama_orang_tua}</span>,
    },
    {
      key: "kontak_orang_tua",
      header: "Kontak",
      render: (item) => (
        <span className="font-mono text-xs text-neutral-600">{item.kontak_orang_tua}</span>
      ),
    },
    {
      key: "dibuat_pada",
      header: "Tanggal daftar",
      render: (item) => <span className="text-xs text-neutral-600">{item.dibuat_pada}</span>,
    },
    {
      key: "status",
      header: "Status seleksi",
      render: (item) => (
        // PPDB statuses are always full mode per design-system
        <BadgeStatus variant={item.status as any} mode="full" />
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <Breadcrumb items={[{ label: "PPDB online" }]} />

      <Header
        title="Penerimaan Santri Baru (PPDB)"
        subtitle="Verifikasi berkas, seleksi, dan pengumuman hasil pendaftaran santri baru"
      />

      {/* Filter toolbar */}
      <div className="bg-neutral-0 p-4 rounded-lg border border-neutral-200 shadow-card flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-neutral-600">
            <Filter className="h-3.5 w-3.5 text-neutral-500" />
            <span className="font-semibold">Filter:</span>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs py-1.5 px-3 border border-neutral-450 rounded bg-neutral-0 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">Semua status</option>
            <option value="submitted">Terkirim (baru)</option>
            <option value="verified">Terverifikasi berkas</option>
            <option value="selected">Terpilih seleksi</option>
            <option value="accepted">Diterima</option>
            <option value="rejected">Ditolak</option>
          </select>
        </div>

        <button
          type="button"
          onClick={() => alert("Form pendaftaran manual baru dibuka")}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded transition shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Daftarkan calon santri
        </button>
      </div>

      <DataTable
        data={filteredData}
        columns={columns}
        keyExtractor={(item) => item.id}
        searchPlaceholder="Cari nomor pendaftaran, nama calon, atau orang tua..."
        searchFilter={(item, query) =>
          item.nama_lengkap.toLowerCase().includes(query) ||
          item.nomor_pendaftaran.toLowerCase().includes(query) ||
          item.nama_orang_tua.toLowerCase().includes(query)
        }
      />
    </div>
  );
}
