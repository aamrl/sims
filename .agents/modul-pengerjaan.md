# MODUL-PENGERJAAN.md — Breakdown Pengerjaan Backend SIMS per Modul

> Dokumen ini memecah kebutuhan fungsional PRD (§7) menjadi checklist kerja per modul/service.
> Urutan modul mengikuti fase di `workflow.md` §1. Jangan mulai modul baru sebelum dependency-nya minimal bisa diakses (lihat kolom **Dependency**).
> Centang `[x]` setelah task lolos checklist review `workflow.md` §2 Step 5 — bukan sekadar "kode sudah ditulis".

**Legend Prioritas**: **M** = Must have · **S** = Should have · **C** = Could have
**Legend Status**: `[ ]` Belum mulai · `[~]` Sedang dikerjakan · `[x]` Selesai (lolos self-review) · `[!]` Blocked/perlu konfirmasi

---

## Modul 1 — Auth Service *(Fase 1)*

**Dependency**: Tidak ada — modul dasar, harus selesai duluan (semua modul lain butuh token & RBAC dari sini).

**Tabel database (draft)**: `users`, `roles`, `permissions`, `refresh_tokens`, `login_audit_logs`

**Checklist:**
- [ ] (M) FR-AUTH-01 — Login dengan email/username + password
- [ ] (M) FR-AUTH-02 — RBAC middleware (role: Admin, Guru, Keuangan, HRIS, Ortu, Siswa)
- [ ] (M) FR-AUTH-03 — Penerbitan & refresh JWT token
- [ ] (M) FR-AUTH-04 — Reset password via email
- [ ] (S) FR-AUTH-05 — Audit log aktivitas login (siapa, kapan, dari mana)
- [ ] Infra pendukung: skeleton API Gateway, `docker-compose.yml` dasar, CI/CD skeleton

**Output yang harus bisa dites manual**: endpoint login → dapat access+refresh token; endpoint yang di-protect RBAC menolak role yang salah.

---

## Modul 2 — Akademik Service *(Fase 2)*

**Dependency**: Auth Service (butuh token valid + RBAC untuk semua endpoint).

### 2a. Data Induk, Nilai, Absensi, Kedisiplinan
**Tabel database (draft)**: `students`, `grades`, `attendances`, `discipline_records`

- [ ] (M) FR-AKD-01 — CRUD data induk siswa (biodata, NISN, NIK, dll)
- [ ] (M) FR-AKD-02 — Input & lihat riwayat nilai per semester
- [ ] (M) FR-AKD-03 — Absensi harian per kelas, rekap otomatis
- [ ] (M) FR-AKD-04 — Pencatatan kedisiplinan (pelanggaran, poin, tindak lanjut)

### 2b. Alur PPDB (sub-modul terpisah karena multi-step)
**Tabel database (draft)**: `ppdb_applicants`, `ppdb_documents`, `ppdb_selection_results`

- [ ] (M) FR-AKD-05.1 — Form pendaftaran online
- [ ] (M) FR-AKD-05.2 — Upload dokumen pendaftar
- [ ] (M) FR-AKD-05.3 — Verifikasi dokumen oleh admin
- [ ] (M) FR-AKD-05.4 — Proses seleksi
- [ ] (M) FR-AKD-05.5 — Pengumuman hasil
- [ ] (M) FR-AKD-05.6 — Jika diterima: publish event agar Auth Service buat akun siswa baru (lihat PRD §11 Alur PPDB)

### 2c. Integrasi Dapodik
- [!] (S) FR-AKD-06 — Ekspor data ke format Dapodik — **BLOCKED, perlu konfirmasi** (PRD §10). Jangan implementasi sebelum dikonfirmasi user.

**Event yang di-produce**: `student.account.requested` → dikonsumsi Auth Service
**Event yang di-consume** (baru aktif setelah Modul 3 jalan): `spp.lunas` dari Keuangan Service → update status siswa

**Output yang harus bisa dites manual**: satu siklus PPDB penuh dari daftar → diterima → akun siswa otomatis muncul di Auth Service.

---

## Modul 3 — Keuangan Service *(Fase 3)*

**Dependency**: Akademik Service (butuh data siswa untuk generate tagihan per siswa).

**Tabel database (draft)**: `invoices`, `payments`, `bos_funds`, `payrolls`

- [ ] (M) FR-KEU-01 — Generate tagihan SPP bulanan otomatis per siswa
- [!] (M) FR-KEU-02 — Pencatatan pembayaran (manual/transfer/payment gateway) — **payment gateway belum final** (PRD §10: Midtrans/Xendit), konfirmasi dulu sebelum integrasi gateway-nya; pencatatan manual/transfer bisa jalan duluan
- [ ] (M) FR-KEU-03 — Laporan piutang & tunggakan SPP
- [ ] (S) FR-KEU-04 — Pengelolaan dana BOS
- [ ] (M) FR-KEU-05 — Payroll guru/staf (perhitungan gaji, potongan, slip gaji) — **butuh data pegawai dari HRIS Service (Modul 4)**, definisikan kontrak API dulu (lihat `rules.md` §3)
- [ ] (M) FR-KEU-06 — Publish event `spp.lunas` ke Kafka

