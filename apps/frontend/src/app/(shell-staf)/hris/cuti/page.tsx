"use client";

import React, { useState } from "react";
import { CalendarOff, Plus, Check, X } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { DataTable, Column } from "@/components/data-table/data-table";
import { BadgeStatus } from "@/components/badge-status/badge-status";
import { mockLeaveRequests } from "@/lib/mock-data";
import { LeaveRequest } from "@/types/entities";

export default function HrisCutiPage() {
  const [requests, setRequests] = useState<LeaveRequest[]>(mockLeaveRequests);

  const handleAction = (id: string, newStatus: "approved" | "rejected") => {
    setRequests((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const columns: Column<LeaveRequest>[] = [
    {
      key: "pegawai",
      header: "Nama pemohon",
      render: (item) => (
        <div>
          <span className="font-medium text-neutral-900 block">{item.pegawai?.nama_lengkap}</span>
          <span className="text-2xs text-neutral-500">{item.pegawai?.jabatan}</span>
        </div>
      ),
    },
    {
      key: "jenis",
      header: "Kategori permohonan",
      render: (item) => (
        <span className="capitalize px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 text-xs font-medium">
          {item.jenis}
        </span>
      ),
    },
    {
      key: "tanggal",
      header: "Periode tanggal",
      render: (item) => (
        <span className="text-xs text-neutral-700 font-mono">
          {item.tanggal_mulai} s.d {item.tanggal_selesai}
        </span>
      ),
    },
    {
      key: "alasan",
      header: "Keterangan alasan",
      render: (item) => (
        <span className="text-xs text-neutral-600 max-w-xs block truncate">{item.alasan}</span>
      ),
    },
    {
      key: "status",
      header: "Status permohonan",
      render: (item) => (
        <BadgeStatus variant={item.status as any} mode="full" />
      ),
    },
    {
      key: "aksi",
      header: "Otorisasi",
      className: "text-right",
      render: (item) => {
        if (item.status === "pending") {
          return (
            <div className="flex items-center justify-end gap-1.5">
              <button
                type="button"
                onClick={() => handleAction(item.id, "approved")}
                title="Setujui permohonan"
                className="p-1 rounded bg-primary-50 text-primary-700 hover:bg-primary-100 border border-primary-200 transition"
              >
                <Check className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => handleAction(item.id, "rejected")}
                title="Tolak permohonan"
                className="p-1 rounded bg-[#FBEAE9] text-[#7A1913] hover:bg-[#EFB9B5] border border-[#EFB9B5] transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        }
        return <span className="text-2xs text-neutral-400">Selesai</span>;
      },
    },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[{ label: "HRIS", href: "/hris/pegawai" }, { label: "Manajemen cuti & izin" }]}
      />

      <Header
        title="Manajemen Cuti & Izin Pegawai"
        subtitle="Verifikasi dan otorisasi pengajuan cuti tahunan, sakit, dan izin dinas tenaga pendidik"
      />

      <DataTable
        data={requests}
        columns={columns}
        keyExtractor={(item) => item.id}
        searchPlaceholder="Cari nama pegawai atau alasan..."
        searchFilter={(item, q) =>
          (item.pegawai?.nama_lengkap || "").toLowerCase().includes(q) ||
          (item.alasan || "").toLowerCase().includes(q)
        }
        actions={
          <button
            type="button"
            onClick={() => alert("Form pengajuan cuti dibuka")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded transition shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Ajukan izin / cuti
          </button>
        }
      />
    </div>
  );
}
