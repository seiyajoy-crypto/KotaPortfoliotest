"use client";

import { cn } from "@/lib/utils";

type CategoryTab<T extends string> = { id: T; label: string; count: number };

/**
 * 作品一覧のカテゴリ絞り込みタブ（Illustration / Animation で共通）
 */
export function CategoryTabs<T extends string>({
  tabs,
  value,
  onChange,
  className,
}: {
  tabs: CategoryTab<T>[];
  value: T;
  onChange: (id: T) => void;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      aria-label="Category"
      className={cn("flex flex-wrap gap-2", className)}
    >
      {tabs.map(({ id, label, count }) => (
        <button
          key={id}
          type="button"
          role="tab"
          aria-selected={value === id}
          onClick={() => onChange(id)}
          className={cn(
            "rounded-full border px-4 py-2 text-sm transition-colors",
            value === id
              ? "border-foreground bg-foreground text-background"
              : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
          )}
        >
          {label}
          <span className="ml-2 text-xs opacity-60">{count}</span>
        </button>
      ))}
    </div>
  );
}
