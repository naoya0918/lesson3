import { notFound } from "next/navigation";
import Link from "next/link";
import { works } from "@/data/works";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
      <Header />
      <div className="mx-auto max-w-[860px] px-5 pb-16">
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
              className="rounded-full border border-accent2/8 bg-bg/80 px-3 py-1 font-mono text-xs text-accent2/60"
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
            className="inline-flex items-center gap-1 font-mono text-sm text-accent2 transition-colors hover:text-accent"
          >
            サイトを見る ↗
          </a>
        </div>

        <div className="mb-10">
          <WorkPreview url={work.url} title={work.title} />
        </div>

        <div className="rounded-2xl border border-line bg-surface p-6 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <h2 className="mb-4 text-lg font-semibold text-ink">学んだこと</h2>
          <ul className="flex flex-col gap-2">
            {work.learnings.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-ink2"
              >
                <span className="mt-1 text-accent2">▸</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}
