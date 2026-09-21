"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  ClipboardList,
  CalendarCheck,
  Wallet,
  ArrowUpRight,
  ShieldAlert,
  Clock,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { BadgeStatus } from "@/components/badge-status/badge-status";
import { formatRupiah } from "@/lib/utils";
import {
  mockStudents,
  mockPpdbApplicants,
  mockAttendances,
  mockInvoices,
  mockDisciplineRecords,
  mockLeaveRequests,
} from "@/lib/mock-data";

export default function DashboardPage() {
  const totalStudents = mockStudents.filter((s) => s.status === "aktif").length;
  const totalPpdb = mockPpdbApplicants.length;
  const hadirToday = mockAttendances.filter((a) => a.status === "hadir").length;
  const attendanceRate = Math.round((hadirToday / mockAttendances.length) * 100);

  const totalPaid = mockInvoices
    .filter((i) => i.status === "paid")
    .reduce((acc, curr) => acc + curr.jumlah, 0);

  const totalOverdue = mockInvoices
    .filter((i) => i.status === "overdue" || i.status === "unpaid")
    .reduce((acc, curr) => acc + curr.jumlah, 0);

  return (
    <div className="space-y-6">
      <Header
        title="Dashboard Utama"
        subtitle="Ringkasan operasional dan aktivitas pesantren terkini"
      />

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Santri */}
        <div className="bg-neutral-0 p-5 rounded-lg border border-neutral-200 shadow-card flex flex-col justify-between hover:shadow-card-hover transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-600">Santri aktif</span>
            <div className="p-2 rounded bg-primary-50 text-primary-600">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-neutral-900">{totalStudents}</span>
            <span className="text-xs text-neutral-500 ml-1.5">santri terdaftar</span>
          </div>
          <div className="mt-2 text-2xs text-primary-600 font-medium flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            <span>Kapasitas asrama 92%</span>
          </div>
        </div>

        {/* Card 2: PPDB */}
        <div className="bg-neutral-0 p-5 rounded-lg border border-neutral-200 shadow-card flex flex-col justify-between hover:shadow-card-hover transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-600">Pendaftar PPDB</span>
            <div className="p-2 rounded bg-accent-50 text-accent-600">
              <ClipboardList className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-accent-600">{totalPpdb}</span>
            <span className="text-xs text-neutral-500 ml-1.5">berkas masuk</span>
          </div>
          <div className="mt-2 text-2xs text-neutral-600">
            Gelombang 1 Tahun Ajaran 2026/2027
          </div>
        </div>

        {/* Card 3: Kehadiran Hari Ini */}
        <div className="bg-neutral-0 p-5 rounded-lg border border-neutral-200 shadow-card flex flex-col justify-between hover:shadow-card-hover transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-600">Kehadiran santri</span>
            <div className="p-2 rounded bg-primary-50 text-primary-600">
              <CalendarCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-neutral-900">{attendanceRate}%</span>
            <span className="text-xs text-neutral-500 ml-1.5">
              ({hadirToday} dari {mockAttendances.length} tercatat)
            </span>
          </div>
          <div className="mt-2 text-2xs text-neutral-600">
            Presensi hari ini aktif
          </div>
        </div>

        {/* Card 4: SPP Terkumpul */}
        <div className="bg-neutral-0 p-5 rounded-lg border border-neutral-200 shadow-card flex flex-col justify-between hover:shadow-card-hover transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-600">Penerimaan SPP</span>
            <div className="p-2 rounded bg-primary-50 text-primary-600">
              <Wallet className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-xl font-bold text-primary-600">
              {formatRupiah(totalPaid)}
            </span>
          </div>
          <div className="mt-2 text-2xs text-danger-text">
            Tunggakan: {formatRupiah(totalOverdue)}
          </div>
        </div>
      </div>

      {/* Grid: Pelanggaran & Pengajuan Cuti */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card Kedisiplinan Terbaru */}
        <div className="bg-neutral-0 rounded-lg border border-neutral-200 shadow-card p-5">
          <div className="flex items-center justify-between mb-4 border-b border-neutral-200 pb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-warning-fill" />
              <h2 className="text-sm font-semibold text-neutral-900">
                Catatan kedisiplinan terbaru
              </h2>
            </div>
            <Link
              href="/kedisiplinan"
              className="text-xs font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1"
            >
              Lihat semua
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="divide-y divide-neutral-200">
            {mockDisciplineRecords.slice(0, 3).map((item) => (
              <div key={item.id} className="py-3 flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-neutral-900">
                    {item.siswa?.nama_lengkap}
                  </p>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    {item.deskripsi_pelanggaran}
                  </p>
                  <p className="text-2xs text-neutral-500 mt-1">
                    Tindak lanjut: {item.tindak_lanjut || "Belum ada"}
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-[#FBEBDD] text-[#7A360A] border border-[#F0C9A8]">
                  +{item.poin} poin
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Card Pengajuan Cuti Pegawai */}
        <div className="bg-neutral-0 rounded-lg border border-neutral-200 shadow-card p-5">
          <div className="flex items-center justify-between mb-4 border-b border-neutral-200 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-info-fill" />
              <h2 className="text-sm font-semibold text-neutral-900">
                Pengajuan izin & cuti pegawai
              </h2>
            </div>
            <Link
              href="/hris/cuti"
              className="text-xs font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1"
            >
              Lihat semua
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="divide-y divide-neutral-200">
            {mockLeaveRequests.slice(0, 3).map((req) => (
              <div key={req.id} className="py-3 flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-neutral-900">
                    {req.pegawai?.nama_lengkap}
                  </p>
                  <p className="text-xs text-neutral-600 mt-0.5">{req.alasan}</p>
                  <p className="text-2xs text-neutral-500 mt-1">
                    {req.tanggal_mulai} s.d {req.tanggal_selesai}
                  </p>
                </div>
                <BadgeStatus variant={req.status as any} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section Data Siswa Terbaru */}
      <div className="bg-neutral-0 rounded-lg border border-neutral-200 shadow-card p-5">
        <div className="flex items-center justify-between mb-4 border-b border-neutral-200 pb-3">
          <h2 className="text-sm font-semibold text-neutral-900">
            Santri terdaftar terbaru
          </h2>
          <Link
            href="/siswa"
            className="text-xs font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1"
          >
            Lihat semua data santri
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-900">
            <thead>
              <tr className="border-b border-neutral-300 text-xs font-semibold text-neutral-600">
                <th className="pb-2">Nama santri</th>
                <th className="pb-2">NISN</th>
                <th className="pb-2">Kelas</th>
                <th className="pb-2">Jenis kelamin</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {mockStudents.slice(0, 5).map((student) => (
                <tr key={student.id} className="hover:bg-neutral-100">
                  <td className="py-3 font-medium text-neutral-900">
                    <Link
                      href={`/siswa/${student.id}`}
                      className="hover:text-primary-600 hover:underline"
                    >
                      {student.nama_lengkap}
                    </Link>
                  </td>
                  <td className="py-3 text-neutral-600">{student.nisn}</td>
                  <td className="py-3 text-neutral-600">{student.kelas?.nama}</td>
                  <td className="py-3 text-neutral-600">
                    {student.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"}
                  </td>
                  <td className="py-3">
                    {/* Silent badge in dense staff table */}
                    <BadgeStatus variant={student.status as any} mode="silent" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
