# WORKFLOW.md — Alur Kerja Agentic AI untuk Backend SIMS

> Dokumen ini mengatur BAGAIMANA agentic AI bekerja (urutan langkah, kapan berhenti, kapan lapor).
> Untuk aturan teknis/kode, lihat `rules.md`.

## 0. Konteks Proyek (wajib dibaca ulang tiap sesi baru)

- Proyek: **SIMS** (Sistem Informasi Manajemen Sekolah) untuk Pondok Pesantren.
- Fokus saat ini: **BACKEND SAJA**. Frontend, LMS, CBT, integrasi Dapodik = out of scope dulu.
- Arsitektur: microservices dalam satu monorepo (lihat `rules.md` §2).
- Referensi kebutuhan fungsional & prioritas (M/S/C) mengacu ke `PRD.md` §7.
- Testing akhir/validasi fungsional dilakukan **manual oleh user (pure testing)** — bukan agent yang memutuskan "sudah benar". Agent bertugas menyiapkan kode + cara mudah untuk dites manual (curl/Postman collection/endpoint list), bukan menyatakan fitur "pasti berhasil".

## 1. Urutan Pengerjaan (Fase)

Ikuti urutan fase dari PRD §13, JANGAN loncat fase kecuali user minta eksplisit:

1. **Fase 1** — Auth Service + API Gateway + infra dasar (Docker, CI/CD, struktur monorepo)
2. **Fase 2** — Akademik Service (termasuk alur PPDB)
3. **Fase 3** — Keuangan Service (SPP, BOS, payroll)
4. **Fase 4** — HRIS Service + kontrak API untuk Portal Ortu
5. **Fase 5** — Hardening keamanan, audit log, review kepatuhan UU PDP

Dalam satu fase, urutkan berdasarkan prioritas **M → S → C** dari PRD §7.

## 2. Alur Kerja per Task (WAJIB diikuti langkah demi langkah)

Setiap kali mengerjakan satu task/fitur, agent HARUS melalui urutan ini:

### Step 1 — Klarifikasi & Rencana
- Cek apakah requirement task ini sudah jelas di PRD/rules.md.
- Jika ambigu (lihat §5 "Kapan Harus Berhenti"), STOP dan tanya user dulu.
- Tulis rencana singkat sebelum coding: file/endpoint apa yang akan dibuat/diubah, tabel apa yang terdampak.

### Step 2 — Implementasi
- Ikuti struktur folder & konvensi di `rules.md`.
- Satu task = satu unit kerja yang bisa direview terpisah (jangan gabung banyak fitur tak terkait dalam satu batch besar).
- Business logic tidak boleh nyangkut di handler/controller (lihat `rules.md` §4).
- Semua file/folder baru (kode, migration, dokumentasi, config) WAJIB lowercase dan diberi nama deskriptif sesuai `rules.md` §2.1 — jangan pakai nama generic (`utils.go`, `temp.md`, dll).

### Step 3 — Unit Test Dasar
- Tulis unit test untuk logic kritis (perhitungan SPP, validasi RBAC, hashing password, dll).
- TIDAK wajib coverage tinggi/menyeluruh — cukup untuk logic yang berisiko salah hitung/salah akses, karena validasi akhir dilakukan manual oleh user.

### Step 4 — Dokumentasi Cara Uji Manual
- Sediakan daftar endpoint yang baru/berubah: method, path, contoh request body, contoh response, role yang boleh akses.
- Kalau ada, sediakan contoh `curl` siap pakai atau file Postman/Insomnia collection.
- Sebutkan migration baru (jika ada) dan cara menjalankannya.

### Step 5 — Self-Review Checklist
Sebelum bilang "selesai", cek:
- [ ] Tidak ada akses langsung ke database service lain
- [ ] Semua endpoint protected sesuai role (kecuali memang publik, contoh: login)
- [ ] Tidak ada secret/credential hardcode
- [ ] Sudah ada migration untuk perubahan schema
- [ ] Error handling konsisten (format response error sesuai `rules.md`)
- [ ] README service terkait sudah diupdate
- [ ] Nama semua file/folder baru sudah lowercase & mudah dipahami (`rules.md` §2.1)

### Step 6 — Laporan ke User
Format laporan singkat:
- Apa yang dibuat/diubah (bullet, bukan narasi panjang)
- Cara menjalankan/migrate
- Cara tes manual (endpoint + contoh request)
- Asumsi apa saja yang diambil (kalau ada bagian PRD yang belum jelas)

## 3. Git & Commit Convention

- Branch: `feature/<service>-<deskripsi-singkat>` (contoh: `feature/auth-jwt-refresh`)
- Commit message: `<service>: <deskripsi singkat, present tense>` (contoh: `auth: add refresh token endpoint`)
- Satu commit = satu perubahan logis. Jangan campur perubahan service berbeda dalam satu commit.
- Jangan commit file `.env`, secret, atau hasil build.

## 4. Perubahan Lintas Service

Jika satu task menyentuh lebih dari satu service (misal: event Kafka dari `keuangan-service` ke `akademik-service`):
1. Definisikan dulu **kontrak event/API** (nama event, payload, versi) sebelum implementasi kedua sisi.
2. Implementasikan producer dan consumer sebagai task terpisah, tapi kontraknya dicatat di satu tempat (misal `docs/events.md`).
3. Jangan asumsikan service lain sudah siap — buat mock/stub jika perlu testing terisolasi.

## 5. Kapan Agent HARUS Berhenti dan Bertanya ke User

Jangan lanjut asumsi sendiri jika:
- Requirement PRD masih ada tag `[isi ...]` atau "perlu konfirmasi" dan task ini bergantung padanya (misal: field Dapodik, payment gateway mana yang dipakai).
- Ada keputusan arsitektur besar yang belum difinalkan di PRD §9 (API Gateway, message broker config, dsb).
- Perubahan yang diminta akan mengubah skema database yang sudah punya data / breaking change ke service lain.
- Ada trade-off keamanan (misal: melonggarkan RBAC "sementara" untuk mempercepat testing).

## 6. Kalau Agent Stuck

- Jangan diam-diam skip requirement atau bikin implementasi "asal jalan" yang menyimpang dari `rules.md`.
- Laporkan blocker secara eksplisit: apa yang dicoba, kenapa gagal, opsi yang tersedia.

## 7. Definition of Done (per task)

Task dianggap selesai (dari sisi agent) kalau:
1. Kode mengikuti `rules.md` tanpa deviasi yang tidak dijelaskan.
2. Unit test dasar untuk logic kritis ada dan lulus.
3. Dokumentasi cara uji manual sudah disiapkan.
4. User sudah bisa langsung coba fitur tanpa perlu tanya-tanya cara jalaninnya.

> Catatan: "Selesai" versi agent ≠ "diterima". Keputusan final tetap di tangan user setelah pure testing manual.
