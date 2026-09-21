"use client";

import React, { useState } from "react";
import { UserCog, Plus, Filter, Mail, Phone } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { DataTable, Column } from "@/components/data-table/data-table";
import { BadgeStatus } from "@/components/badge-status/badge-status";
import { mockEmployees } from "@/lib/mock-data";
import { Employee } from "@/types/entities";

export default function HrisPegawaiPage() {
  const [filterType, setFilterType] = useState("all");

  const filteredEmployees = mockEmployees.filter((emp) => {
    if (filterType === "all") return true;
    return emp.jenis_kepegawaian === filterType;
  });

  const columns: Column<Employee>[] = [
    {
      key: "nama_lengkap",
      header: "Nama lengkap",
      render: (item) => (
        <div>
          <span className="font-medium text-neutral-900 block">{item.nama_lengkap}</span>
          <span className="text-2xs text-neutral-500">{item.jabatan}</span>
        </div>
      ),
    },
    {
      key: "nip",
      header: "NIP",
      render: (item) => (
        <span className="font-mono text-xs text-neutral-600">{item.nip || "-"}</span>
      ),
    },
    {
      key: "jenis_kepegawaian",
      header: "Status kepegawaian",
      render: (item) => (
        <BadgeStatus variant={item.jenis_kepegawaian as any} mode="full" />
      ),
    },
    {
      key: "tanggal_masuk",
      header: "Masa kerja sejak",
      render: (item) => <span className="text-xs text-neutral-600">{item.tanggal_masuk}</span>,
    },
    {
      key: "status",
      header: "Status kerja",
      render: (item) => {
        // 'aktif' uses silent mode in staff table
        const isSilent = item.status === "aktif";
        return <BadgeStatus variant={item.status as any} mode={isSilent ? "silent" : "full"} />;
      },
    },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[{ label: "HRIS", href: "/hris/pegawai" }, { label: "Data pegawai" }]}
      />

      <Header
        title="Data Guru & Tenaga Kependidikan"
        subtitle="Manajemen data pokok kepegawaian, jabatan struktural, dan status masa kerja"
      />

      {/* Filter Toolbar */}
      <div className="bg-neutral-0 p-4 rounded-lg border border-neutral-200 shadow-card flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-neutral-600">
            <Filter className="h-3.5 w-3.5 text-neutral-500" />
            <span className="font-semibold">Jenis kepegawaian:</span>
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="text-xs py-1.5 px-3 border border-neutral-450 rounded bg-neutral-0 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">Semua jenis</option>
            <option value="tetap">Pegawai Tetap (Yayasan)</option>
            <option value="honorer">Guru Honorer / Paruh Waktu</option>
          </select>
        </div>

        <button
          type="button"
          onClick={() => alert("Form tambah pegawai siap diisi")}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded transition shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Tambah pegawai baru
        </button>
      </div>

      <DataTable
        data={filteredEmployees}
        columns={columns}
        keyExtractor={(item) => item.id}
        searchPlaceholder="Cari nama, NIP, atau jabatan..."
        searchFilter={(item, q) =>
          item.nama_lengkap.toLowerCase().includes(q) ||
          (item.nip || "").includes(q) ||
          item.jabatan.toLowerCase().includes(q)
        }
      />
    </div>
  );
}
