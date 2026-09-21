import type {
  Student, Class, Subject, Grade, Attendance, DisciplineRecord,
  PpdbApplicant, PpdbDocument, PpdbSelectionResult,
  Invoice, Payment, BosFund, Payroll, PayrollItem,
  Employee, EmployeeAttendance, LeaveRequest, User,
} from "@/types/entities";

// ── Classes ───────────────────────────────────────────────────────────────────
export const mockClasses: Class[] = [
  { id: "cls-1", nama: "7A", tingkat_kelas: "7", tahun_ajaran: "2026/2027", id_referensi_guru_wali: "emp-1" },
  { id: "cls-2", nama: "7B", tingkat_kelas: "7", tahun_ajaran: "2026/2027", id_referensi_guru_wali: "emp-2" },
  { id: "cls-3", nama: "8A", tingkat_kelas: "8", tahun_ajaran: "2026/2027", id_referensi_guru_wali: "emp-3" },
  { id: "cls-4", nama: "8B", tingkat_kelas: "8", tahun_ajaran: "2026/2027", id_referensi_guru_wali: "emp-4" },
  { id: "cls-5", nama: "9A", tingkat_kelas: "9", tahun_ajaran: "2026/2027", id_referensi_guru_wali: "emp-5" },
];

// ── Students ──────────────────────────────────────────────────────────────────
export const mockStudents: Student[] = [
  { id: "stu-1",  nisn: "0071234561", nik: "3201010101010001", nama_lengkap: "Ahmad Fauzi",         tempat_lahir: "Bandung",  tanggal_lahir: "2013-03-15", jenis_kelamin: "L", alamat: "Jl. Merdeka No. 1, Bandung",    id_referensi_pengguna_ortu: "usr-o1", id_kelas: "cls-1", kelas: mockClasses[0], status: "aktif",  tanggal_masuk: "2024-07-15", dibuat_pada: "2024-07-15", diperbarui_pada: "2026-08-01" },
  { id: "stu-2",  nisn: "0071234562", nik: "3201010101010002", nama_lengkap: "Siti Rahmawati",      tempat_lahir: "Jakarta",  tanggal_lahir: "2013-06-22", jenis_kelamin: "P", alamat: "Jl. Sudirman No. 45, Jakarta",   id_referensi_pengguna_ortu: "usr-o2", id_kelas: "cls-1", kelas: mockClasses[0], status: "aktif",  tanggal_masuk: "2024-07-15", dibuat_pada: "2024-07-15", diperbarui_pada: "2026-08-01" },
  { id: "stu-3",  nisn: "0071234563", nik: "3201010101010003", nama_lengkap: "Muhammad Rizki",      tempat_lahir: "Surabaya", tanggal_lahir: "2012-11-05", jenis_kelamin: "L", alamat: "Jl. Pahlawan No. 12, Surabaya",  id_referensi_pengguna_ortu: "usr-o3", id_kelas: "cls-3", kelas: mockClasses[2], status: "aktif",  tanggal_masuk: "2023-07-15", dibuat_pada: "2023-07-15", diperbarui_pada: "2026-08-01" },
  { id: "stu-4",  nisn: "0071234564", nik: "3201010101010004", nama_lengkap: "Nurul Hidayah",       tempat_lahir: "Bogor",    tanggal_lahir: "2012-01-30", jenis_kelamin: "P", alamat: "Jl. Raya Bogor No. 88",          id_referensi_pengguna_ortu: "usr-o4", id_kelas: "cls-3", kelas: mockClasses[2], status: "aktif",  tanggal_masuk: "2023-07-15", dibuat_pada: "2023-07-15", diperbarui_pada: "2026-08-01" },
  { id: "stu-5",  nisn: "0071234565", nik: "3201010101010005", nama_lengkap: "Fajar Santoso",       tempat_lahir: "Medan",    tanggal_lahir: "2011-08-17", jenis_kelamin: "L", alamat: "Jl. Gajah Mada No. 7, Medan",   id_referensi_pengguna_ortu: "usr-o5", id_kelas: "cls-5", kelas: mockClasses[4], status: "lulus",  tanggal_masuk: "2022-07-15", dibuat_pada: "2022-07-15", diperbarui_pada: "2026-06-30" },
  { id: "stu-6",  nisn: "0071234566", nik: "3201010101010006", nama_lengkap: "Dewi Anggraini",      tempat_lahir: "Yogyakarta",tanggal_lahir: "2011-04-12", jenis_kelamin: "P", alamat: "Jl. Malioboro No. 5, Yogya",    id_referensi_pengguna_ortu: "usr-o6", id_kelas: "cls-5", kelas: mockClasses[4], status: "aktif",  tanggal_masuk: "2022-07-15", dibuat_pada: "2022-07-15", diperbarui_pada: "2026-08-01" },
  { id: "stu-7",  nisn: "0071234567", nik: "3201010101010007", nama_lengkap: "Budi Prasetyo",       tempat_lahir: "Semarang", tanggal_lahir: "2013-09-20", jenis_kelamin: "L", alamat: "Jl. Pemuda No. 30, Semarang",    id_referensi_pengguna_ortu: null,     id_kelas: "cls-2", kelas: mockClasses[1], status: "pindah", tanggal_masuk: "2024-07-15", dibuat_pada: "2024-07-15", diperbarui_pada: "2026-05-01" },
  { id: "stu-8",  nisn: "0071234568", nik: "3201010101010008", nama_lengkap: "Laila Nuraini",       tempat_lahir: "Bekasi",   tanggal_lahir: "2012-07-08", jenis_kelamin: "P", alamat: "Jl. Ahmad Yani No. 22, Bekasi",  id_referensi_pengguna_ortu: "usr-o8", id_kelas: "cls-4", kelas: mockClasses[3], status: "aktif",  tanggal_masuk: "2023-07-15", dibuat_pada: "2023-07-15", diperbarui_pada: "2026-08-01" },
  { id: "stu-9",  nisn: "0071234569", nik: "3201010101010009", nama_lengkap: "Hendra Wijaya",       tempat_lahir: "Depok",    tanggal_lahir: "2011-12-01", jenis_kelamin: "L", alamat: "Jl. Margonda Raya No. 10, Depok",id_referensi_pengguna_ortu: "usr-o9", id_kelas: "cls-5", kelas: mockClasses[4], status: "keluar", tanggal_masuk: "2022-07-15", dibuat_pada: "2022-07-15", diperbarui_pada: "2026-03-01" },
  { id: "stu-10", nisn: "0071234570", nik: "3201010101010010", nama_lengkap: "Rina Kusumawati",     tempat_lahir: "Tangerang",tanggal_lahir: "2013-02-14", jenis_kelamin: "P", alamat: "Jl. Daan Mogot No. 55, Tangerang",id_referensi_pengguna_ortu: "usr-o10",id_kelas: "cls-1", kelas: mockClasses[0], status: "aktif",  tanggal_masuk: "2024-07-15", dibuat_pada: "2024-07-15", diperbarui_pada: "2026-08-01" },
  { id: "stu-11", nisn: "0071234571", nik: "3201010101010011", nama_lengkap: "Agus Setiawan",       tempat_lahir: "Palembang",tanggal_lahir: "2012-05-25", jenis_kelamin: "L", alamat: "Jl. Sudirman No. 100, Palembang", id_referensi_pengguna_ortu: "usr-o11",id_kelas: "cls-3", kelas: mockClasses[2], status: "aktif",  tanggal_masuk: "2023-07-15", dibuat_pada: "2023-07-15", diperbarui_pada: "2026-08-01" },
  { id: "stu-12", nisn: "0071234572", nik: "3201010101010012", nama_lengkap: "Indah Permata Sari",  tempat_lahir: "Malang",   tanggal_lahir: "2012-10-03", jenis_kelamin: "P", alamat: "Jl. Ijen No. 14, Malang",         id_referensi_pengguna_ortu: "usr-o12",id_kelas: "cls-4", kelas: mockClasses[3], status: "aktif",  tanggal_masuk: "2023-07-15", dibuat_pada: "2023-07-15", diperbarui_pada: "2026-08-01" },
];

