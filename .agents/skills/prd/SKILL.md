# Product Requirements Document (PRD)
## Sistem Informasi Manajemen Sekolah (SIMS) — [Nama Sekolah / Yayasan]

| | |
|---|---|
| **Versi dokumen** | 0.1 (Draft) |
| **Tanggal dibuat** | 18 September 2026 |
| **Status** | Draft — untuk direview dan dilengkapi tim |
| **Pemilik produk (PO)** | PONDOK PESANTREN |
| **Tech lead** | [Nama] |

### Riwayat Revisi
| Versi | Tanggal | Perubahan | Oleh |
|---|---|---|---|
| 0.1 | 18 Sep 2026 | Draft awal | — |

---

## 1. Ringkasan Eksekutif

SIMS adalah sistem informasi manajemen sekolah untuk **sekolah swasta**, dibangun dengan arsitektur **microservices** untuk mendigitalisasi proses administrasi akademik, PPDB (Penerimaan Peserta Didik Baru), keuangan, dan kepegawaian dalam satu platform terintegrasi.

## 2. Latar Belakang & Masalah

*(Sesuaikan dengan kondisi nyata sekolah — poin di bawah adalah masalah umum yang biasanya melatarbelakangi proyek seperti ini.)*

- Data siswa, nilai, absensi, dan kedisiplinan tersebar di banyak file/dokumen fisik atau spreadsheet terpisah, sulit direkap dan rawan hilang.
- Proses PPDB manual (form kertas / spreadsheet) memperlambat seleksi dan rawan human error.
- Orang tua tidak punya akses real-time ke nilai, absensi, atau status tagihan SPP anak.
- Rekonsiliasi pembayaran SPP dan pengelolaan dana BOS masih manual, menyulitkan pelaporan keuangan.
- Data kepegawaian dan kehadiran guru belum tersentralisasi, menyulitkan perhitungan payroll.

## 3. Tujuan Produk

1. Menyediakan satu sumber data siswa yang akurat dan real-time (data induk, akademik, absensi, kedisiplinan).
2. Mendigitalisasi dan mempercepat proses PPDB dari pendaftaran hingga pengumuman.
3. Mengotomatiskan penagihan dan pencatatan pembayaran SPP serta pengelolaan dana BOS.
4. Menyediakan portal bagi orang tua untuk memantau perkembangan anak secara mandiri.
5. Menyentralisasi data kepegawaian dan mendukung proses payroll guru/staf.

## 4. Sasaran Terukur (Draft — sesuaikan dengan target bisnis)

| Sasaran | Metrik | Target |
|---|---|---|
| Percepatan proses PPDB | Rata-rata waktu dari pendaftaran ke pengumuman | [isi target] |
| Adopsi portal orang tua | % orang tua aktif login per bulan | [isi target] |
| Ketepatan waktu pembayaran SPP | % tagihan lunas sebelum jatuh tempo | [isi target] |
| Pengurangan kerja manual admin | Jam kerja admin per bulan untuk rekap data | [isi target] |

## 5. Target Pengguna

| Peran | Kebutuhan utama |
|---|---|
| Admin sekolah | Kelola data induk, PPDB, laporan keseluruhan |
| Guru | Input nilai, absensi, catatan kedisiplinan |
| Staf keuangan | Kelola tagihan SPP, dana BOS, payroll |
| Staf HRIS/kepegawaian | Kelola data pegawai, kehadiran, cuti |
| Orang tua | Pantau nilai, absensi, tagihan anak |
| Siswa | Lihat nilai dan jadwal (opsional, tergantung kebijakan sekolah) |
| Kepala sekolah / yayasan | Lihat laporan ringkasan akademik & keuangan |

## 6. Ruang Lingkup

### 6.1 Termasuk (In Scope) — v1
- Manajemen data induk siswa, riwayat akademik, absensi harian, kedisiplinan
- Alur PPDB lengkap (pendaftaran, verifikasi dokumen, seleksi, pengumuman)
- Manajemen tagihan & pembayaran SPP, pengelolaan dana BOS
- Payroll guru/staf
- Manajemen data kepegawaian & kehadiran guru (HRIS)
- Portal orang tua (nilai, absensi, tagihan, pengumuman)
- Autentikasi terpusat & kontrol akses berbasis peran (RBAC)

