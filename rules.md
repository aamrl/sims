# RULES.md — Aturan Teknis Backend SIMS

> Dokumen ini WAJIB dipatuhi agent tanpa pengecualian, kecuali user memberi instruksi eksplisit untuk menyimpang.
> Untuk urutan proses kerja, lihat `workflow.md`.

## 1. Tech Stack (TETAP — jangan diganti tanpa persetujuan user)

| Komponen | Pilihan | Catatan |
|---|---|---|
| Bahasa backend | Go | Versi stabil terbaru, tulis di `go.mod` |
| Framework HTTP | Fiber atau Gin | Pilih SATU di awal proyek, konsisten di semua service |
| Database | PostgreSQL | Satu database per service: `db_auth`, `db_akademik`, `db_keuangan`, `db_hris` |
| Cache & sesi | Redis | |
| Message broker | Kafka | Untuk event asinkron antar-service |
| API Gateway | Belum final (KrakenD/Traefik/bawaan cloud) | Jika belum ditentukan user, JANGAN pilih sendiri — tanya dulu |
| Deployment | Docker, tanpa Kubernetes | Target: Cloud Run / ECS Fargate |
| CI/CD | GitHub Actions atau GitLab CI | Sesuaikan dengan repo yang dipakai user |

## 2. Struktur Monorepo

```
/services
  /auth-service
  /akademik-service
  /keuangan-service
  /hris-service
/gateway            (config API gateway, jika sudah final)
/shared
  /proto atau /contracts   (definisi event Kafka, DTO bersama — hanya tipe data, TIDAK ADA logic)
/docs
  events.md          (kontrak semua event Kafka: nama topic, payload, versi)
  api/               (dokumentasi endpoint per service)
/infra
  docker-compose.yml (untuk dev lokal)
```

Setiap service (`/services/<nama>-service`) punya struktur internal konsisten, contoh:
```
/cmd            (entrypoint main.go)
/internal
  /handler      (HTTP handler — HANYA parsing request & format response)
  /service      (business logic)
  /repository   (akses database)
  /model        (struct domain)
/migrations
README.md       (cara run, env vars, daftar endpoint)
```

## 2.1 Konvensi Penamaan File & Folder (WAJIB)

- **Semua nama file dan folder WAJIB lowercase.** Tidak ada camelCase, PascalCase, spasi, atau huruf kapital di path mana pun.
- **Folder**: `kebab-case` (contoh: `auth-service`, `api-gateway`, bukan `AuthService` atau `Auth_Service`).
- **File Go**: `snake_case.go` (lihat §4).
- **File migration**: format lowercase sesuai tool migration, contoh: `20260101000000_create_students_table.sql`.
- **File dokumentasi/config**: `kebab-case.md` / `kebab-case.yaml` (contoh: `api-endpoints.md`, bukan `APIEndpoints.md` atau `doc1.md`).
- **Nama harus deskriptif dan mudah dipahami** — mencerminkan isi/fungsi file, bukan singkatan ambigu atau nama generic. Hindari nama seperti `utils.go`, `helper.go`, `misc.go`, `temp.md` tanpa konteks jelas; gunakan nama yang menyebut domainnya, misal `password_hash.go`, `jwt_middleware.go`, `spp_calculator.go`.
- Aturan ini berlaku untuk SEMUA file/folder baru yang dibuat agent — kode, migration, dokumentasi, config, maupun script.

## 3. Batasan Arsitektur Antar-Service (HARD RULE)

- **Dilarang** satu service mengakses database service lain secara langsung — semua akses lintas data lewat API atau event Kafka.
- Komunikasi **sinkron** (via API Gateway) hanya untuk operasi yang butuh respons langsung ke user.
- Komunikasi **asinkron** (via Kafka) untuk event lintas-service, contoh: `keuangan-service` publish `spp.lunas` → `akademik-service` konsumsi.
- Kontrak event/API WAJIB didokumentasikan di `/docs/events.md` sebelum diimplementasikan di kedua sisi (produsen & konsumen).
- Tidak ada "shortcut" langsung panggil fungsi service lain dalam proses yang sama (harus tetap lewat network call/event, walau di monorepo).

## 4. Konvensi Kode Go

- **Layering**: `handler` → `service` → `repository`. Business logic HANYA di `service`, bukan di `handler` atau `repository`.
- **Naming**: `camelCase` untuk variabel/fungsi privat, `PascalCase` untuk exported. Nama file `snake_case.go` (lihat §2.1 untuk aturan lengkap penamaan file/folder).
- **Error handling**: gunakan wrapped error (`fmt.Errorf("...: %w", err)`), jangan `panic` untuk error yang bisa diprediksi (validasi input, not found, dll).
- **Response API format standar** (konsisten di semua service):
```json
// Sukses
{ "success": true, "data": { ... } }

// Error
{ "success": false, "error": { "code": "VALIDATION_ERROR", "message": "..." } }
```
- **Logging**: structured logging (misal `zerolog`/`zap`), JANGAN `fmt.Println` untuk log produksi.
- Semua endpoint di-prefix versi: `/api/v1/...`

