"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center text-xs text-neutral-600 mb-4", className)}>
      <ol className="flex items-center space-x-1.5">
        <li>
          <Link
            href="/dashboard"
            className="flex items-center text-neutral-600 hover:text-primary-600 transition"
            title="Beranda"
          >
            <Home className="h-3.5 w-3.5" />
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={`${item.label}-${index}`}>
              <li>
                <ChevronRight className="h-3.5 w-3.5 text-neutral-400" />
              </li>
              <li>
                {isLast || !item.href ? (
                  <span className="font-medium text-neutral-900" aria-current={isLast ? "page" : undefined}>
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-neutral-600 hover:text-primary-600 transition"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
