"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import {
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowLeft,
  UserCheck,
  ShieldCheck,
  Award,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { BadgeStatus } from "@/components/badge-status/badge-status";
import { mockPpdbApplicants } from "@/lib/mock-data";

export default function PpdbApplicantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const applicant = mockPpdbApplicants.find((p) => p.id === id);

  const [currentStatus, setCurrentStatus] = useState<string>(applicant?.status || "submitted");
  const [testScore, setTestScore] = useState<number>(
    applicant?.hasil_seleksi?.nilai || 85.5
  );

  if (!applicant) {
    return (
      <div className="space-y-4">
        <Breadcrumb
          items={[{ label: "PPDB online", href: "/ppdb" }, { label: "Pendaftar tidak ditemukan" }]}
        />
        <div className="bg-neutral-0 p-8 rounded-lg border border-neutral-200 text-center">
          <p className="text-neutral-600">Pendaftar tidak ditemukan.</p>
          <Link
            href="/ppdb"
            className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-primary-600 hover:text-primary-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke daftar PPDB
          </Link>
        </div>
      </div>
    );
  }

  const handleUpdateStatus = (newStatus: string) => {
    setCurrentStatus(newStatus);
    alert(`Status pendaftar diubah menjadi: ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { label: "PPDB online", href: "/ppdb" },
          { label: applicant.nomor_pendaftaran },
        ]}
      />

      {/* Header Profile */}
      <div className="bg-neutral-0 p-6 rounded-lg border border-neutral-200 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-neutral-900">{applicant.nama_lengkap}</h1>
            <BadgeStatus variant={currentStatus as any} mode="full" />
          </div>
          <p className="text-xs text-neutral-600 mt-1">
            Nomor registrasi: <span className="font-mono font-semibold text-primary-600">{applicant.nomor_pendaftaran}</span> • Terdaftar sejak {applicant.dibuat_pada}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/ppdb"
            className="px-3 py-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 border border-neutral-200 hover:bg-neutral-100 rounded transition"
          >
            Kembali
          </Link>
          {currentStatus === "submitted" && (
            <button
              type="button"
              onClick={() => handleUpdateStatus("verified")}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded transition"
            >
              Verifikasi berkas
            </button>
          )}
          {currentStatus === "verified" && (
            <button
              type="button"
              onClick={() => handleUpdateStatus("selected")}
              className="px-3 py-1.5 text-xs font-semibold text-neutral-900 bg-accent-400 hover:bg-accent-300 rounded transition"
            >
              Lolos seleksi
            </button>
          )}
          {currentStatus === "selected" && (
            <button
              type="button"
              onClick={() => handleUpdateStatus("accepted")}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded transition"
            >
              Terima santri
            </button>
          )}
          {currentStatus !== "rejected" && (
            <button
              type="button"
              onClick={() => handleUpdateStatus("rejected")}
              className="px-3 py-1.5 text-xs font-semibold text-danger-text hover:bg-danger-bg border border-danger-border rounded transition"
            >
              Tolak berkas
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Data Diri */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-neutral-0 p-5 rounded-lg border border-neutral-200 shadow-card">
            <h2 className="text-sm font-semibold text-neutral-900 pb-3 mb-4 border-b border-neutral-200">
              Data pendaftar
            </h2>
            <dl className="space-y-3 text-xs">
              <div>
                <dt className="text-neutral-500">NIK</dt>
                <dd className="font-mono font-medium text-neutral-900 mt-0.5">{applicant.nik}</dd>
              </div>
              <div>
                <dt className="text-neutral-500">Tanggal lahir</dt>
                <dd className="font-medium text-neutral-900 mt-0.5">{applicant.tanggal_lahir}</dd>
              </div>
              <div>
                <dt className="text-neutral-500">Nama wali / orang tua</dt>
                <dd className="font-medium text-neutral-900 mt-0.5">{applicant.nama_orang_tua}</dd>
              </div>
              <div>
                <dt className="text-neutral-500">Nomor WhatsApp / telepon</dt>
                <dd className="font-mono font-medium text-neutral-900 mt-0.5">
                  {applicant.kontak_orang_tua}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Right Column: Dokumen & Hasil Ujian */}
        <div className="lg:col-span-2 space-y-6">
          {/* Dokumen Pendaftar */}
          <div className="bg-neutral-0 p-5 rounded-lg border border-neutral-200 shadow-card">
            <h2 className="text-sm font-semibold text-neutral-900 pb-3 mb-4 border-b border-neutral-200">
              Kelengkapan berkas fisik & digital
            </h2>
            <div className="space-y-3">
              {[
                { name: "Akta Kelahiran", valid: true },
                { name: "Kartu Keluarga (KK)", valid: true },
                { name: "Ijazah SD / Surat Keterangan Lulus", valid: currentStatus !== "submitted" },
                { name: "Pas Foto 3x4 Santri", valid: true },
              ].map((doc, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded border border-neutral-200 flex items-center justify-between bg-neutral-25"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="h-4 w-4 text-neutral-500" />
                    <span className="text-xs font-medium text-neutral-900">{doc.name}</span>
                  </div>
                  {doc.valid ? (
                    <span className="inline-flex items-center gap-1 text-2xs font-semibold text-primary-700 bg-primary-50 px-2 py-0.5 rounded border border-primary-200">
                      <CheckCircle2 className="h-3 w-3" />
                      Valid & terverifikasi
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-2xs font-semibold text-warning-text bg-warning-bg px-2 py-0.5 rounded border border-warning-border">
                      <Clock className="h-3 w-3" />
                      Menunggu verifikasi
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Hasil Seleksi */}
          <div className="bg-neutral-0 p-5 rounded-lg border border-neutral-200 shadow-card">
            <h2 className="text-sm font-semibold text-neutral-900 pb-3 mb-4 border-b border-neutral-200 flex items-center gap-2">
              <Award className="h-4 w-4 text-accent-600" />
              Nilai tes seleksi & wawancara
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-medium text-neutral-600 mb-1">
                  Skor tes terpadu (0 - 100)
                </label>
                <input
                  type="number"
                  value={testScore}
                  onChange={(e) => setTestScore(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm border border-neutral-450 rounded bg-neutral-0 text-neutral-900 focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block font-medium text-neutral-600 mb-1">
                  Rekomendasi tim penguji
                </label>
                <p className="text-xs text-neutral-700 pt-2 font-medium">
                  {testScore >= 75 ? "Memenuhi syarat penerimaan" : "Perlu bimbingan matrikulasi"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
