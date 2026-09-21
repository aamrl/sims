"use client";

import React, { useState } from "react";
import { Receipt, CheckCircle2, Download, CreditCard, ShieldCheck, ArrowRight } from "lucide-react";
import { BadgeStatus } from "@/components/badge-status/badge-status";
import { formatRupiah } from "@/lib/utils";
import { mockStudents, mockInvoices } from "@/lib/mock-data";

export default function PortalOrtuTagihanPage() {
  const currentChild = mockStudents[0]; // Ahmad Fauzi
  const invoices = mockInvoices.filter((i) => i.id_referensi_siswa === currentChild.id);

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="bg-neutral-0 p-5 rounded-xl border border-neutral-200 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-neutral-900">Tagihan & Pembayaran SPP</h1>
          <p className="text-xs text-neutral-600 mt-0.5">
            Santri: <span className="font-semibold text-neutral-900">{currentChild.nama_lengkap}</span> • NISN: {currentChild.nisn}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowPaymentModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition shadow-sm"
        >
          <CreditCard className="h-4 w-4" />
          Bayar tagihan sekarang
        </button>
      </div>

      {/* Invoices List */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-neutral-900">Daftar Tagihan Bulanan</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {invoices.map((inv) => (
            <div
              key={inv.id}
              className="bg-neutral-0 rounded-xl p-5 border border-neutral-200 shadow-card flex flex-col justify-between space-y-4 hover:border-primary-500/50 transition"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-neutral-500">
                    INVOICE-{inv.periode}
                  </span>
                  {/* Full mode for parents */}
                  <BadgeStatus variant={inv.status as any} mode="full" />
                </div>
                <div className="mt-3">
                  <p className="text-sm font-bold text-neutral-900">
                    Iuran Bulanan SPP Pesantren
                  </p>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    Periode: {inv.periode} • Jatuh tempo: {inv.tanggal_jatuh_tempo}
                  </p>
                </div>
                <div className="mt-3 text-xl font-extrabold text-neutral-900 font-mono">
                  {formatRupiah(inv.jumlah)}
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-200 flex items-center justify-between">
                <span className="text-2xs text-neutral-500">
                  {inv.status === "paid" ? "Sudah dibayar via Virtual Account BSI" : "Menunggu pembayaran"}
                </span>
                <button
                  type="button"
                  onClick={() => alert(`Mengunduh bukti pembayaran / invoice ${inv.periode}`)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700"
                >
                  <Download className="h-3.5 w-3.5" />
                  Kwitansi
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rincian Komponen Biaya */}
      <div className="bg-neutral-0 p-5 rounded-xl border border-neutral-200 shadow-card">
        <h2 className="text-sm font-semibold text-neutral-900 mb-3">
          Rincian Komponen Pembiayaan Terpadu
        </h2>
        <div className="divide-y divide-neutral-200 text-xs">
          <div className="py-2.5 flex justify-between">
            <span className="text-neutral-700">SPP Pembelajaran & Asatidz</span>
            <span className="font-mono font-semibold text-neutral-900">Rp 250.000</span>
          </div>
          <div className="py-2.5 flex justify-between">
            <span className="text-neutral-700">Katering & Konsumsi Asrama (3x Sehari)</span>
            <span className="font-mono font-semibold text-neutral-900">Rp 200.000</span>
          </div>
          <div className="py-2.5 flex justify-between">
            <span className="text-neutral-700">Laundry & Kebersihan Asrama</span>
            <span className="font-mono font-semibold text-neutral-900">Rp 50.000</span>
          </div>
          <div className="py-2.5 flex justify-between font-bold bg-neutral-25 px-2 rounded">
            <span className="text-neutral-900">Total Tagihan Bulanan</span>
            <span className="font-mono text-primary-600 text-sm">Rp 500.000</span>
          </div>
        </div>
      </div>

      {/* Payment Modal Simulation */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-0 rounded-2xl max-w-md w-full p-6 shadow-xl border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <h3 className="text-base font-bold text-neutral-900">Pembayaran Online SPP</h3>
              <button
                type="button"
                onClick={() => setShowPaymentModal(false)}
                className="text-neutral-500 hover:text-neutral-900 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-3 bg-primary-50 rounded-lg border border-primary-200">
              <p className="text-xs text-primary-700 font-medium">
                Nomor Virtual Account BSI (Bank Syariah Indonesia)
              </p>
              <p className="text-lg font-mono font-bold text-primary-900 mt-1 tracking-wider">
                9928 0071 2345 61
              </p>
              <p className="text-2xs text-primary-600 mt-0.5">Atas nama: Ahmad Fauzi / SIMS Pesantren</p>
            </div>

            <div className="text-xs text-neutral-600 space-y-2">
              <p className="font-semibold text-neutral-900">Petunjuk Pembayaran:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Buka BSI Mobile atau ATM Bank Syariah Indonesia / Bersama.</li>
                <li>Pilih menu Bayar / Pembayaran &gt; Institusi Pendidikan.</li>
                <li>Masukkan kode VA di atas dan verifikasi nominal tagihan.</li>
                <li>Setelah transfer, sistem akan otomatis mencatat status Lunas.</li>
              </ol>
            </div>

            <button
              type="button"
              onClick={() => {
                alert("Simulasi pembayaran berhasil diverifikasi!");
                setShowPaymentModal(false);
              }}
              className="w-full py-2.5 text-xs font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition"
            >
              Simulasikan pelunasan instan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