## 5. Konvensi Database

- Nama tabel: `snake_case`, jamak, **Bahasa Inggris** (konsisten dengan `modul-pengerjaan.md`).
- **Nama kolom: `snake_case`, Bahasa Indonesia** (contoh: `nama_lengkap`, `tanggal_lahir`, `id_siswa`) — kecuali istilah baku yang tidak ada padanan wajar (`id`, `email`, `nip`, `nisn`, `nik`). Lihat `skema-database.md` sebagai acuan penamaan.
- Migration tool wajib dipakai (misal `golang-migrate`), JANGAN ubah schema manual tanpa file migration.
- Setiap tabel wajib punya `dibuat_pada`, `diperbarui_pada`; tabel data akademik & keuangan wajib punya audit trail (`dibuat_oleh`/`diperbarui_oleh`) sesuai NFR-05 PRD.
- Soft delete (`dihapus_pada`) untuk data siswa/pegawai — jangan hard delete data historis.

## 6. Auth & Security (WAJIB, tidak bisa ditunda ke "nanti")

- Password di-hash dengan `bcrypt`/`argon2`, tidak pernah disimpan plaintext.
- JWT untuk access token (short-lived) + refresh token terpisah.
- RBAC middleware wajib dicek di level route, bukan cuma dicek manual di dalam handler.
- Semua endpoint selain login/refresh-token WAJIB butuh autentikasi kecuali dinyatakan eksplisit publik.
- Audit log login (siapa, kapan, dari IP mana) sesuai FR-AUTH-05.
- Tidak ada credential/API key/secret di source code — semua lewat environment variable, dan `.env` masuk `.gitignore`.
- Data pribadi siswa/ortu (NIK, NISN, dll) dienkripsi at-rest sesuai NFR-03 & UU PDP No. 27/2022.

## 7. Environment & Config

- Semua konfigurasi (DB connection, Redis, Kafka broker, JWT secret) lewat env var, ada file `.env.example` per service (tanpa nilai asli).
- Tidak boleh ada nilai default yang "insecure" untuk production (contoh: `JWT_SECRET=secret`) — kalau env var tidak diset, service harus gagal start dengan error jelas, bukan jalan dengan default lemah.

## 8. Testing

- Unit test WAJIB untuk logic kritis: perhitungan tagihan SPP, validasi RBAC, alur seleksi PPDB, perhitungan payroll.
- Tidak wajib coverage tinggi menyeluruh (karena validasi fungsional akhir dilakukan manual oleh user — "pure testing").
- Setiap fitur baru harus disertai cara uji manual (lihat `workflow.md` §2 Step 4) — ini WAJIB, tidak boleh dilewati meskipun unit test sudah ada.

## 9. Larangan Keras (Do NOT)

- ❌ Mengakses database service lain secara langsung.
- ❌ Menaruh business logic di handler/controller.
- ❌ Hardcode secret, password, atau API key di kode/commit.
- ❌ Mengubah schema database tanpa file migration.
- ❌ Membuat/mengubah kontrak event Kafka tanpa update `/docs/events.md`.
- ❌ Melonggarkan RBAC atau enkripsi "sementara untuk testing" tanpa persetujuan eksplisit user.
- ❌ Menggabungkan banyak fitur tak terkait dalam satu commit/PR besar.
- ❌ Menggunakan huruf kapital, spasi, atau singkatan ambigu pada nama file/folder (lihat §2.1).
- ❌ Menamai file dengan nama generic yang tidak jelas fungsinya (`utils.go`, `helper.go`, `temp.go`, `misc.md`, dsb).
- ❌ Memilih sendiri komponen yang statusnya "belum final" di PRD (API Gateway, payment gateway) tanpa konfirmasi user.

## 10. Dokumentasi Wajib per Service

Setiap service minimal punya `README.md` berisi:
- Cara menjalankan lokal (docker-compose / manual)
- Daftar environment variable yang dibutuhkan
- Daftar endpoint (method, path, role yang boleh akses)
- Cara menjalankan migration
- Cara menjalankan test

## 11. Checklist Review Sebelum Task Ditutup

- [ ] Sesuai `rules.md` tanpa deviasi yang tidak dijelaskan ke user
- [ ] Tidak melanggar §3 (batasan antar-service) dan §6 (security)
- [ ] Migration ada & sudah dicoba jalan
- [ ] README/dokumentasi endpoint sudah update
- [ ] Unit test untuk logic kritis ada dan lulus
- [ ] Semua nama file/folder baru lowercase & deskriptif sesuai §2.1
