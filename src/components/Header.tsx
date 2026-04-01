export default function Header() {
  return (
    <header className="mx-auto max-w-[860px] px-5 pt-12 pb-8">
      <div className="flex items-baseline gap-2">
        <h1 className="text-xl font-semibold tracking-tight text-ink">
          有田の成長記録
        </h1>
        <span className="font-mono text-xs text-accent">Portfolio</span>
      </div>
      <p className="mt-1 text-sm text-ink2">
        3ヶ月で独立する男のポートフォリオ
      </p>
    </header>
  );
}
