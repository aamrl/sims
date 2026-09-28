# DESIGN-SYSTEM.md — Revisi warna (§0 Prinsip #2, §2.1, §5)

> Pengganti untuk tiga bagian di `design-system.md`. Bagian lain tidak diubah, kecuali patch kecil di akhir dokumen ini.
> Semua isi di sini berstatus **(usulan)**: belum dikunci sampai user mengonfirmasi (sesuai `rules.md` §9 dan `workflow.md` §5).
> Rasio kontras dihitung dengan rumus WCAG 2.x. Tetap cek ulang di tool kontras saat token masuk ke `tailwind.config`.

---

## Ringkasan perubahan

| # | Perubahan | Alasan |
|---|---|---|
| 1 | Emas tidak lagi dipakai untuk tombol dan nav aktif | Prinsip #2 lama bertentangan dengan §2.1 dan §4 (tombol utama = `primary-600`) |
| 2 | Teks emas selalu `accent-600`; `accent-400` hanya untuk fill, border, ikon | `accent-400` di atas putih hanya 2,87:1 (gagal AA) |
| 3 | Badge sukses disatukan: `primary-50` + border `primary-200` + teks `primary-700` | Versi lama mencampur `primary-100` dan `primary-50`; "banner info" memakai `primary-50` padahal ada token `info` |
| 4 | Badge gaya senyap untuk status normal (`aktif`, `hadir`, `paid`) di tabel Shell Staf | Mayoritas baris berstatus normal; badge hijau di tiap baris membuat warna tidak lagi memberi informasi |
| 5 | Ikon lucide wajib di badge penuh | Hijau, merah, dan oranye sulit dibedakan pengidap buta warna merah-hijau; ikon memberi sinyal kedua selain label |
| 6 | `izin` menjadi info, `sakit` menjadi warning | Warning berarti "butuh tindakan". Izin umumnya sudah disetujui; santri sakit perlu perhatian |
| 7 | Tambah `neutral-300`, `neutral-450`, `neutral-500`; placeholder pindah dari `neutral-400` ke `neutral-500` | Placeholder `neutral-400` hanya 2,69:1; border input `neutral-200` hanya 1,37:1 (perlu 3:1) |
| 8 | Kolom border ditambahkan ke tabel semantic | Badge dan banner butuh border, sebelumnya tidak ada token untuk warning, error, info |
| 9 | Label badge memakai sentence case | Konsisten dengan aturan sentence case di §9 |

---

## 0. Prinsip #2 (pengganti)

2. **Satu aksen, dipakai hemat, dan bukan untuk tombol.** Emas tua hanya untuk pencapaian (`lulus`, `terpilih`), angka yang perlu disorot, dan ornamen di Portal Ortu. Tombol utama, link, dan nav aktif selalu hijau primer. Emas tidak menjadi warna status baru, dan tidak dipakai sebagai teks kecil di atas putih.

---

## 2.1 Warna (pengganti)

