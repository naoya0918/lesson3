import Link from "next/link";
import type { Work } from "@/data/works";

export default function WorkCard({ work }: { work: Work }) {
  return (
    <Link
      href={`/works/${work.slug}`}
      className="group flex gap-6 rounded-2xl border border-line bg-surface p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-line-hover hover:shadow-[0_30px_80px_rgba(0,0,0,0.75)]"
    >
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <span className="mb-1 font-mono text-xs uppercase tracking-wider text-accent">
          {work.category}
        </span>
        <h3 className="mb-2 text-lg font-semibold leading-snug text-ink">
          {work.title}
        </h3>
        <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-ink2">
          {work.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line bg-surface-solid/50 px-2.5 py-0.5 font-mono text-xs text-ink2"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="relative hidden h-[120px] w-[200px] shrink-0 overflow-hidden rounded-lg border border-line sm:block">
        <iframe
          src={work.url}
          width="1280"
          height="800"
          className="pointer-events-none origin-top-left scale-[0.156]"
          tabIndex={-1}
          loading="lazy"
          title={`${work.title} preview`}
        />
      </div>
    </Link>
  );
}