// ── Subjects ──────────────────────────────────────────────────────────────────
export const mockSubjects: Subject[] = [
  { id: "sub-1", nama: "Matematika",             kode: "MTK" },
  { id: "sub-2", nama: "Bahasa Indonesia",        kode: "BIN" },
  { id: "sub-3", nama: "Bahasa Inggris",          kode: "BIG" },
  { id: "sub-4", nama: "IPA",                     kode: "IPA" },
  { id: "sub-5", nama: "IPS",                     kode: "IPS" },
  { id: "sub-6", nama: "Pendidikan Agama Islam",  kode: "PAI" },
  { id: "sub-7", nama: "Fikih",                   kode: "FIK" },
  { id: "sub-8", nama: "Tahfidz",                 kode: "THF" },
];

// ── Grades ────────────────────────────────────────────────────────────────────
export const mockGrades: Grade[] = [
  { id: "grd-1",  id_siswa: "stu-1", id_mata_pelajaran: "sub-1", mata_pelajaran: mockSubjects[0], semester: "Ganjil", tahun_ajaran: "2026/2027", nilai: 88, jenis_nilai: "UTS", id_referensi_penginput: "emp-1", dibuat_pada: "2026-09-10" },
  { id: "grd-2",  id_siswa: "stu-1", id_mata_pelajaran: "sub-2", mata_pelajaran: mockSubjects[1], semester: "Ganjil", tahun_ajaran: "2026/2027", nilai: 92, jenis_nilai: "UTS", id_referensi_penginput: "emp-2", dibuat_pada: "2026-09-10" },
  { id: "grd-3",  id_siswa: "stu-1", id_mata_pelajaran: "sub-3", mata_pelajaran: mockSubjects[2], semester: "Ganjil", tahun_ajaran: "2026/2027", nilai: 78, jenis_nilai: "UTS", id_referensi_penginput: "emp-3", dibuat_pada: "2026-09-10" },
  { id: "grd-4",  id_siswa: "stu-1", id_mata_pelajaran: "sub-4", mata_pelajaran: mockSubjects[3], semester: "Ganjil", tahun_ajaran: "2026/2027", nilai: 85, jenis_nilai: "UTS", id_referensi_penginput: "emp-4", dibuat_pada: "2026-09-10" },
  { id: "grd-5",  id_siswa: "stu-1", id_mata_pelajaran: "sub-5", mata_pelajaran: mockSubjects[4], semester: "Ganjil", tahun_ajaran: "2026/2027", nilai: 90, jenis_nilai: "UTS", id_referensi_penginput: "emp-5", dibuat_pada: "2026-09-10" },
  { id: "grd-6",  id_siswa: "stu-1", id_mata_pelajaran: "sub-6", mata_pelajaran: mockSubjects[5], semester: "Ganjil", tahun_ajaran: "2026/2027", nilai: 95, jenis_nilai: "UTS", id_referensi_penginput: "emp-1", dibuat_pada: "2026-09-10" },
  { id: "grd-7",  id_siswa: "stu-2", id_mata_pelajaran: "sub-1", mata_pelajaran: mockSubjects[0], semester: "Ganjil", tahun_ajaran: "2026/2027", nilai: 75, jenis_nilai: "UTS", id_referensi_penginput: "emp-1", dibuat_pada: "2026-09-10" },
  { id: "grd-8",  id_siswa: "stu-2", id_mata_pelajaran: "sub-2", mata_pelajaran: mockSubjects[1], semester: "Ganjil", tahun_ajaran: "2026/2027", nilai: 83, jenis_nilai: "UTS", id_referensi_penginput: "emp-2", dibuat_pada: "2026-09-10" },
];