### 6.2 Tidak Termasuk (Out of Scope) — v1
- **LMS** — distribusi materi belajar, pengumpulan tugas online
- **CBT** — ujian berbasis komputer/online
- Integrasi Dapodik otomatis (butuh konfirmasi kebutuhan — lihat §10)

*(LMS dan CBT dapat menjadi fase pengembangan berikutnya jika dibutuhkan.)*

## 7. Kebutuhan Fungsional

Prioritas: **M** = Must have, **S** = Should have, **C** = Could have.

### 7.1 Auth Service
| ID | Deskripsi | Prioritas |
|---|---|---|
| FR-AUTH-01 | Login dengan email/username + password | M |
| FR-AUTH-02 | Role-based access control (Admin, Guru, Keuangan, HRIS, Ortu, Siswa) | M |
| FR-AUTH-03 | Penerbitan & refresh JWT token | M |
| FR-AUTH-04 | Reset password via email | M |
| FR-AUTH-05 | Audit log aktivitas login (siapa, kapan, dari mana) | S |

### 7.2 Akademik Service
| ID | Deskripsi | Prioritas |
|---|---|---|
| FR-AKD-01 | CRUD data induk siswa (biodata, NISN, NIK, dll) | M |
| FR-AKD-02 | Input & lihat riwayat nilai per semester | M |
| FR-AKD-03 | Absensi harian per kelas, rekap otomatis | M |
| FR-AKD-04 | Pencatatan kedisiplinan (pelanggaran, poin, tindak lanjut) | M |
| FR-AKD-05 | Alur PPDB: pendaftaran online, upload dokumen, seleksi, pengumuman | M |
| FR-AKD-06 | Ekspor data ke format Dapodik (kondisional, lihat §10) | S |

### 7.3 Keuangan Service
| ID | Deskripsi | Prioritas |
|---|---|---|
| FR-KEU-01 | Generate tagihan SPP bulanan otomatis per siswa | M |
| FR-KEU-02 | Pencatatan pembayaran (manual/transfer/payment gateway) | M |
| FR-KEU-03 | Laporan piutang & tunggakan SPP | M |
| FR-KEU-04 | Pengelolaan dana BOS (jika sekolah menerima) | S |
| FR-KEU-05 | Payroll guru/staf (perhitungan gaji, potongan, slip gaji) | M |
| FR-KEU-06 | Publish event "SPP lunas" ke message broker | M |

### 7.4 HRIS Service
| ID | Deskripsi | Prioritas |
|---|---|---|
| FR-HRIS-01 | Data kepegawaian guru & staf | M |
| FR-HRIS-02 | Pencatatan kehadiran guru | M |
| FR-HRIS-03 | Manajemen cuti & izin | S |
| FR-HRIS-04 | Riwayat jabatan & penilaian kinerja | C |

### 7.5 Portal Orang Tua
| ID | Deskripsi | Prioritas |
|---|---|---|
| FR-PORTAL-01 | Lihat nilai & rapor anak | M |
| FR-PORTAL-02 | Lihat status kehadiran anak | M |
| FR-PORTAL-03 | Lihat & bayar tagihan SPP | M |
| FR-PORTAL-04 | Notifikasi pengumuman sekolah | S |

## 8. Kebutuhan Non-Fungsional

| ID | Kebutuhan |
|---|---|
| NFR-01 | Response time API < 300ms untuk 95% request pada beban normal |
| NFR-02 | Tiap service dapat di-scale independen (khususnya Akademik/PPDB saat musim pendaftaran) |
| NFR-03 | Enkripsi data at-rest & in-transit (TLS), RBAC ketat, kepatuhan UU PDP No. 27/2022 |
| NFR-04 | Target uptime 99.5% pada jam operasional sekolah |
| NFR-05 | Log perubahan data akademik & keuangan disimpan minimal 1 tahun (audit trail) |
| NFR-06 | Hindari lock-in vendor cloud yang ekstrem — gunakan layanan portable (Docker, Postgres standar) |

## 9. Arsitektur Teknis (Ringkasan)

