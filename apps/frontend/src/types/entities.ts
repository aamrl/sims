// ─── Entity types mengikuti skema-database.md ─────────────────────────────────

// ── db_auth ───────────────────────────────────────────────────────────────────

export type UserRole = "admin" | "guru" | "keuangan" | "hris" | "ortu" | "siswa";

export interface User {
  id: string;
  nama_pengguna: string;
  email: string;
  id_peran: string;
  role: UserRole; // derived dari join dengan roles
  jenis_referensi: "student" | "employee" | "parent" | "none" | null;
  id_referensi: string | null;
  aktif: boolean;
  dibuat_pada: string;
}

// ── db_akademik ───────────────────────────────────────────────────────────────

export type StudentStatus = "aktif" | "lulus" | "pindah" | "keluar";

export interface Student {
  id: string;
  nisn: string | null;
  nik: string;
  nama_lengkap: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: "L" | "P";
  alamat: string;
  id_referensi_pengguna_ortu: string | null;
  id_kelas: string;
  kelas?: Class; // join
  status: StudentStatus;
  tanggal_masuk: string;
  dibuat_pada: string;
  diperbarui_pada: string;
}

export interface Class {
  id: string;
  nama: string;
  tingkat_kelas: string;
  tahun_ajaran: string;
  id_referensi_guru_wali: string | null;
}

export interface Subject {
  id: string;
  nama: string;
  kode: string;
}

export type NilaiJenis = "UH" | "UTS" | "UAS" | "tugas";

export interface Grade {
  id: string;
  id_siswa: string;
  id_mata_pelajaran: string;
  mata_pelajaran?: Subject;
  semester: "Ganjil" | "Genap";
  tahun_ajaran: string;
  nilai: number;
  jenis_nilai: NilaiJenis;
  id_referensi_penginput: string;
  dibuat_pada: string;
}

export type AttendanceStatus = "hadir" | "sakit" | "izin" | "alpa";

export interface Attendance {
  id: string;
  id_siswa: string;
  siswa?: Student;
  id_kelas: string;
  tanggal: string;
  status: AttendanceStatus;
  id_referensi_pencatat: string;
  dibuat_pada: string;
}

export interface DisciplineRecord {
  id: string;
  id_siswa: string;
  siswa?: Student;
  deskripsi_pelanggaran: string;
  poin: number;
  tindak_lanjut: string | null;
  id_referensi_pencatat: string;
  dicatat_pada: string;
  dibuat_pada: string;
}

export type PpdbStatus = "submitted" | "verified" | "selected" | "rejected" | "accepted";

export interface PpdbApplicant {
  id: string;
  nama_lengkap: string;
  nik: string;
  tanggal_lahir: string;
  nama_orang_tua: string;
  kontak_orang_tua: string;
  nomor_pendaftaran: string;
  status: PpdbStatus;
  dokumen?: PpdbDocument[];
  hasil_seleksi?: PpdbSelectionResult;
  dibuat_pada: string;
  diperbarui_pada: string;
}

export interface PpdbDocument {
  id: string;
  id_pendaftar: string;
  jenis_dokumen: string;
  lokasi_berkas: string;
  terverifikasi: boolean;
  id_referensi_verifikator: string | null;
  dibuat_pada: string;
}

export interface PpdbSelectionResult {
  id: string;
  id_pendaftar: string;
  nilai: number | null;
  hasil: "diterima" | "tidak diterima";
  diumumkan_pada: string;
  dibuat_pada: string;
}

// ── db_keuangan ───────────────────────────────────────────────────────────────

export type InvoiceStatus = "unpaid" | "partial" | "paid" | "overdue";

export interface Invoice {
  id: string;
  id_referensi_siswa: string;
  siswa?: Pick<Student, "id" | "nama_lengkap" | "id_kelas" | "kelas">;
  periode: string; // YYYY-MM
  jumlah: number;
  tanggal_jatuh_tempo: string;
  status: InvoiceStatus;
  payments?: Payment[];
  dibuat_pada: string;
  diperbarui_pada: string;
}

export interface Payment {
  id: string;
  id_tagihan: string;
  jumlah: number;
  metode: "manual" | "transfer" | "gateway";
  referensi_gateway: string | null;
  dibayar_pada: string;
  id_referensi_pencatat: string | null;
  dibuat_pada: string;
}

export interface BosFund {
  id: string;
  periode: string;
  jumlah_diterima: number;
  jumlah_dialokasikan: number;
  catatan_alokasi: string | null;
  dibuat_pada: string;
  diperbarui_pada: string;
}

export type PayrollStatus = "draft" | "paid";

export interface Payroll {
  id: string;
  id_referensi_pegawai: string;
  pegawai?: Pick<Employee, "id" | "nama_lengkap" | "jabatan">;
  periode: string;
  gaji_pokok: number;
  total_tunjangan: number;
  total_potongan: number;
  gaji_bersih: number;
  status: PayrollStatus;
  dibayar_pada: string | null;
  items?: PayrollItem[];
  dibuat_pada: string;
  diperbarui_pada: string;
}

export interface PayrollItem {
  id: string;
  id_penggajian: string;
  jenis_komponen: "allowance" | "deduction";
  nama_komponen: string;
  jumlah: number;
}

// ── db_hris ───────────────────────────────────────────────────────────────────

export type EmployeeStatus = "aktif" | "nonaktif";
export type EmployeeType = "tetap" | "honorer";

export interface Employee {
  id: string;
  nip: string | null;
  nama_lengkap: string;
  jabatan: string;
  jenis_kepegawaian: EmployeeType;
  id_referensi_pengguna: string | null;
  tanggal_masuk: string;
  status: EmployeeStatus;
  dibuat_pada: string;
  diperbarui_pada: string;
}

export type EmployeeAttendanceStatus = "hadir" | "izin" | "sakit" | "alpa";

export interface EmployeeAttendance {
  id: string;
  id_pegawai: string;
  pegawai?: Pick<Employee, "id" | "nama_lengkap" | "jabatan">;
  tanggal: string;
  jam_masuk: string | null;
  jam_keluar: string | null;
  status: EmployeeAttendanceStatus;
  dibuat_pada: string;
}

export type LeaveStatus = "pending" | "approved" | "rejected";
export type LeaveJenis = "cuti" | "izin" | "sakit";

export interface LeaveRequest {
  id: string;
  id_pegawai: string;
  pegawai?: Pick<Employee, "id" | "nama_lengkap" | "jabatan">;
  jenis: LeaveJenis;
  tanggal_mulai: string;
  tanggal_selesai: string;
  alasan: string | null;
  status: LeaveStatus;
  id_referensi_penyetuju: string | null;
  dibuat_pada: string;
  diperbarui_pada: string;
}
