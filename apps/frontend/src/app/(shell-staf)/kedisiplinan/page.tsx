"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldAlert, Plus, AlertTriangle, UserCheck } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { DataTable, Column } from "@/components/data-table/data-table";
import { mockDisciplineRecords } from "@/lib/mock-data";
import { DisciplineRecord } from "@/types/entities";

export default function KedisiplinanPage() {
  const columns: Column<DisciplineRecord>[] = [
    {
      key: "siswa",
      header: "Nama santri",
      render: (item) => (
        <Link
          href={`/siswa/${item.id_siswa}`}
          className="font-medium text-neutral-900 hover:text-primary-600 hover:underline"
        >
          {item.siswa?.nama_lengkap}
        </Link>
      ),
    },
    {
      key: "deskripsi_pelanggaran",
      header: "Deskripsi pelanggaran",
      render: (item) => (
        <span className="text-xs text-neutral-900 font-medium">{item.deskripsi_pelanggaran}</span>
      ),
    },
    {
      key: "poin",
      header: "Poin",
      render: (item) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-[#FBEBDD] text-[#7A360A] border border-[#F0C9A8]">
          +{item.poin}
        </span>
      ),
    },
    {
      key: "tindak_lanjut",
      header: "Tindak lanjut",
      render: (item) => (
        <span className="text-xs text-neutral-600">{item.tindak_lanjut || "Belum ada tindakan"}</span>
      ),
    },
    {
      key: "dicatat_pada",
      header: "Tanggal kejadian",
      render: (item) => <span className="text-xs text-neutral-600">{item.dicatat_pada}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Kedisiplinan & tata tertib" }]} />

      <Header
        title="Catatan Kedisiplinan Santri"
        subtitle="Pencatatan pelanggaran tata tertib, akumulasi poin, dan pembinaan santri"
      />

      {/* Threshold Guide */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-neutral-0 rounded-lg border border-neutral-200 shadow-card">
          <p className="text-xs font-semibold text-neutral-600">Level 1 (1 - 10 poin)</p>
          <p className="text-sm font-bold text-neutral-900 mt-1">Teguran Lisan & Pembinaan</p>
          <p className="text-2xs text-neutral-500 mt-1">Ditangani oleh wali kelas / musyrif</p>
        </div>
        <div className="p-4 bg-neutral-0 rounded-lg border border-[#F0C9A8] bg-[#FBEBDD]/30 shadow-card">
          <p className="text-xs font-semibold text-[#7A360A]">Level 2 (11 - 25 poin)</p>
          <p className="text-sm font-bold text-[#7A360A] mt-1">Panggilan Wali Santri</p>
          <p className="text-2xs text-neutral-600 mt-1">Surat peringatan 1 & konseling BK</p>
        </div>
        <div className="p-4 bg-neutral-0 rounded-lg border border-[#EFB9B5] bg-[#FBEAE9]/30 shadow-card">
          <p className="text-xs font-semibold text-[#7A1913]">Level 3 (&gt; 25 poin)</p>
          <p className="text-sm font-bold text-[#7A1913] mt-1">Sidang Dewan Guru</p>
          <p className="text-2xs text-neutral-600 mt-1">Skorsing atau pengembalian ke wali</p>
        </div>
      </div>

      <DataTable
        data={mockDisciplineRecords}
        columns={columns}
        keyExtractor={(item) => item.id}
        searchPlaceholder="Cari santri atau jenis pelanggaran..."
        searchFilter={(item, q) =>
          (item.siswa?.nama_lengkap || "").toLowerCase().includes(q) ||
          item.deskripsi_pelanggaran.toLowerCase().includes(q)
        }
        actions={
          <button
            type="button"
            onClick={() => alert("Form pencatatan pelanggaran siap diisi")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded transition shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Catat pelanggaran
          </button>
        }
      />
    </div>
  );
}