// ── Attendances ───────────────────────────────────────────────────────────────
const today = "2026-09-21";
export const mockAttendances: Attendance[] = [
  { id: "att-1",  id_siswa: "stu-1",  siswa: mockStudents[0],  id_kelas: "cls-1", tanggal: today, status: "hadir", id_referensi_pencatat: "emp-1", dibuat_pada: today },
  { id: "att-2",  id_siswa: "stu-2",  siswa: mockStudents[1],  id_kelas: "cls-1", tanggal: today, status: "sakit", id_referensi_pencatat: "emp-1", dibuat_pada: today },
  { id: "att-3",  id_siswa: "stu-10", siswa: mockStudents[9],  id_kelas: "cls-1", tanggal: today, status: "izin",  id_referensi_pencatat: "emp-1", dibuat_pada: today },
  { id: "att-4",  id_siswa: "stu-7",  siswa: mockStudents[6],  id_kelas: "cls-2", tanggal: today, status: "alpa",  id_referensi_pencatat: "emp-2", dibuat_pada: today },
  { id: "att-5",  id_siswa: "stu-3",  siswa: mockStudents[2],  id_kelas: "cls-3", tanggal: today, status: "hadir", id_referensi_pencatat: "emp-3", dibuat_pada: today },
  { id: "att-6",  id_siswa: "stu-4",  siswa: mockStudents[3],  id_kelas: "cls-3", tanggal: today, status: "hadir", id_referensi_pencatat: "emp-3", dibuat_pada: today },
  { id: "att-7",  id_siswa: "stu-11", siswa: mockStudents[10], id_kelas: "cls-3", tanggal: today, status: "hadir", id_referensi_pencatat: "emp-3", dibuat_pada: today },
  { id: "att-8",  id_siswa: "stu-8",  siswa: mockStudents[7],  id_kelas: "cls-4", tanggal: today, status: "hadir", id_referensi_pencatat: "emp-4", dibuat_pada: today },
  { id: "att-9",  id_siswa: "stu-12", siswa: mockStudents[11], id_kelas: "cls-4", tanggal: today, status: "izin",  id_referensi_pencatat: "emp-4", dibuat_pada: today },
  { id: "att-10", id_siswa: "stu-6",  siswa: mockStudents[5],  id_kelas: "cls-5", tanggal: today, status: "hadir", id_referensi_pencatat: "emp-5", dibuat_pada: today },
];