**Output yang harus bisa dites manual**: generate tagihan → bayar → status tagihan lunas → event ter-publish (cek via Kafka MCP/consumer log).

---

## Modul 4 — HRIS Service *(Fase 4)*

**Dependency**: Auth Service (akun staff/guru). Payroll di Modul 3 bergantung pada data dari sini — kontrak API harus didefinisikan sebelum FR-KEU-05 selesai.

**Tabel database (draft)**: `employees`, `employee_attendances`, `leave_requests`, `position_history`

- [ ] (M) FR-HRIS-01 — Data kepegawaian guru & staf
- [ ] (M) FR-HRIS-02 — Pencatatan kehadiran guru
- [ ] (S) FR-HRIS-03 — Manajemen cuti & izin
- [ ] (C) FR-HRIS-04 — Riwayat jabatan & penilaian kinerja

**Output yang harus bisa dites manual**: data pegawai bisa diambil via API oleh Keuangan Service untuk hitung payroll.

---

## Modul 5 — Portal Orang Tua (API layer) *(Fase 4)*

**Dependency**: Akademik Service (nilai/absensi), Keuangan Service (tagihan). Modul ini backend-nya berupa **agregasi/API contract**, bukan service data baru.

- [ ] (M) FR-PORTAL-01 — API lihat nilai & rapor anak
- [ ] (M) FR-PORTAL-02 — API lihat status kehadiran anak
- [ ] (M) FR-PORTAL-03 — API lihat & bayar tagihan SPP
- [ ] (S) FR-PORTAL-04 — Notifikasi pengumuman sekolah — **kanal notifikasi (email/SMS/WA) belum final** (PRD §10), konfirmasi dulu

**Output yang harus bisa dites manual**: satu akun ortu bisa ambil data anak dari 2 service berbeda lewat satu set endpoint/gateway.

---

## Modul 6 — Hardening & Compliance *(Fase 5)*

**Dependency**: Semua modul 1–5 sudah berjalan.

- [ ] Audit RBAC menyeluruh — pastikan tidak ada endpoint "bocor" tanpa proteksi role
- [ ] Verifikasi enkripsi data at-rest & in-transit (NFR-03)
- [ ] Load testing khusus Akademik/PPDB untuk simulasi musim pendaftaran (NFR-02, Risiko PRD §12)
- [ ] Verifikasi retensi audit log data akademik & keuangan minimal 1 tahun (NFR-05)
- [ ] Review kepatuhan UU PDP No. 27/2022 (data pribadi siswa/ortu/pegawai)

---

## Lampiran — Persiapan Frontend (Design System)

> Fokus utama tetap backend dulu sesuai `workflow.md` §0. Bagian ini dicatat terpisah karena dikerjakan atas permintaan eksplisit user di luar urutan fase — sebagai persiapan sebelum masuk Fase 4 (Portal Ortu), **tidak** mengubah urutan Modul 1–6 di atas.

- [x] Draft awal `design-system.md` — token warna/tipografi/spacing, spesifikasi komponen inti, pemetaan warna badge status (mengacu ke semua enum di `skema-database.md`), layout shell Staf & Portal Ortu, konvensi penamaan file frontend. Ekosistem yang dipakai: React (Next.js) — menjawab poin terbuka di `PRD.md` §9, tapi **`PRD.md` §9 masih perlu diupdate manual** biar dokumen konsisten.
- [ ] Konfirmasi user atas item terbuka di `design-system.md` §10 (warna resmi yayasan, Radix/shadcn, struktur 1 app vs multi-app, library data-fetching/form)
- [ ] Implementasi komponen — belum dimulai, menunggu konfirmasi di atas dan/atau masuk Fase 4

---

## Rekap Item yang Masih `[!]` Blocked / Perlu Konfirmasi User

| Item | Modul terdampak | Referensi PRD |
|---|---|---|
| Target metrik terukur (§4) | Semua — untuk laporan kepala sekolah/yayasan | §4 |
| Pilihan API Gateway (KrakenD/Traefik/bawaan cloud) | Infra dasar (Modul 1) | §9 |
| Kebutuhan integrasi Dapodik | Akademik Service (Modul 2) | §6.2, §10 |
| Pilihan payment gateway (Midtrans/Xendit) | Keuangan Service (Modul 3), Portal Ortu (Modul 5) | §10 |
| Kanal notifikasi (Email/SMS/WhatsApp) | Portal Ortu (Modul 5) | §10 |

> Jangan biarkan agent menebak sendiri item di atas — sesuai `workflow.md` §5, agent wajib berhenti dan tanya user dulu.