| Komponen | Pilihan |
|---|---|
| Pola arsitektur | Microservices, dikelola dalam satu monorepo |
| Backend | Go (Fiber/Gin), satu service per domain: Auth, Akademik, Keuangan, HRIS |
| Frontend | Next.js (React) **atau** Nuxt (Vue) — pilih salah satu ekosistem |
| Database | PostgreSQL — satu database terpisah per service (`db_auth`, `db_akademik`, `db_keuangan`, `db_hris`) dalam satu cluster |
| Cache & sesi | Redis |
| Message broker | Kafka (event asinkron antar-service) |
| API Gateway | Belum final — kandidat: KrakenD, Traefik, atau gateway/load balancer bawaan cloud |
| Deployment | Docker container tanpa Kubernetes → Google Cloud Run atau AWS ECS Fargate |
| CI/CD | GitHub Actions atau GitLab CI |

**Prinsip komunikasi antar-service:**
- Sinkron (request langsung via API Gateway) untuk operasi yang butuh respons langsung.
- Asinkron (via Kafka) untuk event lintas-service, contoh: `keuangan-service` publish "SPP lunas" → `akademik-service` konsumsi untuk update status siswa.
- Tidak ada service yang mengakses database service lain secara langsung.

## 10. Integrasi Eksternal

| Integrasi | Status | Catatan |
|---|---|---|
| Dapodik | Perlu konfirmasi | Wajib jika sekolah menerima dana BOS atau siswa butuh NISN resmi untuk ijazah |
| Payment gateway (SPP) | Perlu dipilih | Kandidat: Midtrans, Xendit |
| Email/SMS/WhatsApp gateway | Perlu dipilih | Untuk notifikasi tagihan, pengumuman, hasil PPDB |

## 11. Alur Utama (Contoh)

**Alur PPDB:**
Pendaftar mengisi formulir → upload dokumen → admin verifikasi → pengumuman hasil → jika diterima, `akademik-service` memicu event agar `auth-service` membuat akun siswa baru.

**Alur Pembayaran SPP:**
Sistem generate tagihan bulanan → orang tua bayar via portal → `keuangan-service` mencatat pembayaran → publish event "SPP lunas" → `akademik-service` memperbarui status siswa.

## 12. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Kompleksitas microservices untuk tim kecil | Keterlambatan development | Mulai dari 4 service inti, struktur monorepo, tunda tooling observability yang berat |
| Perubahan format/aturan Dapodik | Perlu penyesuaian skema data | Desain modul ekspor Dapodik terpisah dari skema inti |
| Lonjakan trafik saat musim PPDB | Downtime/response lambat | Auto-scaling khusus untuk `akademik-service` di jam sibuk pendaftaran |
| Kebocoran data pribadi siswa/ortu | Pelanggaran UU PDP, reputasi | RBAC ketat, enkripsi, audit log, retensi data yang jelas |

## 13. Timeline Pengembangan (Draft)

| Fase | Cakupan |
|---|---|
| Fase 1 | Auth Service + API Gateway + infrastruktur dasar (Docker, CI/CD) |
| Fase 2 | Akademik Service (termasuk alur PPDB) |
| Fase 3 | Keuangan Service (SPP, BOS, payroll) |
| Fase 4 | HRIS Service + Portal Orang Tua lengkap |
| Fase 5 | Hardening keamanan, load testing, review kepatuhan UU PDP |

## 14. Lampiran: Glosarium

| Istilah | Arti |
|---|---|
| PPDB | Penerimaan Peserta Didik Baru |
| SPP | Sumbangan Pembinaan Pendidikan (biaya sekolah bulanan) |
| BOS | Bantuan Operasional Sekolah (dana pemerintah) |
| NISN | Nomor Induk Siswa Nasional |
| Dapodik | Data Pokok Pendidikan (sistem pelaporan nasional Kemendikdasmen) |
| RBAC | Role-Based Access Control |
| SIS | Student Information System |

---

*Dokumen ini adalah draft awal. Bagian yang ditandai `[isi ...]` atau "perlu konfirmasi" perlu dilengkapi bersama stakeholder sekolah sebelum development dimulai.*