// ── Discipline Records ────────────────────────────────────────────────────────
export const mockDisciplineRecords: DisciplineRecord[] = [
  { id: "dis-1", id_siswa: "stu-3",  siswa: mockStudents[2],  deskripsi_pelanggaran: "Terlambat masuk kelas",       poin: 5,  tindak_lanjut: "Peringatan lisan",               id_referensi_pencatat: "emp-1", dicatat_pada: "2026-09-05", dibuat_pada: "2026-09-05" },
  { id: "dis-2", id_siswa: "stu-7",  siswa: mockStudents[6],  deskripsi_pelanggaran: "Tidak mengerjakan tugas",     poin: 10, tindak_lanjut: "Panggilan orang tua",             id_referensi_pencatat: "emp-2", dicatat_pada: "2026-09-10", dibuat_pada: "2026-09-10" },
  { id: "dis-3", id_siswa: "stu-1",  siswa: mockStudents[0],  deskripsi_pelanggaran: "Seragam tidak lengkap",       poin: 3,  tindak_lanjut: null,                              id_referensi_pencatat: "emp-3", dicatat_pada: "2026-09-15", dibuat_pada: "2026-09-15" },
  { id: "dis-4", id_siswa: "stu-9",  siswa: mockStudents[8],  deskripsi_pelanggaran: "Meninggalkan kelas tanpa izin",poin: 15, tindak_lanjut: "SP1 diterbitkan",                id_referensi_pencatat: "emp-1", dicatat_pada: "2026-08-20", dibuat_pada: "2026-08-20" },
];

// ── PPDB Applicants ───────────────────────────────────────────────────────────
const ppdbDocs1: PpdbDocument[] = [
  { id: "doc-1", id_pendaftar: "ppdb-1", jenis_dokumen: "Akta Kelahiran", lokasi_berkas: "/uploads/ppdb-1/akta.pdf",    terverifikasi: true,  id_referensi_verifikator: "emp-1", dibuat_pada: "2026-06-01" },
  { id: "doc-2", id_pendaftar: "ppdb-1", jenis_dokumen: "Kartu Keluarga", lokasi_berkas: "/uploads/ppdb-1/kk.pdf",      terverifikasi: true,  id_referensi_verifikator: "emp-1", dibuat_pada: "2026-06-01" },
  { id: "doc-3", id_pendaftar: "ppdb-1", jenis_dokumen: "Ijazah SD",      lokasi_berkas: "/uploads/ppdb-1/ijazah.pdf",  terverifikasi: false, id_referensi_verifikator: null,    dibuat_pada: "2026-06-01" },
];
export const mockPpdbApplicants: PpdbApplicant[] = [
  { id: "ppdb-1", nama_lengkap: "Rizal Maulana",      nik: "3201020202020001", tanggal_lahir: "2014-04-10", nama_orang_tua: "Hadi Maulana",     kontak_orang_tua: "08123456789", nomor_pendaftaran: "PPDB-2027-001", status: "verified",  dokumen: ppdbDocs1, dibuat_pada: "2026-06-01", diperbarui_pada: "2026-06-10" },
  { id: "ppdb-2", nama_lengkap: "Syifa Aulia",         nik: "3201020202020002", tanggal_lahir: "2014-07-22", nama_orang_tua: "Dedi Aulia",       kontak_orang_tua: "08234567890", nomor_pendaftaran: "PPDB-2027-002", status: "submitted", dokumen: [],       dibuat_pada: "2026-06-02", diperbarui_pada: "2026-06-02" },
  { id: "ppdb-3", nama_lengkap: "Farhan Al-Ghifari",  nik: "3201020202020003", tanggal_lahir: "2014-01-15", nama_orang_tua: "Irwan Ghifari",    kontak_orang_tua: "08345678901", nomor_pendaftaran: "PPDB-2027-003", status: "selected",  dokumen: [],       dibuat_pada: "2026-06-03", diperbarui_pada: "2026-06-15" },
  { id: "ppdb-4", nama_lengkap: "Nadia Putri Lestari",nik: "3201020202020004", tanggal_lahir: "2014-09-30", nama_orang_tua: "Bambang Lestari",  kontak_orang_tua: "08456789012", nomor_pendaftaran: "PPDB-2027-004", status: "accepted",  dokumen: [], hasil_seleksi: { id: "sel-4", id_pendaftar: "ppdb-4", nilai: 92.5, hasil: "diterima", diumumkan_pada: "2026-06-20", dibuat_pada: "2026-06-20" }, dibuat_pada: "2026-06-04", diperbarui_pada: "2026-06-20" },
  { id: "ppdb-5", nama_lengkap: "Kevin Prayoga",      nik: "3201020202020005", tanggal_lahir: "2014-03-05", nama_orang_tua: "Eko Prayoga",      kontak_orang_tua: "08567890123", nomor_pendaftaran: "PPDB-2027-005", status: "rejected",  dokumen: [], hasil_seleksi: { id: "sel-5", id_pendaftar: "ppdb-5", nilai: 58.0, hasil: "tidak diterima", diumumkan_pada: "2026-06-20", dibuat_pada: "2026-06-20" }, dibuat_pada: "2026-06-05", diperbarui_pada: "2026-06-20" },
  { id: "ppdb-6", nama_lengkap: "Zara Maharani",      nik: "3201020202020006", tanggal_lahir: "2014-11-18", nama_orang_tua: "Wahyu Maharani",   kontak_orang_tua: "08678901234", nomor_pendaftaran: "PPDB-2027-006", status: "submitted", dokumen: [],       dibuat_pada: "2026-06-06", diperbarui_pada: "2026-06-06" },
];

