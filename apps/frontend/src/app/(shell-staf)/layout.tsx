import React from "react";
import { Sidebar } from "@/components/layout/sidebar";

export default function ShellStafLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-neutral-25 overflow-hidden">
      {/* Sidebar Staf */}
      <Sidebar userName="Ustadz Abdullah" userRole="Administrator" />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
