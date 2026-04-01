import Link from "next/link";
import type { Work } from "@/data/works";

export default function WorkCard({ work }: { work: Work }) {
  return (
    <Link
      href={`/works/${work.slug}`}
      className="group relative flex gap-6 rounded-2xl border border-line bg-surface p-5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1.5 hover:border-line-hover hover:shadow-[0_16px_48px_rgba(0,0,0,0.6)]"
    >
      {/* Corner brackets - visible on hover */}
      <span className="pointer-events-none absolute top-2 left-2 h-2.5 w-2.5 border-t border-l border-accent2/0 transition-all duration-500 group-hover:border-accent2/30" />
      <span className="pointer-events-none absolute top-2 right-2 h-2.5 w-2.5 border-t border-r border-accent2/0 transition-all duration-500 group-hover:border-accent2/30" />
      <span className="pointer-events-none absolute bottom-2 left-2 h-2.5 w-2.5 border-b border-l border-accent2/0 transition-all duration-500 group-hover:border-accent2/30" />
      <span className="pointer-events-none absolute bottom-2 right-2 h-2.5 w-2.5 border-b border-r border-accent2/0 transition-all duration-500 group-hover:border-accent2/30" />

      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <span className="mb-1 font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
          {work.category}
        </span>
        <h3 className="mb-2 text-[15px] font-semibold leading-snug text-ink">
          {work.title}
        </h3>
        <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-ink2">
          {work.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-accent2/8 bg-bg/80 px-2 py-0.5 font-mono text-[10px] text-accent2/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="relative hidden h-[75px] w-[120px] shrink-0 overflow-hidden rounded-[10px] border border-line bg-gradient-to-br from-accent/[0.06] via-accent2/[0.06] to-navy/40 shadow-[0_4px_16px_rgba(0,0,0,0.3)] sm:block">
        <iframe
          src={work.url}
          width="1280"
          height="800"
          className="pointer-events-none origin-top-left scale-[0.094]"
          tabIndex={-1}
          loading="lazy"
          title={`${work.title} preview`}
        />
      </div>
    </Link>
  );
}
