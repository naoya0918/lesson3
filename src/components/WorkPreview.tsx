"use client";

import { useEffect, useRef, useState } from "react";

export default function WorkPreview({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateScale = () => {
      setScale(el.clientWidth / 1280);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface-solid">
      <div className="border-b border-line px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-ink3/30" />
            <span className="h-3 w-3 rounded-full bg-ink3/30" />
            <span className="h-3 w-3 rounded-full bg-ink3/30" />
          </div>
          <span className="flex-1 truncate text-center font-mono text-xs text-ink3">
            {url}
          </span>
        </div>
      </div>
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{ height: `${800 * scale}px` }}
      >
        <iframe
          src={url}
          width="1280"
          height="800"
          className="pointer-events-none absolute left-0 top-0 origin-top-left"
          style={{ transform: `scale(${scale})` }}
          tabIndex={-1}
          title={`${title} preview`}
        />
      </div>
    </div>
  );
}
