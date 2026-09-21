"use client";

import React, { useState } from "react";
import { Calendar, Clock, Filter, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { DataTable, Column } from "@/components/data-table/data-table";
import { BadgeStatus } from "@/components/badge-status/badge-status";
import { mockEmployeeAttendances } from "@/lib/mock-data";
import { EmployeeAttendance } from "@/types/entities";

export default function HrisKehadiranPage() {
  const [selectedDate, setSelectedDate] = useState("2026-09-21");

  const columns: Column<EmployeeAttendance>[] = [
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
      key: "tanggal",
      header: "Tanggal",
      render: (item) => <span className="font-mono text-xs text-neutral-600">{item.tanggal}</span>,
    },
    {
      key: "jam_masuk",
      header: "Jam datang",
      render: (item) => (
        <span className="font-mono text-xs font-semibold text-neutral-900">
          {item.jam_masuk || "-"}
        </span>
      ),
    },
    {
      key: "jam_keluar",
      header: "Jam pulang",
      render: (item) => (
        <span className="font-mono text-xs text-neutral-600">
          {item.jam_keluar || "Belum checkout"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status kehadiran",
      render: (item) => {
        const isSilent = item.status === "hadir";
        return <BadgeStatus variant={item.status as any} mode={isSilent ? "silent" : "full"} />;
      },
    },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[{ label: "HRIS", href: "/hris/pegawai" }, { label: "Presensi pegawai" }]}
      />

      <Header
        title="Presensi & Kehadiran Pegawai"
        subtitle="Rekapitulasi jam kerja, ketepatan waktu hadir, dan kepatuhan jam mengajar"
      />

      {/* Date & Filter Toolbar */}
      <div className="bg-neutral-0 p-4 rounded-lg border border-neutral-200 shadow-card flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-neutral-600">
            <Calendar className="h-3.5 w-3.5 text-neutral-500" />
            <span className="font-semibold">Tanggal presensi:</span>
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="text-xs py-1.5 px-3 border border-neutral-450 rounded bg-neutral-0 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <button
          type="button"
          onClick={() => alert("Sinkronisasi mesin fingerprint berhasil!")}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded transition shadow-sm"
        >
          <Clock className="h-3.5 w-3.5" />
          Tarik data fingerprint
        </button>
      </div>

      <DataTable
        data={mockEmployeeAttendances}
        columns={columns}
        keyExtractor={(item) => item.id}
        searchPlaceholder="Cari pegawai..."
        searchFilter={(item, q) =>
          (item.pegawai?.nama_lengkap || "").toLowerCase().includes(q) ||
          (item.pegawai?.jabatan || "").toLowerCase().includes(q)
        }
      />
    </div>
  );
}
