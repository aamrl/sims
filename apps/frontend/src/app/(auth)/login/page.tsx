"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, Lock, Mail, ArrowRight, ShieldCheck, UserCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("admin@sims.sch.id");
  const [password, setPassword] = useState("password123");
  const [selectedRole, setSelectedRole] = useState<"staff" | "parent">("staff");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (selectedRole === "parent") {
        router.push("/portal-ortu/dashboard");
      } else {
        router.push("/dashboard");
      }
    }, 600);
  };

  const handleQuickLogin = (role: "admin" | "guru" | "keuangan" | "ortu") => {
    if (role === "ortu") {
      setIdentifier("ahmad.dahlan@email.com");
      setSelectedRole("parent");
      router.push("/portal-ortu/dashboard");
    } else {
      setSelectedRole("staff");
      if (role === "admin") setIdentifier("admin@sims.sch.id");
      if (role === "guru") setIdentifier("budi.santoso@sims.sch.id");
      if (role === "keuangan") setIdentifier("siti.aminah@sims.sch.id");
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-neutral-25">
      {/* Background Islamic Geometric / Elegant Ambient */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#1E6146_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-primary-900 border border-accent-300 flex items-center justify-center shadow-lg shadow-primary-900/20">
            <GraduationCap className="h-8 w-8 text-accent-400" />
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-neutral-900">
            SIMS Pesantren
          </h1>
          <p className="mt-1 text-xs text-neutral-600">
            Sistem Informasi Manajemen Sekolah & Pesantren Terpadu
          </p>
        </div>

        {/* Login Card */}
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-neutral-0 py-8 px-6 shadow-card rounded-xl sm:px-10 border border-neutral-200">
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Role Toggle Selector */}
              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-2">
                  Masuk sebagai
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-100 rounded-lg border border-neutral-200">
                  <button
                    type="button"
                    onClick={() => setSelectedRole("staff")}
                    className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium rounded-md transition ${
                      selectedRole === "staff"
                        ? "bg-neutral-0 text-primary-700 shadow-sm font-semibold"
                        : "text-neutral-600 hover:text-neutral-900"
                    }`}
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Staf / Guru
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole("parent")}
                    className={`flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium rounded-md transition ${
                      selectedRole === "parent"
                        ? "bg-neutral-0 text-primary-700 shadow-sm font-semibold"
                        : "text-neutral-600 hover:text-neutral-900"
                    }`}
                  >
                    <UserCheck className="h-4 w-4" />
                    Wali Santri
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="identifier"
                  className="block text-xs font-medium text-neutral-600"
                >
                  Email atau nama pengguna
                </label>
                <div className="mt-1.5 relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                  <input
                    id="identifier"
                    name="identifier"
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="nama@email.com atau username"
                    className="block w-full pl-9 pr-3 py-2 text-sm border border-neutral-450 rounded bg-neutral-0 text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-600"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-xs font-medium text-neutral-600"
                  >
                    Kata sandi
                  </label>
                  <a
                    href="#lupa-password"
                    className="text-xs font-medium text-primary-600 hover:text-primary-700 hover:underline"
                  >
                    Lupa kata sandi?
                  </a>
                </div>
                <div className="mt-1.5 relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full pl-9 pr-3 py-2 text-sm border border-neutral-450 rounded bg-neutral-0 text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-600"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-neutral-450 text-primary-600 focus:ring-primary-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-xs text-neutral-600"
                >
                  Ingat sesi saya
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition disabled:opacity-50"
                >
                  {isLoading ? (
                    <span>Memproses...</span>
                  ) : (
                    <>
                      <span>Masuk ke sistem</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Quick Demo Access Switcher */}
            <div className="mt-6 pt-5 border-t border-neutral-200">
              <p className="text-2xs font-semibold uppercase tracking-wider text-neutral-500 text-center mb-2.5">
                Akses Demo Cepat
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin("admin")}
                  className="px-2.5 py-1.5 text-xs font-medium rounded border border-neutral-200 bg-neutral-25 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-700 text-neutral-600 transition text-center"
                >
                  👑 Admin Staf
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin("guru")}
                  className="px-2.5 py-1.5 text-xs font-medium rounded border border-neutral-200 bg-neutral-25 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-700 text-neutral-600 transition text-center"
                >
                  👨‍🏫 Guru / Asatidz
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin("keuangan")}
                  className="px-2.5 py-1.5 text-xs font-medium rounded border border-neutral-200 bg-neutral-25 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-700 text-neutral-600 transition text-center"
                >
                  💰 Keuangan
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin("ortu")}
                  className="px-2.5 py-1.5 text-xs font-medium rounded border border-neutral-200 bg-neutral-25 hover:bg-accent-50 hover:border-accent-300 hover:text-accent-600 text-neutral-600 transition text-center"
                >
                  👨‍👩‍👧 Wali Santri
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <p className="mt-6 text-center text-xs text-neutral-500">
          SIMS Terpadu © {new Date().getFullYear()} — Dilengkapi Keamanan Terenkripsi
        </p>
      </div>
    </div>
  );
}
