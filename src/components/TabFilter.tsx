"use client";

import { cn } from "@/lib/utils";
import type { Category } from "@/data/works";

export default function TabFilter({
  categories,
  active,
  onChange,
}: {
  categories: readonly string[];
  active: Category;
  onChange: (cat: Category) => void;
}) {
  return (
    <div className="flex gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat as Category)}
          className={cn(
            "rounded-full border px-4 py-1.5 font-mono text-xs transition-all duration-200",
            active === cat
              ? "border-accent bg-accent/10 text-ink"
              : "border-line text-ink3 hover:border-ink2 hover:text-ink2"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
