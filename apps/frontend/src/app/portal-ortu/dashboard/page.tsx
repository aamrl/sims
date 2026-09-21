"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  CalendarCheck,
  Receipt,
  Award,
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { BadgeStatus } from "@/components/badge-status/badge-status";
import { formatRupiah } from "@/lib/utils";
import { mockStudents, mockGrades, mockAttendances, mockInvoices } from "@/lib/mock-data";

export default function PortalOrtuDashboard() {
  const currentChild = mockStudents[0]; // Ahmad Fauzi
  const grades = mockGrades.filter((g) => g.id_siswa === currentChild.id);
  const averageGrade = Math.round(
    grades.reduce((sum, g) => sum + g.nilai, 0) / (grades.length || 1)
  );

  const studentInvoices = mockInvoices.filter((i) => i.id_referensi_siswa === currentChild.id);
  const latestInvoice = studentInvoices[0];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-primary-900 text-white rounded-xl p-6 relative overflow-hidden shadow-lg border border-accent-400/30">
        <div className="absolute right-0 top-0 w-64 h-64 bg-accent-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-50 text-accent-600 border border-accent-300 text-xs font-semibold mb-2">
              <Sparkles className="h-3.5 w-3.5 text-accent-400" />
              Tahun Ajaran 2026/2027 • Semester Ganjil
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Ahlan wa Sahlan, Wali Santri
            </h1>
            <p className="text-xs sm:text-sm text-neutral-200 mt-1 max-w-xl">
              Memantau perkembangan belajar, akhlak, dan administrasi ananda{" "}
              <span className="font-semibold text-accent-300">{currentChild.nama_lengkap}</span>{" "}
              (Kelas {currentChild.kelas?.nama}).
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Always full mode in portal ortu per design-system §5 */}
            <BadgeStatus variant={currentChild.status as any} mode="full" />
          </div>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Nilai Rata-rata */}
        <div className="bg-neutral-0 rounded-xl p-5 border border-neutral-200 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-600">Rata-rata nilai UTS</span>
              <div className="p-2 rounded-lg bg-accent-50 text-accent-600">
                <Award className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-neutral-900">{averageGrade}</span>
              <span className="text-xs font-semibold text-accent-600 bg-accent-50 px-2 py-0.5 rounded border border-accent-300">
                Predikat A (Sangat Baik)
              </span>
            </div>
            <p className="text-2xs text-neutral-500 mt-2">
              Berdasarkan {grades.length} mata pelajaran ujian tengah semester.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-neutral-200">
            <Link
              href="/portal-ortu/nilai"
              className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1"
            >
              Lihat rapor lengkap
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Kehadiran */}
        <div className="bg-neutral-0 rounded-xl p-5 border border-neutral-200 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-600">Presensi santri</span>
              <div className="p-2 rounded-lg bg-primary-50 text-primary-600">
                <CalendarCheck className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-primary-600">100%</span>
              <span className="text-xs font-semibold text-primary-700 bg-primary-50 px-2 py-0.5 rounded border border-primary-200">
                Hadir konsisten
              </span>
            </div>
            <p className="text-2xs text-neutral-500 mt-2">
              Tidak ada catatan alpa atau terlambat pada bulan September.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-neutral-200">
            <Link
              href="/portal-ortu/absensi"
              className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1"
            >
              Cek riwayat kehadiran
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Tagihan SPP */}
        <div className="bg-neutral-0 rounded-xl p-5 border border-neutral-200 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-600">Tagihan SPP bulan ini</span>
              <div className="p-2 rounded-lg bg-primary-50 text-primary-600">
                <Receipt className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-extrabold text-neutral-900">
                {latestInvoice ? formatRupiah(latestInvoice.jumlah) : "Rp 0"}
              </span>
              <div className="mt-2">
                {/* Full mode for Lunas in Portal Ortu */}
                <BadgeStatus variant={latestInvoice?.status as any || "paid"} mode="full" />
              </div>
            </div>
            <p className="text-2xs text-neutral-500 mt-2">
              Periode {latestInvoice?.periode || "September 2026"}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-neutral-200">
            <Link
              href="/portal-ortu/tagihan"
              className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1"
            >
              Rincian pembayaran & kwitansi
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Nilai Akademik Terkini & Info Pesantren */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card Nilai */}
        <div className="bg-neutral-0 rounded-xl p-5 border border-neutral-200 shadow-card">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-4">
            <h2 className="text-sm font-semibold text-neutral-900">Nilai mata pelajaran terbaru</h2>
            <Link
              href="/portal-ortu/nilai"
              className="text-xs font-medium text-primary-600 hover:underline"
            >
              Lihat semua
            </Link>
          </div>
          <div className="divide-y divide-neutral-200">
            {grades.slice(0, 4).map((g) => (
              <div key={g.id} className="py-2.5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-neutral-900">{g.mata_pelajaran?.nama}</p>
                  <p className="text-2xs text-neutral-500">{g.jenis_nilai} • Semester {g.semester}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-neutral-900">{g.nilai}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-2xs font-semibold ${
                      g.nilai >= 90
                        ? "bg-accent-50 text-accent-600 border border-accent-300"
                        : "bg-primary-50 text-primary-700 border border-primary-200"
                    }`}
                  >
                    {g.nilai >= 90 ? "A" : "B"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pengumuman Pondok */}
        <div className="bg-neutral-0 rounded-xl p-5 border border-neutral-200 shadow-card">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200 mb-4">
            <h2 className="text-sm font-semibold text-neutral-900">Agenda & pengumuman pondok</h2>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-neutral-25 border border-neutral-200">
              <span className="px-2 py-0.5 rounded bg-info-bg text-info-text border border-info-border text-2xs font-semibold">
                Kunjungan Wali
              </span>
              <p className="text-xs font-semibold text-neutral-900 mt-1">
                Jadwal Kunjungan Wali Santri Bulan Depan
              </p>
              <p className="text-2xs text-neutral-600 mt-0.5">
                Kunjungan dibuka pada hari Ahad, 4 Oktober 2026 mulai pukul 08.00 s.d 16.00 WIB.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-neutral-25 border border-neutral-200">
              <span className="px-2 py-0.5 rounded bg-accent-50 text-accent-600 border border-accent-300 text-2xs font-semibold">
                Prestasi Tahfidz
              </span>
              <p className="text-xs font-semibold text-neutral-900 mt-1">
                Ujian Tasmi Al-Qur&apos;an Juz 30
              </p>
              <p className="text-2xs text-neutral-600 mt-0.5">
                Alhamdulillah ananda Ahmad Fauzi telah menyelesaikan setoran hafalan Juz 30 dengan predikat Mumtaz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