Palet dasar: hijau tua (kepercayaan, institusional, jauh dari biru SaaS generik) + aksen emas tua (hemat, lihat Prinsip #2) + netral hangat.

**Primary — hijau tua ("pinus")**

| Token | Hex | Pemakaian |
|---|---|---|
| `primary-50` | `#EDF5F0` | Hover halus, baris terpilih, background badge sukses |
| `primary-100` | `#D3E7DC` | Background tint yang lebih kuat (mis. chip terpilih) |
| `primary-200` | `#A8D0B9` | Border badge sukses |
| `primary-500` | `#2F7F5C` | Teks/ikon aksen **hanya** di atas `neutral-0` atau `neutral-25`; cincin fokus; titik badge senyap |
| `primary-600` | `#1E6146` | **Brand default**: tombol utama, link, nav aktif, teks di atas `primary-50` |
| `primary-700` | `#164A35` | Hover/pressed tombol utama; teks badge sukses |
| `primary-900` | `#0A2419` | Teks di atas background primary terang |

**Accent — emas tua ("kunyit")**

| Token | Hex | Pemakaian |
|---|---|---|
| `accent-50` | `#FBF3E3` | Background badge `lulus`/`terpilih` |
| `accent-300` | `#D9AC4D` | Border badge, ikon |
| `accent-400` | `#C2902F` | **Fill saja**: lencana solid, batang progres, elemen grafik. Teks di atasnya `neutral-900`, bukan putih |
| `accent-600` | `#77571C` | **Semua teks emas**, di atas putih, `accent-50`, atau `neutral-25` |

**Neutral — abu hangat**

| Token | Hex | Pemakaian |
|---|---|---|
| `neutral-0` | `#FFFFFF` | Card/panel di atas background halaman |
| `neutral-25` | `#FAF8F4` | Background halaman |
| `neutral-100` | `#F0EDE6` | Hover baris tabel |
| `neutral-200` | `#E1DCD1` | Divider dan border card (dekoratif; **bukan** batas input) |
| `neutral-300` (baru) | `#CFC8B9` | Border tegas: header tabel, pemisah section |
| `neutral-400` | `#A69D89` | Ikon nonaktif saja; **bukan** placeholder |
| `neutral-450` (baru) | `#8F8672` | Border input, select, textarea (≥3:1) |
| `neutral-500` (baru) | `#766E5D` | Placeholder, ikon sekunder; tidak untuk teks di atas `neutral-100` |
| `neutral-600` | `#635C4C` | Teks sekunder |
| `neutral-900` | `#1E1A14` | Teks utama |

**Semantic** (dipakai untuk status, pemetaan lengkap di §5)

| Token | Base (fill solid, ikon) | Background | Border | Teks | Ikon lucide | Arti |
|---|---|---|---|---|---|---|
| `success` | `primary-600` | `primary-50` | `primary-200` | `primary-700` | `circle-check` | Positif/selesai |
| `warning` | `#C1560F` | `#FBEBDD` | `#F0C9A8` | `#7A360A` | `triangle-alert` | Perlu perhatian, belum tuntas |
| `error` | `#B3261E` | `#FBEAE9` | `#EFB9B5` | `#7A1913` | `circle-x` | Negatif/gagal/ditolak |
| `info` | `#2B6CA3` | `#E7F0F8` | `#B7D1E6` | `#1D4C73` | `info` | Netral-informatif, bukan baik/buruk |
| `accent` | `accent-400` | `accent-50` | `accent-300` | `accent-600` | `award` | Pencapaian |
| `neutral` | `neutral-500` | `neutral-100` | `neutral-300` | `neutral-600` | `minus` | Tanpa penilaian, atau belum dimulai |

Fill solid semantic (toast, banner tegas, tombol destruktif) memakai teks putih. Pengecualian: fill `accent-400` memakai teks `neutral-900`.

### Aturan pemakaian

1. Emas bukan warna tombol. Tombol utama dan link `primary-600`, hover/pressed `primary-700`.
2. Teks emas selalu `accent-600`.
3. `primary-500` sebagai teks hanya di atas `neutral-0` atau `neutral-25`. Di atas `primary-50`, pakai `primary-600`.
4. Placeholder `neutral-500`. Batas input `neutral-450`.
5. Baris terpilih di tabel `primary-50`; hover baris tetap `neutral-100`.
6. Banner info memakai token `info` (biru), bukan `primary-50`.

### Rasio kontras (dihitung)

| Pasangan | Rasio | Hasil |
|---|---|---|
| Putih di atas `primary-600` (tombol) | 7,36 | Lolos |
| `primary-700` di atas `primary-50` (badge sukses) | 9,16 | Lolos |
| `primary-500` di atas putih / `neutral-25` | 4,87 / 4,59 | Lolos |
| `primary-500` di atas `primary-50` | 4,39 | **Gagal**, pakai `primary-600` (6,63) |
| `accent-600` di atas `accent-50` / putih | 6,01 / 6,64 | Lolos |
| `accent-400` di atas putih (sebagai teks) | 2,87 | **Gagal**, hanya fill/border/ikon |
| `neutral-900` di atas `accent-400` | 6,04 | Lolos |
| `warning` base di atas putih; teks di atas background | 4,56; 7,64 | Lolos (base tipis, jangan diturunkan) |
| `error` base di atas putih; teks di atas background | 6,54; 9,13 | Lolos |
| `info` base di atas putih; teks di atas background | 5,56; 7,81 | Lolos |
| Putih di atas fill `warning` / `error` / `info` | 4,56 / 6,54 / 5,56 | Lolos |
| `neutral-600` di atas putih / `neutral-25` / `neutral-100` | 6,63 / 6,25 / 5,67 | Lolos |
| `neutral-500` di atas putih / `neutral-25` | 5,05 / 4,76 | Lolos |
| `neutral-500` di atas `neutral-100` | 4,32 | **Gagal**, pakai `neutral-600` di baris hover |
| `neutral-400` di atas putih (sebagai teks) | 2,69 | **Gagal**, ikon nonaktif saja |
| `neutral-450` sebagai border input di atas putih / `neutral-25` | 3,61 / 3,40 | Lolos (non-teks ≥3:1) |
| `neutral-200` sebagai border di atas putih | 1,37 | Dekoratif saja, bukan batas input |

---

## 5. Pemetaan warna status / badge (pengganti)

Semua nilai enum di `skema-database.md` dipetakan sekali di sini, supaya tidak diputuskan ulang per fitur.

### Gaya badge

- **Penuh** (default): background + border + teks token, ditambah ikon lucide 14px di kiri label (ikon mengikuti token di §2.1, lihat tabel semantic).
  Pengecualian ikon: `pending` memakai `clock`.
- **Senyap** (usulan): titik 6px `primary-500` + teks `neutral-600`, tanpa background, border, atau ikon. Dipakai **hanya di tabel padat Shell Staf**, untuk status yang menjadi kondisi normal mayoritas baris: `aktif`, `hadir`, `paid`.
  Di Portal Ortu, halaman detail, toast, dan banner, status yang sama tetap tampil gaya penuh. Orang tua perlu melihat "Lunas" dengan jelas.
- Teks label selalu ada. Status tidak pernah berdiri dengan warna atau ikon saja.

### Tabel pemetaan

| Nilai enum | Kolom sumber | Token | Label | Gaya di tabel staf |
|---|---|---|---|---|
| `aktif` | `students.status` | success | Aktif | Senyap |
| `lulus` | `students.status` | accent | Lulus | Penuh |
| `pindah` | `students.status` | neutral | Pindah | Penuh |
| `keluar` | `students.status` | error | Keluar | Penuh |
| `unpaid` | `invoices.status` | neutral | Belum bayar | Penuh |
| `partial` | `invoices.status` | warning | Sebagian | Penuh |
| `paid` | `invoices.status` / `payrolls.status` | success | Lunas / Dibayar | Senyap |
| `overdue` | `invoices.status` | error | Jatuh tempo | Penuh |
| `submitted` | `ppdb_applicants.status` | info | Terkirim | Penuh |
| `verified` | `ppdb_applicants.status` | info | Terverifikasi | Penuh |
| `selected` | `ppdb_applicants.status` | accent | Terpilih | Penuh |
| `accepted` / `diterima` | `ppdb_applicants.status` / `ppdb_selection_results.hasil` | success | Diterima | Penuh |
| `rejected` / `tidak diterima` | `ppdb_applicants.status` / `ppdb_selection_results.hasil` / `leave_requests.status` | error | Ditolak / Tidak diterima | Penuh |
| `hadir` | `attendances.status` / `employee_attendances.status` | success | Hadir | Senyap |
| `sakit` | `attendances.status` / `employee_attendances.status` | **warning** (sebelumnya info) | Sakit | Penuh |
| `izin` | `attendances.status` / `leave_requests.jenis` | **info** (sebelumnya warning) | Izin | Penuh |
| `alpa` | `attendances.status` / `employee_attendances.status` | error | Alpa | Penuh |
| `pending` | `leave_requests.status` | warning | Menunggu | Penuh |
| `approved` | `leave_requests.status` | success | Disetujui | Penuh |
| `draft` | `payrolls.status` | neutral | Draft | Penuh |

> Prinsip pemetaan: **warning = ada yang perlu ditindak**, **info = informatif tanpa penilaian**, **error = negatif atau gagal**, **success = tuntas**. Kalau ada enum baru, tanya dulu "apakah ini perlu tindakan?" sebelum memilih warning.

---

## Patch kecil untuk bagian lain

- **§3 wireframe dan §9 contoh copy**: ubah ke sentence case: "Tambah siswa", "Bayar sekarang", "Simpan perubahan", "Data siswa". Aturan sentence case di §9 tetap, contohnya yang menyesuaikan.
- **§4 Data table**: tambah baris "baris terpilih = `primary-50`" pada spesifikasi state.
- **§4 Badge status**: "1 varian per token semantic" menjadi "gaya penuh + gaya senyap per token semantic (§5)".
- **§7 Aksesibilitas**: ganti kalimat pertama dengan "Kontras mengikuti tabel rasio di §2.1; cek ulang saat token masuk `tailwind.config`", dan tambah "batas input ≥3:1 (`neutral-450`)".
- **§10 Item yang masih perlu dikonfirmasi**: tambahkan tiga baris:
  - Aturan badge senyap (`aktif`, `hadir`, `paid` di tabel staf).
  - Pemetaan `izin` = info dan `sakit` = warning.
  - Emas tidak dipakai untuk tombol.
- **Belum dicakup di revisi ini**: palet grafik untuk ringkasan kepala sekolah (`PRD.md` §4) dan dark mode. Keduanya sebaiknya diputuskan eksplisit ("ditunda" juga jawaban yang sah).