// ── Invoices ──────────────────────────────────────────────────────────────────
export const mockInvoices: Invoice[] = [
  { id: "inv-1",  id_referensi_siswa: "stu-1",  siswa: { id: "stu-1",  nama_lengkap: "Ahmad Fauzi",        id_kelas: "cls-1", kelas: mockClasses[0] }, periode: "2026-09", jumlah: 500000, tanggal_jatuh_tempo: "2026-09-10", status: "paid",    dibuat_pada: "2026-09-01", diperbarui_pada: "2026-09-08" },
  { id: "inv-2",  id_referensi_siswa: "stu-2",  siswa: { id: "stu-2",  nama_lengkap: "Siti Rahmawati",     id_kelas: "cls-1", kelas: mockClasses[0] }, periode: "2026-09", jumlah: 500000, tanggal_jatuh_tempo: "2026-09-10", status: "unpaid",  dibuat_pada: "2026-09-01", diperbarui_pada: "2026-09-01" },
  { id: "inv-3",  id_referensi_siswa: "stu-3",  siswa: { id: "stu-3",  nama_lengkap: "Muhammad Rizki",     id_kelas: "cls-3", kelas: mockClasses[2] }, periode: "2026-09", jumlah: 500000, tanggal_jatuh_tempo: "2026-09-10", status: "partial", dibuat_pada: "2026-09-01", diperbarui_pada: "2026-09-07" },
  { id: "inv-4",  id_referensi_siswa: "stu-4",  siswa: { id: "stu-4",  nama_lengkap: "Nurul Hidayah",      id_kelas: "cls-3", kelas: mockClasses[2] }, periode: "2026-09", jumlah: 500000, tanggal_jatuh_tempo: "2026-09-10", status: "overdue", dibuat_pada: "2026-09-01", diperbarui_pada: "2026-09-01" },
  { id: "inv-5",  id_referensi_siswa: "stu-6",  siswa: { id: "stu-6",  nama_lengkap: "Dewi Anggraini",     id_kelas: "cls-5", kelas: mockClasses[4] }, periode: "2026-09", jumlah: 500000, tanggal_jatuh_tempo: "2026-09-10", status: "paid",    dibuat_pada: "2026-09-01", diperbarui_pada: "2026-09-05" },
  { id: "inv-6",  id_referensi_siswa: "stu-8",  siswa: { id: "stu-8",  nama_lengkap: "Laila Nuraini",      id_kelas: "cls-4", kelas: mockClasses[3] }, periode: "2026-09", jumlah: 500000, tanggal_jatuh_tempo: "2026-09-10", status: "unpaid",  dibuat_pada: "2026-09-01", diperbarui_pada: "2026-09-01" },
  { id: "inv-7",  id_referensi_siswa: "stu-10", siswa: { id: "stu-10", nama_lengkap: "Rina Kusumawati",    id_kelas: "cls-1", kelas: mockClasses[0] }, periode: "2026-09", jumlah: 500000, tanggal_jatuh_tempo: "2026-09-10", status: "overdue", dibuat_pada: "2026-09-01", diperbarui_pada: "2026-09-01" },
  { id: "inv-8",  id_referensi_siswa: "stu-11", siswa: { id: "stu-11", nama_lengkap: "Agus Setiawan",      id_kelas: "cls-3", kelas: mockClasses[2] }, periode: "2026-09", jumlah: 500000, tanggal_jatuh_tempo: "2026-09-10", status: "paid",    dibuat_pada: "2026-09-01", diperbarui_pada: "2026-09-09" },
  { id: "inv-9",  id_referensi_siswa: "stu-12", siswa: { id: "stu-12", nama_lengkap: "Indah Permata Sari", id_kelas: "cls-4", kelas: mockClasses[3] }, periode: "2026-09", jumlah: 500000, tanggal_jatuh_tempo: "2026-09-10", status: "unpaid",  dibuat_pada: "2026-09-01", diperbarui_pada: "2026-09-01" },
];

// ── BOS Funds ─────────────────────────────────────────────────────────────────
export const mockBosFunds: BosFund[] = [
  { id: "bos-1", periode: "2026-01", jumlah_diterima: 75000000, jumlah_dialokasikan: 72000000, catatan_alokasi: "Operasional kelas, buku, ATK",   dibuat_pada: "2026-01-15", diperbarui_pada: "2026-02-01" },
  { id: "bos-2", periode: "2026-04", jumlah_diterima: 80000000, jumlah_dialokasikan: 78500000, catatan_alokasi: "Perbaikan fasilitas, laboratorium", dibuat_pada: "2026-04-15", diperbarui_pada: "2026-05-01" },
  { id: "bos-3", periode: "2026-07", jumlah_diterima: 82000000, jumlah_dialokasikan: 45000000, catatan_alokasi: "Masih berjalan",                   dibuat_pada: "2026-07-15", diperbarui_pada: "2026-09-01" },
];

