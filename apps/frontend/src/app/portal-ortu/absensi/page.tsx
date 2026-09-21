"use client";

import React from "react";
import { CalendarCheck, CheckCircle2, AlertTriangle, Info, XCircle } from "lucide-react";
import { BadgeStatus } from "@/components/badge-status/badge-status";
import { mockStudents, mockAttendances } from "@/lib/mock-data";

export default function PortalOrtuAbsensiPage() {
  const currentChild = mockStudents[0]; // Ahmad Fauzi
  const attendances = mockAttendances.filter((a) => a.id_siswa === currentChild.id);

  // Extend mock history for rich display
  const history = [
    { date: "2026-09-21", status: "hadir", note: "Masuk tepat waktu, shalat Subuh berjamaah" },
    { date: "2026-09-20", status: "hadir", note: "Masuk tepat waktu" },
    { date: "2026-09-19", status: "hadir", note: "Kegiatan halaqah tahfidz pagi" },
    { date: "2026-09-18", status: "hadir", note: "Masuk tepat waktu" },
    { date: "2026-09-17", status: "hadir", note: "Masuk tepat waktu" },
    { date: "2026-09-16", status: "izin", note: "Izin pemeriksaan gigi (disetujui)" },
    { date: "2026-09-15", status: "hadir", note: "Masuk tepat waktu" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-neutral-0 p-5 rounded-xl border border-neutral-200 shadow-card">
        <h1 className="text-lg font-bold text-neutral-900">Riwayat Presensi & Kehadiran</h1>
        <p className="text-xs text-neutral-600 mt-0.5">
          Santri: <span className="font-semibold text-neutral-900">{currentChild.nama_lengkap}</span> • Periode September 2026
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-neutral-0 p-4 rounded-xl border border-neutral-200 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-600">Hadir</span>
            <CheckCircle2 className="h-4 w-4 text-primary-600" />
          </div>
          <p className="text-2xl font-bold text-primary-600 mt-2">6 Hari</p>
          <p className="text-2xs text-neutral-500">Tepat waktu</p>
        </div>

        <div className="bg-neutral-0 p-4 rounded-xl border border-neutral-200 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-600">Izin</span>
            <Info className="h-4 w-4 text-info-fill" />
          </div>
          <p className="text-2xl font-bold text-[#1D4C73] mt-2">1 Hari</p>
          <p className="text-2xs text-neutral-500">Disetujui wali kelas</p>
        </div>

        <div className="bg-neutral-0 p-4 rounded-xl border border-neutral-200 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-600">Sakit</span>
            <AlertTriangle className="h-4 w-4 text-warning-fill" />
          </div>
          <p className="text-2xl font-bold text-[#7A360A] mt-2">0 Hari</p>
          <p className="text-2xs text-neutral-500">Sehat & bugar</p>
        </div>

        <div className="bg-neutral-0 p-4 rounded-xl border border-neutral-200 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-600">Alpa</span>
            <XCircle className="h-4 w-4 text-danger-fill" />
          </div>
          <p className="text-2xl font-bold text-[#7A1913] mt-2">0 Hari</p>
          <p className="text-2xs text-neutral-500">Disiplin tinggi</p>
        </div>
      </div>

      {/* Roster Table */}
      <div className="bg-neutral-0 rounded-xl border border-neutral-200 shadow-card overflow-hidden">
        <div className="p-4 bg-neutral-25 border-b border-neutral-200">
          <span className="text-xs font-semibold text-neutral-700">Log Kehadiran Harian</span>
        </div>

        <table className="w-full text-left text-xs text-neutral-900">
          <thead>
            <tr className="border-b border-neutral-300 bg-neutral-25 text-neutral-600 font-semibold">
              <th className="px-4 py-3">Tanggal</th>
              <th className="px-4 py-3">Status kehadiran</th>
              <th className="px-4 py-3">Keterangan / aktivitas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {history.map((row, idx) => (
              <tr key={idx} className="hover:bg-neutral-100">
                <td className="px-4 py-3 font-mono font-medium text-neutral-900">{row.date}</td>
                <td className="px-4 py-3">
                  {/* Full mode for parents */}
                  <BadgeStatus variant={row.status as any} mode="full" />
                </td>
                <td className="px-4 py-3 text-neutral-600">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
