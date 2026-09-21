"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, Filter, Download, Plus } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { DataTable, Column } from "@/components/data-table/data-table";
import { mockGrades, mockSubjects, mockStudents } from "@/lib/mock-data";
import { Grade } from "@/types/entities";

export default function NilaiAkademikPage() {
  const [selectedSubject, setSelectedSubject] = useState("all");

  const filteredGrades = mockGrades.filter((g) => {
    if (selectedSubject === "all") return true;
    return g.id_mata_pelajaran === selectedSubject;
  });

  const columns: Column<Grade>[] = [
    {
      key: "siswa",
      header: "Nama santri",
      render: (item) => {
        const student = mockStudents.find((s) => s.id === item.id_siswa);
        return (
          <Link
            href={`/siswa/${item.id_siswa}`}
            className="font-medium text-neutral-900 hover:text-primary-600 hover:underline"
          >
            {student?.nama_lengkap || item.id_siswa}
          </Link>
        );
      },
    },
    {
      key: "mata_pelajaran",
      header: "Mata pelajaran",
      render: (item) => (
        <span className="text-xs text-neutral-900">{item.mata_pelajaran?.nama}</span>
      ),
    },
    {
      key: "jenis_nilai",
      header: "Jenis penilaian",
      render: (item) => (
        <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 text-2xs font-semibold">
          {item.jenis_nilai}
        </span>
      ),
    },
    {
      key: "semester",
      header: "Semester",
      render: (item) => (
        <span className="text-xs text-neutral-600">{item.semester} ({item.tahun_ajaran})</span>
      ),
    },
    {
      key: "nilai",
      header: "Nilai perolehan",
      render: (item) => {
        const isExcellent = item.nilai >= 90;
        const isGood = item.nilai >= 75 && item.nilai < 90;

        return (
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-neutral-900">{item.nilai}</span>
            <span
              className={`px-2 py-0.5 rounded text-2xs font-semibold ${
                isExcellent
                  ? "bg-accent-50 text-accent-600 border border-accent-300"
                  : isGood
                  ? "bg-primary-50 text-primary-700 border border-primary-200"
                  : "bg-warning-bg text-warning-text border border-warning-border"
              }`}
            >
              {isExcellent ? "A" : isGood ? "B" : "C"}
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Nilai & rapor" }]} />

      <Header
        title="Nilai Akademik & Rapor"
        subtitle="Manajemen penilaian santri, ujian semester, dan pencapaian akademik"
      />

      {/* Filter toolbar */}
      <div className="bg-neutral-0 p-4 rounded-lg border border-neutral-200 shadow-card flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-neutral-600">
            <Filter className="h-3.5 w-3.5 text-neutral-500" />
            <span className="font-semibold">Mata pelajaran:</span>
          </div>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="text-xs py-1.5 px-3 border border-neutral-450 rounded bg-neutral-0 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">Semua mata pelajaran</option>
            {mockSubjects.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.nama} ({sub.kode})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => alert("Ekspor rekap nilai berhasil diunduh (Excel)")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 bg-neutral-0 border border-neutral-200 hover:bg-neutral-100 rounded transition"
          >
            <Download className="h-3.5 w-3.5" />
            Ekspor rekap
          </button>
          <button
            type="button"
            onClick={() => alert("Form input nilai santri dibuka")}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded transition shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Input nilai
          </button>
        </div>
      </div>

      <DataTable
        data={filteredGrades}
        columns={columns}
        keyExtractor={(item) => item.id}
        searchPlaceholder="Cari santri atau pelajaran..."
        searchFilter={(item, q) =>
          (item.mata_pelajaran?.nama || "").toLowerCase().includes(q) ||
          item.jenis_nilai.toLowerCase().includes(q)
        }
      />
    </div>
  );
}