// ── Employees ─────────────────────────────────────────────────────────────────
export const mockEmployees: Employee[] = [
  { id: "emp-1",  nip: "197801012005011001", nama_lengkap: "Ustadz Ahmad Rifa'i",      jabatan: "Guru Matematika",           jenis_kepegawaian: "tetap",   id_referensi_pengguna: "usr-g1", tanggal_masuk: "2005-07-01", status: "aktif",    dibuat_pada: "2005-07-01", diperbarui_pada: "2026-01-01" },
  { id: "emp-2",  nip: "198203152007012002", nama_lengkap: "Ustadzah Siti Aminah",     jabatan: "Guru Bahasa Indonesia",     jenis_kepegawaian: "tetap",   id_referensi_pengguna: "usr-g2", tanggal_masuk: "2007-07-01", status: "aktif",    dibuat_pada: "2007-07-01", diperbarui_pada: "2026-01-01" },
  { id: "emp-3",  nip: "198506202010011003", nama_lengkap: "Ustadz Fathur Rahman",     jabatan: "Guru IPA",                  jenis_kepegawaian: "tetap",   id_referensi_pengguna: "usr-g3", tanggal_masuk: "2010-07-01", status: "aktif",    dibuat_pada: "2010-07-01", diperbarui_pada: "2026-01-01" },
  { id: "emp-4",  nip: null,                 nama_lengkap: "Ustadzah Hamidah",          jabatan: "Guru Bahasa Inggris",       jenis_kepegawaian: "honorer", id_referensi_pengguna: "usr-g4", tanggal_masuk: "2020-07-01", status: "aktif",    dibuat_pada: "2020-07-01", diperbarui_pada: "2026-01-01" },
  { id: "emp-5",  nip: "199001102015011004", nama_lengkap: "Ustadz Zainuddin",         jabatan: "Guru IPS",                  jenis_kepegawaian: "tetap",   id_referensi_pengguna: "usr-g5", tanggal_masuk: "2015-07-01", status: "aktif",    dibuat_pada: "2015-07-01", diperbarui_pada: "2026-01-01" },
  { id: "emp-6",  nip: "197512051998011005", nama_lengkap: "Bapak Sudirman",           jabatan: "Kepala Tata Usaha",         jenis_kepegawaian: "tetap",   id_referensi_pengguna: "usr-g6", tanggal_masuk: "1998-07-01", status: "aktif",    dibuat_pada: "1998-07-01", diperbarui_pada: "2026-01-01" },
  { id: "emp-7",  nip: null,                 nama_lengkap: "Ibu Ratna Dewi",            jabatan: "Staf Administrasi Keuangan",jenis_kepegawaian: "honorer", id_referensi_pengguna: "usr-g7", tanggal_masuk: "2022-01-03", status: "aktif",    dibuat_pada: "2022-01-03", diperbarui_pada: "2026-01-01" },
  { id: "emp-8",  nip: "198808282012011006", nama_lengkap: "Ustadz Habiburrahman",     jabatan: "Guru Tahfidz",              jenis_kepegawaian: "tetap",   id_referensi_pengguna: "usr-g8", tanggal_masuk: "2012-07-01", status: "aktif",    dibuat_pada: "2012-07-01", diperbarui_pada: "2026-01-01" },
  { id: "emp-9",  nip: "198302112008012007", nama_lengkap: "Ustadzah Maryam Zahra",    jabatan: "Guru Fikih",                jenis_kepegawaian: "tetap",   id_referensi_pengguna: "usr-g9", tanggal_masuk: "2008-07-01", status: "nonaktif", dibuat_pada: "2008-07-01", diperbarui_pada: "2025-06-30" },
];

