# MCP-SERVERS.md — Kebutuhan MCP Server untuk Project SIMS

> Dipakai di Antigravity (Manage MCP Servers → View raw config → `mcp_config.json`).
> Prioritas: **W** = Wajib (pasang dari awal), **S** = Should (pasang saat mulai fase terkait), **O** = Opsional/nice-to-have.
> Referensi fase pengerjaan: lihat `workflow.md` §1.

---

## 1. MCP untuk Backend (Go + Auth/Akademik/Keuangan/HRIS Service)

| MCP Server | Fungsi | Prioritas | Catatan |
|---|---|---|---|
| **PostgreSQL MCP** | Query & inspect schema, cek hasil migration per DB (`db_auth`, `db_akademik`, `db_keuangan`, `db_hris`) | **W** | Arahkan ke DB **lokal/dev** saja, jangan production |
| **Git / GitHub (atau GitLab) MCP** | Commit, branch, buka/baca PR & issue sesuai konvensi `rules.md` §3/§9 | **W** | Pakai PAT (Antigravity belum support OAuth penuh) |
| **Redis MCP** | Inspect session, cache, refresh-token saat debug Auth Service | **S** | Mulai relevan begitu FR-AUTH-03 (JWT) dikerjakan |
| **Kafka MCP** | Lihat isi topic/event (`spp.lunas`, dll) untuk verifikasi kontrak event antar-service | **S** | Baru perlu mulai Fase 3 (Keuangan Service publish event) |
| **Context7 / library-docs MCP** | Pastikan agent pakai versi API terkini dari Fiber/Gin, golang-migrate, dll — bukan asumsi dari training data | **S** | Penting karena model dasar Antigravity bisa saja tidak tahu versi library terbaru |
| **Sequential-thinking MCP** | Bantu breakdown task kompleks (misal desain kontrak event lintas-service) | **O** | Berguna untuk task Fase 3–4 yang melibatkan banyak service |

## 2. MCP untuk Frontend (Next.js / Nuxt — Portal Ortu, dsb.)

> Catatan: sesuai kesepakatan awal, backend dikerjakan dulu. Bagian ini untuk persiapan saat masuk fase frontend.

| MCP Server | Fungsi | Prioritas | Catatan |
|---|---|---|---|
| **Browser automation MCP** (Playwright/Puppeteer MCP) | Buka halaman, klik, isi form, screenshot untuk verifikasi UI hasil build | **S** | Antigravity punya browser tool bawaan — cek dulu apakah sudah cukup sebelum pasang tambahan |
| **Chrome DevTools MCP** | Baca console error, network request, performance saat debug frontend | **S** | Berguna untuk debug integrasi API Portal Ortu ke backend |
| **Figma MCP** | Ambil spesifikasi desain (warna, spacing, komponen) langsung dari file Figma, kalau ada desain UI/UX terpisah | **O** | Pasang hanya jika tim desain memang pakai Figma |
| **Context7 / library-docs MCP** | Dokumentasi terkini Next.js/Nuxt, Tailwind, komponen UI yang dipakai | **S** | Sama seperti backend, sangat membantu untuk versi framework terbaru |

## 3. MCP untuk Docker & Infrastruktur

| MCP Server | Fungsi | Prioritas | Catatan |
|---|---|---|---|
| **Docker MCP** | Start/stop/lihat log container, kelola `docker-compose` untuk dev lokal semua service sekaligus | **W** | Inti dari alur dev lokal (lihat `rules.md` §2 struktur monorepo) |
| **Google Cloud MCP** (atau AWS MCP) | Kelola/cek status deployment Cloud Run (atau ECS Fargate bila pilih AWS) | **O** | Baru perlu di Fase 5 (hardening & deployment), bukan sekarang |
| **Kubernetes MCP** | — | **Tidak perlu** | PRD §9 eksplisit: tanpa Kubernetes |

## 4. MCP untuk Testing & API

| MCP Server | Fungsi | Prioritas | Catatan |
|---|---|---|---|
| **HTTP/Fetch MCP atau Postman MCP** | Agent bisa langsung hit endpoint untuk self-review (`workflow.md` Step 5) sebelum kamu tes manual | **S** | Mempercepat siklus "kode → cek sendiri → lapor ke user" |
| **Sentry (atau error-tracking) MCP** | Baca log error runtime saat debugging | **O** | Baru relevan setelah service jalan di environment yang lebih stabil |

## 5. MCP untuk Dokumentasi & Manajemen Kerja

| MCP Server | Fungsi | Prioritas | Catatan |
|---|---|---|---|
| **Google Drive / Notion MCP** | Ambil/update PRD, catatan progress, kalau disimpan di sana (bukan cuma file lokal) | **O** | Pasang kalau kamu memang kelola dokumen di Drive/Notion, bukan cuma repo |
| **Memory MCP** | Simpan konteks project antar-sesi kerja agent (di luar memory bawaan Antigravity, kalau ada) | **O** | Cek dulu apakah Antigravity sudah punya context/memory sendiri antar-sesi |

## 6. Yang TIDAK Perlu Dipasang Sebagai MCP Terpisah

- **Filesystem** — biasanya sudah native di Antigravity (built-in file read/write/edit), tidak perlu MCP tambahan kecuali ada kebutuhan khusus.
- **Terminal/shell execution** — sudah bagian dari kemampuan agentic bawaan Antigravity.

## 7. Catatan Keamanan (WAJIB dipatuhi, selaras `rules.md` §6)

- Semua MCP yang terhubung ke database/broker (Postgres, Redis, Kafka) **hanya boleh diarahkan ke environment lokal/dev/staging**, tidak pernah ke production.
- Jangan simpan credential MCP (PAT, connection string, API key) langsung di `mcp_config.json` tanpa environment variable — perlakukan sama seperti aturan secret di `rules.md` §7.
- Review izin (scope) tiap MCP — pakai prinsip least privilege (misal: PAT GitHub cukup read+write repo, jangan admin org).

## 8. Urutan Pemasangan yang Disarankan

1. **Sekarang (Fase 1 — Auth Service)**: Git/GitHub, PostgreSQL, Docker
2. **Fase 2 (Akademik/PPDB)**: + Context7 (library docs), HTTP/Fetch MCP untuk self-review endpoint
3. **Fase 3 (Keuangan)**: + Redis, Kafka
4. **Fase 4–5 (HRIS, Portal Ortu, Hardening)**: + Browser automation, Chrome DevTools, Cloud MCP
