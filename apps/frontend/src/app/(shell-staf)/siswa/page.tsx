"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Filter } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { DataTable, Column } from "@/components/data-table/data-table";
import { BadgeStatus } from "@/components/badge-status/badge-status";
import { mockStudents, mockClasses } from "@/lib/mock-data";
import { Student } from "@/types/entities";

export default function SiswaListPage() {
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const filteredStudents = mockStudents.filter((student) => {
    const matchClass = selectedClass === "all" || student.id_kelas === selectedClass;
    const matchStatus = selectedStatus === "all" || student.status === selectedStatus;
    return matchClass && matchStatus;
  });

  const columns: Column<Student>[] = [
    {
      key: "nama_lengkap",
      header: "Nama santri",
      render: (item) => (
        <Link
          href={`/siswa/${item.id}`}
          className="font-medium text-neutral-900 hover:text-primary-600 hover:underline transition"
        >
          {item.nama_lengkap}
        </Link>
      ),
    },
    {
      key: "nisn",
      header: "NISN",
      render: (item) => <span className="font-mono text-xs text-neutral-600">{item.nisn}</span>,
    },
    {
      key: "id_kelas",
      header: "Kelas",
      render: (item) => (
        <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-900 text-xs font-medium">
          {item.kelas?.nama || "-"}
        </span>
      ),
    },
    {
      key: "jenis_kelamin",
      header: "Gender",
      render: (item) => (
        <span className="text-neutral-600 text-xs">
          {item.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"}
        </span>
      ),
    },
    {
      key: "alamat",
      header: "Asal daerah",
      render: (item) => (
        <span className="text-neutral-600 text-xs max-w-xs truncate block">
          {item.tempat_lahir}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item) => {
        // According to design-system-revisi-warna.md §5:
        // 'aktif' uses silent mode in staff tables, while 'lulus', 'pindah', 'keluar' use full mode
        const isSilent = item.status === "aktif";
        return <BadgeStatus variant={item.status as any} mode={isSilent ? "silent" : "full"} />;
      },
    },
  ];

  return (
    <div className="space-y-4">
      <Breadcrumb items={[{ label: "Data santri" }]} />

      <Header
        title="Data Santri"
        subtitle="Manajemen data pokok santri, NISN, dan status akademik"
      />

      {/* Filter Toolbar */}
      <div className="bg-neutral-0 p-4 rounded-lg border border-neutral-200 shadow-card flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-neutral-600">
            <Filter className="h-3.5 w-3.5 text-neutral-500" />
            <span className="font-semibold">Filter:</span>
          </div>

          {/* Filter Kelas */}
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="text-xs py-1.5 px-3 border border-neutral-450 rounded bg-neutral-0 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">Semua kelas</option>
            {mockClasses.map((cls) => (
              <option key={cls.id} value={cls.id}>
                Kelas {cls.nama}
              </option>
            ))}
          </select>

          {/* Filter Status */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs py-1.5 px-3 border border-neutral-450 rounded bg-neutral-0 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">Semua status</option>
            <option value="aktif">Aktif</option>
            <option value="lulus">Lulus</option>
            <option value="pindah">Pindah</option>
            <option value="keluar">Keluar</option>
          </select>
        </div>

        {/* Action Button: Tambah siswa (Sentence case per design-system) */}
        <button
          type="button"
          onClick={() => alert("Form tambah siswa siap diintegrasikan")}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded transition shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Tambah siswa
        </button>
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredStudents}
        columns={columns}
        keyExtractor={(item) => item.id}
        searchPlaceholder="Cari nama, NISN, atau kota..."
        searchFilter={(item, query) =>
          item.nama_lengkap.toLowerCase().includes(query) ||
          (item.nisn || "").includes(query) ||
          item.tempat_lahir.toLowerCase().includes(query)
        }
      />
    </div>
  );
}