// ── Payrolls ──────────────────────────────────────────────────────────────────
const payrollItems1: PayrollItem[] = [
  { id: "pi-1", id_penggajian: "pay-1", jenis_komponen: "allowance", nama_komponen: "Tunjangan Transport",  jumlah: 300000 },
  { id: "pi-2", id_penggajian: "pay-1", jenis_komponen: "allowance", nama_komponen: "Tunjangan Makan",      jumlah: 200000 },
  { id: "pi-3", id_penggajian: "pay-1", jenis_komponen: "deduction", nama_komponen: "BPJS Kesehatan",       jumlah: 100000 },
  { id: "pi-4", id_penggajian: "pay-1", jenis_komponen: "deduction", nama_komponen: "BPJS Ketenagakerjaan", jumlah: 75000  },
];
export const mockPayrolls: Payroll[] = [
  { id: "pay-1", id_referensi_pegawai: "emp-1", pegawai: { id: "emp-1", nama_lengkap: "Ustadz Ahmad Rifa'i",   jabatan: "Guru Matematika" },           periode: "2026-09", gaji_pokok: 4500000, total_tunjangan: 500000, total_potongan: 175000, gaji_bersih: 4825000, status: "draft", dibayar_pada: null, items: payrollItems1, dibuat_pada: "2026-09-01", diperbarui_pada: "2026-09-01" },
  { id: "pay-2", id_referensi_pegawai: "emp-2", pegawai: { id: "emp-2", nama_lengkap: "Ustadzah Siti Aminah",  jabatan: "Guru Bahasa Indonesia" },      periode: "2026-09", gaji_pokok: 4200000, total_tunjangan: 500000, total_potongan: 175000, gaji_bersih: 4525000, status: "paid",  dibayar_pada: "2026-09-20", dibuat_pada: "2026-09-01", diperbarui_pada: "2026-09-20" },
  { id: "pay-3", id_referensi_pegawai: "emp-3", pegawai: { id: "emp-3", nama_lengkap: "Ustadz Fathur Rahman",  jabatan: "Guru IPA" },                   periode: "2026-09", gaji_pokok: 4000000, total_tunjangan: 500000, total_potongan: 175000, gaji_bersih: 4325000, status: "draft", dibayar_pada: null,           dibuat_pada: "2026-09-01", diperbarui_pada: "2026-09-01" },
  { id: "pay-4", id_referensi_pegawai: "emp-4", pegawai: { id: "emp-4", nama_lengkap: "Ustadzah Hamidah",      jabatan: "Guru Bahasa Inggris" },        periode: "2026-09", gaji_pokok: 2500000, total_tunjangan: 300000, total_potongan: 0,      gaji_bersih: 2800000, status: "paid",  dibayar_pada: "2026-09-20", dibuat_pada: "2026-09-01", diperbarui_pada: "2026-09-20" },
  { id: "pay-5", id_referensi_pegawai: "emp-5", pegawai: { id: "emp-5", nama_lengkap: "Ustadz Zainuddin",      jabatan: "Guru IPS" },                   periode: "2026-09", gaji_pokok: 4000000, total_tunjangan: 500000, total_potongan: 175000, gaji_bersih: 4325000, status: "draft", dibayar_pada: null,           dibuat_pada: "2026-09-01", diperbarui_pada: "2026-09-01" },
  { id: "pay-6", id_referensi_pegawai: "emp-6", pegawai: { id: "emp-6", nama_lengkap: "Bapak Sudirman",        jabatan: "Kepala Tata Usaha" },          periode: "2026-09", gaji_pokok: 5000000, total_tunjangan: 600000, total_potongan: 200000, gaji_bersih: 5400000, status: "paid",  dibayar_pada: "2026-09-20", dibuat_pada: "2026-09-01", diperbarui_pada: "2026-09-20" },
];

// ── Employee Attendances ───────────────────────────────────────────────────────
export const mockEmployeeAttendances: EmployeeAttendance[] = [
  { id: "ea-1", id_pegawai: "emp-1", pegawai: { id: "emp-1", nama_lengkap: "Ustadz Ahmad Rifa'i",   jabatan: "Guru Matematika"           }, tanggal: today, jam_masuk: "07:15", jam_keluar: "15:00", status: "hadir", dibuat_pada: today },
  { id: "ea-2", id_pegawai: "emp-2", pegawai: { id: "emp-2", nama_lengkap: "Ustadzah Siti Aminah",  jabatan: "Guru Bahasa Indonesia"     }, tanggal: today, jam_masuk: "07:30", jam_keluar: "15:00", status: "hadir", dibuat_pada: today },
  { id: "ea-3", id_pegawai: "emp-3", pegawai: { id: "emp-3", nama_lengkap: "Ustadz Fathur Rahman",  jabatan: "Guru IPA"                  }, tanggal: today, jam_masuk: null,    jam_keluar: null,    status: "sakit", dibuat_pada: today },
  { id: "ea-4", id_pegawai: "emp-4", pegawai: { id: "emp-4", nama_lengkap: "Ustadzah Hamidah",      jabatan: "Guru Bahasa Inggris"       }, tanggal: today, jam_masuk: "07:20", jam_keluar: "15:00", status: "hadir", dibuat_pada: today },
  { id: "ea-5", id_pegawai: "emp-5", pegawai: { id: "emp-5", nama_lengkap: "Ustadz Zainuddin",      jabatan: "Guru IPS"                  }, tanggal: today, jam_masuk: null,    jam_keluar: null,    status: "izin",  dibuat_pada: today },
  { id: "ea-6", id_pegawai: "emp-6", pegawai: { id: "emp-6", nama_lengkap: "Bapak Sudirman",        jabatan: "Kepala Tata Usaha"         }, tanggal: today, jam_masuk: "07:05", jam_keluar: "15:00", status: "hadir", dibuat_pada: today },
  { id: "ea-7", id_pegawai: "emp-7", pegawai: { id: "emp-7", nama_lengkap: "Ibu Ratna Dewi",        jabatan: "Staf Administrasi Keuangan"}, tanggal: today, jam_masuk: "07:45", jam_keluar: null,    status: "hadir", dibuat_pada: today },
  { id: "ea-8", id_pegawai: "emp-8", pegawai: { id: "emp-8", nama_lengkap: "Ustadz Habiburrahman",  jabatan: "Guru Tahfidz"              }, tanggal: today, jam_masuk: "07:10", jam_keluar: "15:00", status: "hadir", dibuat_pada: today },
];

