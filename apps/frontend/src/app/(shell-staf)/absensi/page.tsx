"use client";

import React, { useState } from "react";
import { Calendar, Filter, Save, CheckCircle2, AlertTriangle, Info, XCircle } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { BadgeStatus } from "@/components/badge-status/badge-status";
import { mockClasses, mockStudents, mockAttendances } from "@/lib/mock-data";
import { AttendanceStatus } from "@/types/entities";

export default function AbsensiPage() {
  const [selectedClass, setSelectedClass] = useState("cls-1");
  const [selectedDate, setSelectedDate] = useState("2026-09-21");

  // Filter students by selected class
  const classStudents = mockStudents.filter((s) => s.id_kelas === selectedClass && s.status === "aktif");

  // In-memory status map for live updates
  const [attendanceMap, setAttendanceMap] = useState<Record<string, AttendanceStatus>>(() => {
    const initial: Record<string, AttendanceStatus> = {};
    mockAttendances.forEach((att) => {
      initial[att.id_siswa] = att.status;
    });
    return initial;
  });

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendanceMap((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleMarkAllHadir = () => {
    const next = { ...attendanceMap };
    classStudents.forEach((s) => {
      next[s.id] = "hadir";
    });
    setAttendanceMap(next);
  };

  // Stats
  const hadirCount = classStudents.filter((s) => (attendanceMap[s.id] || "hadir") === "hadir").length;
  const sakitCount = classStudents.filter((s) => attendanceMap[s.id] === "sakit").length;
  const izinCount = classStudents.filter((s) => attendanceMap[s.id] === "izin").length;
  const alpaCount = classStudents.filter((s) => attendanceMap[s.id] === "alpa").length;

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Presensi & kehadiran" }]} />

      <Header
        title="Presensi Harian Santri"
        subtitle="Pencatatan absensi harian kelas dan rekapitulasi kehadiran santri"
      />

      {/* Class Selector & Date Toolbar */}
      <div className="bg-neutral-0 p-4 rounded-lg border border-neutral-200 shadow-card flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-neutral-600">
            <Filter className="h-3.5 w-3.5 text-neutral-500" />
            <span className="font-semibold">Kelas:</span>
          </div>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="text-xs py-1.5 px-3 border border-neutral-450 rounded bg-neutral-0 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {mockClasses.map((cls) => (
              <option key={cls.id} value={cls.id}>
                Kelas {cls.nama} (Tingkat {cls.tingkat_kelas})
              </option>
            ))}
          </select>

          <div className="flex items-center gap-1.5 text-xs text-neutral-600 ml-2">
            <Calendar className="h-3.5 w-3.5 text-neutral-500" />
            <span className="font-semibold">Tanggal:</span>
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="text-xs py-1.5 px-3 border border-neutral-450 rounded bg-neutral-0 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
          </input>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleMarkAllHadir}
            className="px-3 py-1.5 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 rounded transition"
          >
            Tandai semua hadir
          </button>
          <button
            type="button"
            onClick={() => alert("Presensi berhasil disimpan ke database")}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded transition shadow-sm"
          >
            <Save className="h-3.5 w-3.5" />
            Simpan presensi
          </button>
        </div>
      </div>

      {/* Quick Attendance Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-neutral-0 rounded-lg border border-neutral-200 flex items-center justify-between">
          <div>
            <p className="text-2xs text-neutral-500 font-semibold">Hadir</p>
            <p className="text-lg font-bold text-primary-600">{hadirCount}</p>
          </div>
          <CheckCircle2 className="h-5 w-5 text-primary-600" />
        </div>
        <div className="p-3 bg-neutral-0 rounded-lg border border-neutral-200 flex items-center justify-between">
          <div>
            <p className="text-2xs text-neutral-500 font-semibold">Sakit (perlu perhatian)</p>
            <p className="text-lg font-bold text-[#C1560F]">{sakitCount}</p>
          </div>
          <AlertTriangle className="h-5 w-5 text-[#C1560F]" />
        </div>
        <div className="p-3 bg-neutral-0 rounded-lg border border-neutral-200 flex items-center justify-between">
          <div>
            <p className="text-2xs text-neutral-500 font-semibold">Izin terverifikasi</p>
            <p className="text-lg font-bold text-[#2B6CA3]">{izinCount}</p>
          </div>
          <Info className="h-5 w-5 text-[#2B6CA3]" />
        </div>
        <div className="p-3 bg-neutral-0 rounded-lg border border-neutral-200 flex items-center justify-between">
          <div>
            <p className="text-2xs text-neutral-500 font-semibold">Alpa / tanpa keterangan</p>
            <p className="text-lg font-bold text-[#B3261E]">{alpaCount}</p>
          </div>
          <XCircle className="h-5 w-5 text-[#B3261E]" />
        </div>
      </div>

      {/* Attendance Roster Table */}
      <div className="bg-neutral-0 rounded-lg border border-neutral-200 shadow-card overflow-hidden">
        <table className="w-full text-left text-sm text-neutral-900">
          <thead>
            <tr className="border-b border-neutral-300 bg-neutral-25 text-xs font-semibold text-neutral-600">
              <th className="px-4 py-3 w-12 text-center">No</th>
              <th className="px-4 py-3">Nama santri</th>
              <th className="px-4 py-3">NISN</th>
              <th className="px-4 py-3 text-center">Status saat ini</th>
              <th className="px-4 py-3 text-right">Tandai kehadiran</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {classStudents.map((student, idx) => {
              const current = attendanceMap[student.id] || "hadir";
              return (
                <tr key={student.id} className="hover:bg-neutral-100">
                  <td className="px-4 py-3 text-center text-xs text-neutral-500">{idx + 1}</td>
                  <td className="px-4 py-3 font-medium text-neutral-900">{student.nama_lengkap}</td>
                  <td className="px-4 py-3 font-mono text-xs text-neutral-600">{student.nisn}</td>
                  <td className="px-4 py-3 text-center">
                    {/* Silent mode for 'hadir', full for others */}
                    <BadgeStatus variant={current as any} mode={current === "hadir" ? "silent" : "full"} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex rounded-md border border-neutral-200 p-0.5 bg-neutral-100">
                      {(["hadir", "sakit", "izin", "alpa"] as AttendanceStatus[]).map((statusKey) => (
                        <button
                          key={statusKey}
                          type="button"
                          onClick={() => handleStatusChange(student.id, statusKey)}
                          className={`px-2.5 py-1 text-2xs font-semibold rounded capitalize transition ${
                            current === statusKey
                              ? statusKey === "hadir"
                                ? "bg-primary-600 text-white shadow-sm"
                                : statusKey === "sakit"
                                ? "bg-warning-fill text-white shadow-sm"
                                : statusKey === "izin"
                                ? "bg-info-fill text-white shadow-sm"
                                : "bg-danger-fill text-white shadow-sm"
                              : "text-neutral-600 hover:text-neutral-900"
                          }`}
                        >
                          {statusKey}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
