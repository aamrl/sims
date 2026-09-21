"use client";

import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  Users,
  ClipboardList,
  CalendarCheck,
  ShieldAlert,
  BookOpen,
  Wallet,
  Receipt,
  PiggyBank,
  UserCog,
  Clock,
  CalendarOff,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  ExternalLink,
} from "lucide-react";

export default function RootNavigationHub() {
  return (
    <div className="min-h-screen bg-neutral-25 text-neutral-900 flex flex-col">
      {/* Header Hub */}
      <header className="bg-primary-900 text-white border-b border-accent-300/30 py-6 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-accent-400 flex items-center justify-center text-neutral-900 shadow-md">
              <GraduationCap className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">SIMS Pesantren Terpadu</h1>
              <p className="text-xs text-accent-300">Pusat Navigasi Langsung (Preview Bebas Tanpa Login)</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-neutral-0/10 hover:bg-neutral-0/20 text-white border border-white/20 transition"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Lihat Halaman Login
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-accent-400 hover:bg-accent-300 text-neutral-900 transition shadow-sm font-bold"
            >
              Masuk ke Shell Staf
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Grid Navigation */}
      <main className="max-w-6xl mx-auto w-full px-6 py-8 flex-1 space-y-8">
        {/* Banner Quick Switch */}
        <div className="bg-primary-50 border border-primary-200 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="px-2 py-0.5 rounded text-2xs font-bold uppercase tracking-wider bg-primary-600 text-white">
              Mode Evaluasi & Preview
            </span>
            <h2 className="text-base font-bold text-neutral-900 mt-1.5">
              Jelajahi Semua Halaman Secara Langsung
            </h2>
            <p className="text-xs text-neutral-600 mt-0.5">
              Klik salah satu tautan di bawah ini untuk menguji layout, data mock, dan sistem warna
              sesuai spesifikasi.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="px-3.5 py-2 text-xs font-bold rounded-lg bg-primary-600 text-white hover:bg-primary-700 shadow-sm"
            >
              Dashboard Staf
            </Link>
            <Link
              href="/portal-ortu/dashboard"
              className="px-3.5 py-2 text-xs font-bold rounded-lg bg-accent-50 text-accent-600 border border-accent-300 hover:bg-accent-50/80"
            >
              Portal Wali Santri
            </Link>
          </div>
        </div>

        {/* Section 1: Shell Staf (Akademik & Operasional) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
            <ShieldCheck className="h-5 w-5 text-primary-600" />
            <h3 className="text-sm font-bold text-neutral-900">
              1. Shell Staf — Modul Akademik & Kesiswaan
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/dashboard"
              className="bg-neutral-0 p-4 rounded-xl border border-neutral-200 shadow-card hover:border-primary-600 hover:shadow-card-hover transition group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-900 group-hover:text-primary-600 flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary-600" />
                  Dashboard Utama
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-neutral-400 group-hover:text-primary-600" />
              </div>
              <p className="text-2xs text-neutral-500 mt-2">
                Ringkasan KPI santri, PPDB, kehadiran harian, dan penerimaan SPP.
              </p>
            </Link>

            <Link
              href="/siswa"
              className="bg-neutral-0 p-4 rounded-xl border border-neutral-200 shadow-card hover:border-primary-600 hover:shadow-card-hover transition group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-900 group-hover:text-primary-600 flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary-600" />
                  Data Pokok Santri
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-neutral-400 group-hover:text-primary-600" />
              </div>
              <p className="text-2xs text-neutral-500 mt-2">
                Tabel santri lengkap, filter kelas, status badge senyap & full.
              </p>
            </Link>

            <Link
              href="/siswa/stu-1"
              className="bg-neutral-0 p-4 rounded-xl border border-neutral-200 shadow-card hover:border-primary-600 hover:shadow-card-hover transition group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-900 group-hover:text-primary-600 flex items-center gap-2">
                  <Users className="h-4 w-4 text-accent-600" />
                  Detail Profil Santri (Ahmad Fauzi)
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-neutral-400 group-hover:text-primary-600" />
              </div>
              <p className="text-2xs text-neutral-500 mt-2">
                Biodata, rekap nilai UTS, presensi, kedisiplinan, dan tagihan SPP.
              </p>
            </Link>

            <Link
              href="/ppdb"
              className="bg-neutral-0 p-4 rounded-xl border border-neutral-200 shadow-card hover:border-primary-600 hover:shadow-card-hover transition group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-900 group-hover:text-primary-600 flex items-center gap-2">
                  <ClipboardList className="h-4 w-4 text-primary-600" />
                  Penerimaan Santri Baru (PPDB)
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-neutral-400 group-hover:text-primary-600" />
              </div>
              <p className="text-2xs text-neutral-500 mt-2">
                Daftar pendaftar, status seleksi (terkirim, terpilih, diterima).
              </p>
            </Link>

            <Link
              href="/ppdb/ppdb-1"
              className="bg-neutral-0 p-4 rounded-xl border border-neutral-200 shadow-card hover:border-primary-600 hover:shadow-card-hover transition group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-900 group-hover:text-primary-600 flex items-center gap-2">
                  <ClipboardList className="h-4 w-4 text-accent-600" />
                  Verifikasi Berkas PPDB
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-neutral-400 group-hover:text-primary-600" />
              </div>
              <p className="text-2xs text-neutral-500 mt-2">
                Verifikasi dokumen akta/KK/ijazah, skor tes, dan tombol terima santri.
              </p>
            </Link>

            <Link
              href="/absensi"
              className="bg-neutral-0 p-4 rounded-xl border border-neutral-200 shadow-card hover:border-primary-600 hover:shadow-card-hover transition group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-900 group-hover:text-primary-600 flex items-center gap-2">
                  <CalendarCheck className="h-4 w-4 text-primary-600" />
                  Presensi Harian Santri
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-neutral-400 group-hover:text-primary-600" />
              </div>
              <p className="text-2xs text-neutral-500 mt-2">
                Input kehadiran per kelas, rekap otomatis hadir, sakit, izin, alpa.
              </p>
            </Link>

            <Link
              href="/kedisiplinan"
              className="bg-neutral-0 p-4 rounded-xl border border-neutral-200 shadow-card hover:border-primary-600 hover:shadow-card-hover transition group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-900 group-hover:text-primary-600 flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-warning-fill" />
                  Catatan Kedisiplinan
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-neutral-400 group-hover:text-primary-600" />
              </div>
              <p className="text-2xs text-neutral-500 mt-2">
                Pencatatan pelanggaran, akumulasi poin, panduan tingkatan sanksi.
              </p>
            </Link>

            <Link
              href="/nilai"
              className="bg-neutral-0 p-4 rounded-xl border border-neutral-200 shadow-card hover:border-primary-600 hover:shadow-card-hover transition group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-900 group-hover:text-primary-600 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary-600" />
                  Nilai Akademik & Rapor
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-neutral-400 group-hover:text-primary-600" />
              </div>
              <p className="text-2xs text-neutral-500 mt-2">
                Input nilai per mapel, predikat emas/hijau, ekspor rekap.
              </p>
            </Link>
          </div>
        </div>

        {/* Section 2: Keuangan & HRIS */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
            <Wallet className="h-5 w-5 text-primary-600" />
            <h3 className="text-sm font-bold text-neutral-900">
              2. Shell Staf — Keuangan & HRIS Kepegawaian
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/keuangan/tagihan"
              className="bg-neutral-0 p-4 rounded-xl border border-neutral-200 shadow-card hover:border-primary-600 hover:shadow-card-hover transition group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-900 group-hover:text-primary-600 flex items-center gap-2">
                  <Receipt className="h-4 w-4 text-primary-600" />
                  Tagihan & Piutang SPP
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-neutral-400 group-hover:text-primary-600" />
              </div>
              <p className="text-2xs text-neutral-500 mt-2">
                Status lunas, belum bayar, jatuh tempo, dan generate tagihan.
              </p>
            </Link>

            <Link
              href="/keuangan/payroll"
              className="bg-neutral-0 p-4 rounded-xl border border-neutral-200 shadow-card hover:border-primary-600 hover:shadow-card-hover transition group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-900 group-hover:text-primary-600 flex items-center gap-2">
                  <Receipt className="h-4 w-4 text-primary-600" />
                  Payroll & Penggajian Guru
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-neutral-400 group-hover:text-primary-600" />
              </div>
              <p className="text-2xs text-neutral-500 mt-2">
                Kalkulasi gaji pokok, tunjangan, potongan BPJS, cetak slip gaji.
              </p>
            </Link>

            <Link
              href="/keuangan/bos"
              className="bg-neutral-0 p-4 rounded-xl border border-neutral-200 shadow-card hover:border-primary-600 hover:shadow-card-hover transition group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-900 group-hover:text-primary-600 flex items-center gap-2">
                  <PiggyBank className="h-4 w-4 text-accent-600" />
                  Pengelolaan Dana BOS
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-neutral-400 group-hover:text-primary-600" />
              </div>
              <p className="text-2xs text-neutral-500 mt-2">
                Pencatatan dana masuk APBN, rincian alokasi serapan kas, LPJ.
              </p>
            </Link>

            <Link
              href="/hris/pegawai"
              className="bg-neutral-0 p-4 rounded-xl border border-neutral-200 shadow-card hover:border-primary-600 hover:shadow-card-hover transition group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-900 group-hover:text-primary-600 flex items-center gap-2">
                  <UserCog className="h-4 w-4 text-primary-600" />
                  Data Guru & Pegawai
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-neutral-400 group-hover:text-primary-600" />
              </div>
              <p className="text-2xs text-neutral-500 mt-2">
                Data NIP, jabatan struktural, status tetap vs honorer.
              </p>
            </Link>

            <Link
              href="/hris/kehadiran"
              className="bg-neutral-0 p-4 rounded-xl border border-neutral-200 shadow-card hover:border-primary-600 hover:shadow-card-hover transition group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-900 group-hover:text-primary-600 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary-600" />
                  Presensi Jam Kerja Pegawai
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-neutral-400 group-hover:text-primary-600" />
              </div>
              <p className="text-2xs text-neutral-500 mt-2">
                Jam datang, jam pulang, dan sinkronisasi mesin presensi.
              </p>
            </Link>

            <Link
              href="/hris/cuti"
              className="bg-neutral-0 p-4 rounded-xl border border-neutral-200 shadow-card hover:border-primary-600 hover:shadow-card-hover transition group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-900 group-hover:text-primary-600 flex items-center gap-2">
                  <CalendarOff className="h-4 w-4 text-warning-fill" />
                  Pengajuan Cuti & Izin
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-neutral-400 group-hover:text-primary-600" />
              </div>
              <p className="text-2xs text-neutral-500 mt-2">
                Otorisasi persetujuan / penolakan cuti tahunan dan izin sakit.
              </p>
            </Link>
          </div>
        </div>

        {/* Section 3: Portal Orang Tua */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
            <UserCheck className="h-5 w-5 text-accent-600" />
            <h3 className="text-sm font-bold text-neutral-900">
              3. Portal Khusus Wali Santri (Antarmuka Orang Tua)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/portal-ortu/dashboard"
              className="bg-neutral-0 p-4 rounded-xl border border-accent-300 shadow-card hover:bg-accent-50/40 transition group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-900 group-hover:text-accent-600">
                  Dashboard Wali
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-accent-400" />
              </div>
              <p className="text-2xs text-neutral-500 mt-2">
                Ringkasan capaian ananda, presensi 100%, dan status SPP.
              </p>
            </Link>

            <Link
              href="/portal-ortu/nilai"
              className="bg-neutral-0 p-4 rounded-xl border border-accent-300 shadow-card hover:bg-accent-50/40 transition group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-900 group-hover:text-accent-600">
                  Rapor & Hasil Belajar
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-accent-400" />
              </div>
              <p className="text-2xs text-neutral-500 mt-2">
                Daftar nilai evaluasi, catatan wali kelas, tombol unduh PDF.
              </p>
            </Link>

            <Link
              href="/portal-ortu/absensi"
              className="bg-neutral-0 p-4 rounded-xl border border-accent-300 shadow-card hover:bg-accent-50/40 transition group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-900 group-hover:text-accent-600">
                  Riwayat Presensi
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-accent-400" />
              </div>
              <p className="text-2xs text-neutral-500 mt-2">
                Log kehadiran harian santri di lingkungan pesantren.
              </p>
            </Link>

            <Link
              href="/portal-ortu/tagihan"
              className="bg-neutral-0 p-4 rounded-xl border border-accent-300 shadow-card hover:bg-accent-50/40 transition group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-900 group-hover:text-accent-600">
                  Tagihan & Bayar SPP
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-accent-400" />
              </div>
              <p className="text-2xs text-neutral-500 mt-2">
                Rincian katering/asrama, simulator VA BSI, dan kwitansi.
              </p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
