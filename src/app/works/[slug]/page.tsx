import { notFound } from "next/navigation";
import Link from "next/link";
import { works } from "@/data/works";
import WorkPreview from "@/components/WorkPreview";

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  return work
    ? { title: `${work.title} — 有田の成長記録` }
    : { title: "Not Found" };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) notFound();

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[860px] px-5 py-12">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1 font-mono text-sm text-ink2 transition-colors hover:text-accent"
        >
          ← Back
        </Link>

        <div className="mb-6">
          <span className="mb-2 inline-block font-mono text-xs uppercase tracking-wider text-accent">
            {work.category}
          </span>
          <h1 className="mb-3 text-3xl font-bold text-ink">{work.title}</h1>
          <p className="text-base leading-relaxed text-ink2">
            {work.description}
          </p>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line bg-surface-solid/50 px-3 py-1 font-mono text-xs text-ink2"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mb-8">
          <a
            href={work.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-sm text-accent transition-colors hover:text-accent2"
          >
            サイトを見る ↗
          </a>
        </div>

        <div className="mb-10">
          <WorkPreview url={work.url} title={work.title} />
        </div>

        <div className="rounded-2xl border border-line bg-surface p-6 backdrop-blur-xl">
          <h2 className="mb-4 text-lg font-semibold text-ink">学んだこと</h2>
          <ul className="flex flex-col gap-2">
            {work.learnings.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-ink2"
              >
                <span className="mt-1 text-accent">▸</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