// ── Leave Requests ─────────────────────────────────────────────────────────────
export const mockLeaveRequests: LeaveRequest[] = [
  { id: "lv-1", id_pegawai: "emp-3", pegawai: { id: "emp-3", nama_lengkap: "Ustadz Fathur Rahman",  jabatan: "Guru IPA"  }, jenis: "sakit", tanggal_mulai: "2026-09-21", tanggal_selesai: "2026-09-22", alasan: "Demam tinggi, perlu istirahat", status: "approved", id_referensi_penyetuju: "emp-6", dibuat_pada: "2026-09-21", diperbarui_pada: "2026-09-21" },
  { id: "lv-2", id_pegawai: "emp-5", pegawai: { id: "emp-5", nama_lengkap: "Ustadz Zainuddin",      jabatan: "Guru IPS"  }, jenis: "izin",  tanggal_mulai: "2026-09-21", tanggal_selesai: "2026-09-21", alasan: "Keperluan keluarga mendesak",   status: "pending",  id_referensi_penyetuju: null,     dibuat_pada: "2026-09-20", diperbarui_pada: "2026-09-20" },
  { id: "lv-3", id_pegawai: "emp-7", pegawai: { id: "emp-7", nama_lengkap: "Ibu Ratna Dewi",        jabatan: "Staf Adm." }, jenis: "cuti",  tanggal_mulai: "2026-10-01", tanggal_selesai: "2026-10-07", alasan: "Cuti tahunan",                  status: "pending",  id_referensi_penyetuju: null,     dibuat_pada: "2026-09-18", diperbarui_pada: "2026-09-18" },
  { id: "lv-4", id_pegawai: "emp-4", pegawai: { id: "emp-4", nama_lengkap: "Ustadzah Hamidah",      jabatan: "Guru B.Ing"}, jenis: "izin",  tanggal_mulai: "2026-09-15", tanggal_selesai: "2026-09-15", alasan: "Urusan BPJS",                   status: "approved", id_referensi_penyetuju: "emp-6", dibuat_pada: "2026-09-14", diperbarui_pada: "2026-09-14" },
  { id: "lv-5", id_pegawai: "emp-2", pegawai: { id: "emp-2", nama_lengkap: "Ustadzah Siti Aminah",  jabatan: "Guru B.Ind"}, jenis: "cuti",  tanggal_mulai: "2026-08-10", tanggal_selesai: "2026-08-14", alasan: "Cuti melahirkan",               status: "rejected", id_referensi_penyetuju: "emp-6", dibuat_pada: "2026-08-01", diperbarui_pada: "2026-08-02" },
];

// ── Mock Users (for auth) ─────────────────────────────────────────────────────
export const mockUsers: User[] = [
  { id: "usr-admin",  nama_pengguna: "admin",    email: "admin@pesantren.id",    id_peran: "role-admin",    role: "admin",    jenis_referensi: "none",     id_referensi: null,    aktif: true, dibuat_pada: "2024-01-01" },
  { id: "usr-g1",     nama_pengguna: "arifa",    email: "arifa@pesantren.id",    id_peran: "role-guru",     role: "guru",     jenis_referensi: "employee", id_referensi: "emp-1", aktif: true, dibuat_pada: "2024-01-01" },
  { id: "usr-keu",    nama_pengguna: "keuangan", email: "keuangan@pesantren.id", id_peran: "role-keuangan", role: "keuangan", jenis_referensi: "employee", id_referensi: "emp-7", aktif: true, dibuat_pada: "2024-01-01" },
  { id: "usr-hris",   nama_pengguna: "hris",     email: "hris@pesantren.id",     id_peran: "role-hris",     role: "hris",     jenis_referensi: "employee", id_referensi: "emp-6", aktif: true, dibuat_pada: "2024-01-01" },
  { id: "usr-o1",     nama_pengguna: "ortu_stu1",email: "hadi@mail.com",         id_peran: "role-ortu",     role: "ortu",     jenis_referensi: "parent",   id_referensi: "stu-1", aktif: true, dibuat_pada: "2024-07-15" },
];

// Credential mock untuk login (username → role mapping)
export const MOCK_CREDENTIALS: Record<string, { password: string; userId: string }> = {
  "admin":    { password: "admin123",    userId: "usr-admin" },
  "arifa":    { password: "guru123",     userId: "usr-g1"    },
  "keuangan": { password: "keuangan123", userId: "usr-keu"   },
  "hris":     { password: "hris123",     userId: "usr-hris"  },
  "ortu_stu1":{ password: "ortu123",     userId: "usr-o1"    },
};
