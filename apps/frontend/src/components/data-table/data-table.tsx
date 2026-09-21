"use client";

import React, { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: string;
  header: string;
  className?: string;
  render?: (item: T, index: number) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchFilter?: (item: T, query: string) => boolean;
  pageSize?: number;
  emptyMessage?: string;
  selectedId?: string | null;
  onRowClick?: (item: T) => void;
  actions?: React.ReactNode;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  searchable = true,
  searchPlaceholder = "Cari data...",
  searchFilter,
  pageSize = 10,
  emptyMessage = "Tidak ada data yang ditemukan",
  selectedId,
  onRowClick,
  actions,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    if (!searchQuery.trim() || !searchFilter) return data;
    return data.filter((item) => searchFilter(item, searchQuery.toLowerCase()));
  }, [data, searchQuery, searchFilter]);

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Search & Actions Bar */}
      {(searchable || actions) && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {searchable ? (
            <div className="relative flex-1 max-w-sm">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500"
                aria-hidden="true"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={searchPlaceholder}
                className="w-full pl-9 pr-4 py-2 text-sm bg-neutral-0 border border-neutral-450 rounded placeholder:text-neutral-500 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-600 transition"
              />
            </div>
          ) : (
            <div />
          )}
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}

      {/* Table Surface */}
      <div className="bg-neutral-0 rounded-lg border border-neutral-200 overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-900 border-collapse">
            <thead>
              <tr className="border-b border-neutral-300 bg-neutral-25 text-xs font-semibold text-neutral-600">
                {columns.map((col) => (
                  <th key={col.key} className={cn("px-4 py-3 whitespace-nowrap", col.className)}>
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-8 text-center text-neutral-500 text-sm"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                paginatedData.map((item, index) => {
                  const id = keyExtractor(item);
                  const isSelected = selectedId === id;
                  return (
                    <tr
                      key={id}
                      onClick={() => onRowClick?.(item)}
                      className={cn(
                        "transition-colors",
                        onRowClick && "cursor-pointer",
                        isSelected ? "bg-primary-50" : "hover:bg-neutral-100"
                      )}
                    >
                      {columns.map((col) => (
                        <td key={col.key} className={cn("px-4 py-3.5", col.className)}>
                          {col.render
                            ? col.render(item, (currentPage - 1) * pageSize + index)
                            : (item as any)[col.key]}
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-neutral-200 bg-neutral-25 text-xs text-neutral-600">
          <div>
            Menampilkan{" "}
            <span className="font-semibold text-neutral-900">
              {filteredData.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}
            </span>{" "}
            -{" "}
            <span className="font-semibold text-neutral-900">
              {Math.min(currentPage * pageSize, filteredData.length)}
            </span>{" "}
            dari <span className="font-semibold text-neutral-900">{filteredData.length}</span> data
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              title="Halaman pertama"
              className="p-1.5 rounded border border-neutral-200 bg-neutral-0 text-neutral-600 hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              title="Halaman sebelumnya"
              className="p-1.5 rounded border border-neutral-200 bg-neutral-0 text-neutral-600 hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <span className="px-3 py-1 font-medium text-neutral-900">
              Halaman {currentPage} dari {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              title="Halaman berikutnya"
              className="p-1.5 rounded border border-neutral-200 bg-neutral-0 text-neutral-600 hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              title="Halaman terakhir"
              className="p-1.5 rounded border border-neutral-200 bg-neutral-0 text-neutral-600 hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronsRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
