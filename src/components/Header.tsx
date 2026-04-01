export default function Header() {
  return (
    <header className="relative mx-auto max-w-[860px] px-5 pt-12 pb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent2 text-xs font-bold text-bg shadow-[0_0_24px_rgba(249,115,22,0.2)]">
          A
        </div>
        <h1 className="text-base font-semibold tracking-tight text-ink">
          有田の成長記録
        </h1>
      </div>
      <p className="font-mono text-xs tracking-[0.12em] text-accent2/50">
        PORTFOLIO — 2026
      </p>
    </header>
  );
}
