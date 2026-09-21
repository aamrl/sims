"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  User,
  BookOpen,
  CalendarCheck,
  ShieldAlert,
  Receipt,
  ArrowLeft,
  Mail,
  MapPin,
  Calendar,
  IdCard,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { BadgeStatus } from "@/components/badge-status/badge-status";
import { formatRupiah, formatTanggal } from "@/lib/utils";
import {
  mockStudents,
  mockGrades,
  mockAttendances,
  mockDisciplineRecords,
  mockInvoices,
} from "@/lib/mock-data";

export default function SiswaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const student = mockStudents.find((s) => s.id === id);

  if (!student) {
    return (
      <div className="space-y-4">
        <Breadcrumb
          items={[{ label: "Data santri", href: "/siswa" }, { label: "Santri tidak ditemukan" }]}
        />
        <div className="bg-neutral-0 p-8 rounded-lg border border-neutral-200 text-center">
          <p className="text-neutral-600">Santri dengan ID tersebut tidak ditemukan.</p>
          <Link
            href="/siswa"
            className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-primary-600 hover:text-primary-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke daftar santri
          </Link>
        </div>
      </div>
    );
  }

  const studentGrades = mockGrades.filter((g) => g.id_siswa === student.id);
  const studentAttendances = mockAttendances.filter((a) => a.id_siswa === student.id);
  const studentDisciplines = mockDisciplineRecords.filter((d) => d.id_siswa === student.id);
  const studentInvoices = mockInvoices.filter((i) => i.id_referensi_siswa === student.id);

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "Data santri", href: "/siswa" },
          { label: student.nama_lengkap },
        ]}
      />

      {/* Header Profile Card */}
      <div className="bg-neutral-0 p-6 rounded-lg border border-neutral-200 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 rounded-full bg-primary-50 border border-primary-200 flex items-center justify-center text-primary-700 font-bold text-xl flex-shrink-0">
            {student.nama_lengkap
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-neutral-900">{student.nama_lengkap}</h1>
              {/* Full mode on detail page as required by design system */}
              <BadgeStatus variant={student.status as any} mode="full" />
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-xs text-neutral-600">
              <span className="flex items-center gap-1">
                <IdCard className="h-3.5 w-3.5 text-neutral-500" />
                NISN: <span className="font-mono text-neutral-900 font-medium">{student.nisn}</span>
              </span>
              <span>•</span>
              <span>Kelas {student.kelas?.nama}</span>
              <span>•</span>
              <span>{student.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/siswa"
            className="px-3 py-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 border border-neutral-200 hover:bg-neutral-100 rounded transition"
          >
            Kembali
          </Link>
          <button
            type="button"
            onClick={() => alert("Perubahan disimpan")}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded transition shadow-sm"
          >
            Edit santri
          </button>
        </div>
      </div>

      {/* Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Biodata */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-neutral-0 p-5 rounded-lg border border-neutral-200 shadow-card">
            <h2 className="text-sm font-semibold text-neutral-900 pb-3 mb-4 border-b border-neutral-200 flex items-center gap-2">
              <User className="h-4 w-4 text-primary-600" />
              Biodata lengkap
            </h2>

            <dl className="space-y-3 text-xs">
              <div>
                <dt className="text-neutral-500">NIK santri</dt>
                <dd className="font-mono font-medium text-neutral-900 mt-0.5">{student.nik}</dd>
              </div>
              <div>
                <dt className="text-neutral-500">Tempat, tanggal lahir</dt>
                <dd className="font-medium text-neutral-900 mt-0.5">
                  {student.tempat_lahir}, {student.tanggal_lahir}
                </dd>
              </div>
              <div>
                <dt className="text-neutral-500">Alamat domisili</dt>
                <dd className="font-medium text-neutral-900 mt-0.5">{student.alamat}</dd>
              </div>
              <div>
                <dt className="text-neutral-500">Tanggal masuk pesantren</dt>
                <dd className="font-medium text-neutral-900 mt-0.5">{student.tanggal_masuk}</dd>
              </div>
            </dl>
          </div>

          {/* Tagihan Santri */}
          <div className="bg-neutral-0 p-5 rounded-lg border border-neutral-200 shadow-card">
            <h2 className="text-sm font-semibold text-neutral-900 pb-3 mb-4 border-b border-neutral-200 flex items-center gap-2">
              <Receipt className="h-4 w-4 text-primary-600" />
              Riwayat tagihan SPP
            </h2>

            {studentInvoices.length === 0 ? (
              <p className="text-xs text-neutral-500">Belum ada tagihan.</p>
            ) : (
              <div className="divide-y divide-neutral-200">
                {studentInvoices.map((inv) => (
                  <div key={inv.id} className="py-2.5 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-neutral-900">
                        Periode {inv.periode}
                      </p>
                      <p className="text-2xs text-neutral-500 font-mono">
                        {formatRupiah(inv.jumlah)}
                      </p>
                    </div>
                    {/* In detail page, show full badge */}
                    <BadgeStatus variant={inv.status as any} mode="full" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Akademik, Absensi, Kedisiplinan */}
        <div className="lg:col-span-2 space-y-6">
          {/* Nilai Akademik */}
          <div className="bg-neutral-0 p-5 rounded-lg border border-neutral-200 shadow-card">
            <h2 className="text-sm font-semibold text-neutral-900 pb-3 mb-4 border-b border-neutral-200 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary-600" />
              Nilai akademik semester ini
            </h2>

            {studentGrades.length === 0 ? (
              <p className="text-xs text-neutral-500">Belum ada nilai yang diinput.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-neutral-900">
                  <thead>
                    <tr className="border-b border-neutral-300 text-neutral-600">
                      <th className="pb-2">Mata pelajaran</th>
                      <th className="pb-2">Jenis ujian</th>
                      <th className="pb-2">Nilai</th>
                      <th className="pb-2">Predikat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {studentGrades.map((g) => (
                      <tr key={g.id}>
                        <td className="py-2.5 font-medium">{g.mata_pelajaran?.nama}</td>
                        <td className="py-2.5 text-neutral-600">{g.jenis_nilai}</td>
                        <td className="py-2.5 font-mono font-bold text-neutral-900">{g.nilai}</td>
                        <td className="py-2.5">
                          <span
                            className={`px-2 py-0.5 rounded text-2xs font-bold ${
                              g.nilai >= 90
                                ? "bg-accent-50 text-accent-600 border border-accent-300"
                                : g.nilai >= 75
                                ? "bg-primary-50 text-primary-700 border border-primary-200"
                                : "bg-warning-bg text-warning-text border border-warning-border"
                            }`}
                          >
                            {g.nilai >= 90 ? "A (Istimewa)" : g.nilai >= 75 ? "B (Baik)" : "C (Cukup)"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Kedisiplinan & Pelanggaran */}
          <div className="bg-neutral-0 p-5 rounded-lg border border-neutral-200 shadow-card">
            <h2 className="text-sm font-semibold text-neutral-900 pb-3 mb-4 border-b border-neutral-200 flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-warning-fill" />
              Catatan kedisiplinan & poin santri
            </h2>

            {studentDisciplines.length === 0 ? (
              <p className="text-xs text-neutral-500 py-2">
                Tidak ada catatan pelanggaran. Santri memiliki rekam jejak kedisiplinan yang baik.
              </p>
            ) : (
              <div className="divide-y divide-neutral-200">
                {studentDisciplines.map((d) => (
                  <div key={d.id} className="py-3 flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold text-neutral-900">
                        {d.deskripsi_pelanggaran}
                      </p>
                      <p className="text-2xs text-neutral-500 mt-0.5">
                        Dicatat: {d.dicatat_pada} • Tindak lanjut: {d.tindak_lanjut || "-"}
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-[#FBEBDD] text-[#7A360A] border border-[#F0C9A8]">
                      +{d.poin} poin
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
