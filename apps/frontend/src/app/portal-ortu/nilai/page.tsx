"use client";

import React from "react";
import { Download, Award, BookOpen, CheckCircle } from "lucide-react";
import { mockStudents, mockGrades } from "@/lib/mock-data";

export default function PortalOrtuNilaiPage() {
  const currentChild = mockStudents[0]; // Ahmad Fauzi
  const grades = mockGrades.filter((g) => g.id_siswa === currentChild.id);

  const average = Math.round(
    grades.reduce((acc, curr) => acc + curr.nilai, 0) / (grades.length || 1)
  );

  return (
    <div className="space-y-6">
      {/* Title & Action Bar */}
      <div className="bg-neutral-0 p-5 rounded-xl border border-neutral-200 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-neutral-900">Rapor & Hasil Belajar Santri</h1>
          <p className="text-xs text-neutral-600 mt-0.5">
            Santri: <span className="font-semibold text-neutral-900">{currentChild.nama_lengkap}</span> • Kelas {currentChild.kelas?.nama} • Semester Ganjil 2026/2027
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert("Mengunduh Rapor Resmi PDF...")}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition shadow-sm"
        >
          <Download className="h-4 w-4" />
          Unduh rapor resmi (PDF)
        </button>
      </div>

      {/* Rapor Table */}
      <div className="bg-neutral-0 rounded-xl border border-neutral-200 shadow-card overflow-hidden">
        <div className="p-4 bg-neutral-25 border-b border-neutral-200 flex items-center justify-between">
          <span className="text-xs font-semibold text-neutral-700">Daftar Nilai Akademik</span>
          <span className="text-xs font-medium text-neutral-600">
            Rata-rata: <span className="font-bold text-primary-600 text-sm">{average}</span>
          </span>
        </div>

        <table className="w-full text-left text-xs text-neutral-900">
          <thead>
            <tr className="border-b border-neutral-300 bg-neutral-25 text-neutral-600 font-semibold">
              <th className="px-4 py-3 w-12 text-center">No</th>
              <th className="px-4 py-3">Mata pelajaran</th>
              <th className="px-4 py-3">Jenis evaluasi</th>
              <th className="px-4 py-3 text-center">Nilai angka</th>
              <th className="px-4 py-3 text-center">Predikat</th>
              <th className="px-4 py-3">Keterangan capaian</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {grades.map((g, idx) => (
              <tr key={g.id} className="hover:bg-neutral-100">
                <td className="px-4 py-3 text-center text-neutral-500">{idx + 1}</td>
                <td className="px-4 py-3 font-medium text-neutral-900">
                  {g.mata_pelajaran?.nama}
                </td>
                <td className="px-4 py-3 text-neutral-600">{g.jenis_nilai}</td>
                <td className="px-4 py-3 text-center font-mono font-bold text-neutral-900">
                  {g.nilai}
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded text-2xs font-bold ${
                      g.nilai >= 90
                        ? "bg-accent-50 text-accent-600 border border-accent-300"
                        : "bg-primary-50 text-primary-700 border border-primary-200"
                    }`}
                  >
                    {g.nilai >= 90 ? "A (Istimewa)" : "B (Baik)"}
                  </span>
                </td>
                <td className="px-4 py-3 text-neutral-600">
                  {g.nilai >= 90
                    ? "Sangat menguasai materi pembelajaran dengan pemahaman komprehensif"
                    : "Mampu menyelesaikan target kompetensi dasar dengan baik dan tuntas"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Catatan Wali Kelas */}
      <div className="bg-neutral-0 p-5 rounded-xl border border-neutral-200 shadow-card">
        <h2 className="text-sm font-semibold text-neutral-900 mb-2 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary-600" />
          Catatan & nasehat wali kelas
        </h2>
        <div className="p-4 rounded-lg bg-primary-50/50 border border-primary-200/60 text-xs text-neutral-800 leading-relaxed">
          &ldquo;Alhamdulillah ananda Ahmad Fauzi menunjukkan akhlak yang sangat terpuji, santun
          kepada asatidz, dan rajin dalam shalat berjamaah. Pertahankan konsistensi menghafal
          Al-Qur&apos;an dan terus tingkatkan ketelitian dalam latihan soal sains.&rdquo;
          <p className="mt-2 text-2xs font-semibold text-primary-700">
            — Ustadz Ahmad Rifa&apos;i, S.Pd. (Wali Kelas 7A)
          </p>
        </div>
      </div>
    </div>
  );
}
