"use client";

export default function BackgroundDecor() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Line grid pattern with radial fade */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,168,83,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,83,0.07) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 40%, transparent 20%, #050816 75%)",
        }}
      />

      {/* Glow orb — gold, top-left */}
      <div
        className="absolute top-[10%] left-[8%] h-[340px] w-[340px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(212,168,83,0.14) 0%, transparent 70%)",
          animation: "pulse-glow 4s ease-in-out infinite",
        }}
      />

      {/* Glow orb — orange, bottom-right */}
      <div
        className="absolute bottom-[15%] right-[5%] h-[280px] w-[280px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(249,115,22,0.10) 0%, transparent 70%)",
          animation: "pulse-glow 4s ease-in-out infinite 2s",
        }}
      />

      {/* Vertical gradient line — right side */}
      <div
        className="absolute top-[18%] right-[4%] h-[80px] w-[2px]"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(212,168,83,0.4), transparent)",
          animation: "float-slow 8s ease-in-out infinite",
        }}
      />

      {/* Vertical gradient line — left side */}
      <div
        className="absolute top-[55%] left-[6%] h-[60px] w-[1px]"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(212,168,83,0.3), transparent)",
          animation: "float-slow 8s ease-in-out infinite 3s",
        }}
      />

      {/* Floating rotated square — large */}
      <div
        className="absolute bottom-[30%] left-[12%] h-14 w-14 rotate-45 border border-[rgba(212,168,83,0.20)]"
        style={{ animation: "float-slower 12s ease-in-out infinite" }}
      />

      {/* Floating rotated square — small */}
      <div
        className="absolute top-[40%] right-[10%] h-8 w-8 rotate-45 border border-[rgba(212,168,83,0.15)]"
        style={{ animation: "float-slower 12s ease-in-out infinite 4s" }}
      />

      {/* Floating dot — gold */}
      <div
        className="absolute top-[30%] left-[22%] h-2 w-2 rounded-full bg-[rgba(212,168,83,0.30)]"
        style={{ animation: "float-slow 8s ease-in-out infinite 1s" }}
      />

      {/* Floating dot — orange */}
      <div
        className="absolute top-[65%] right-[18%] h-1.5 w-1.5 rounded-full bg-[rgba(249,115,22,0.25)]"
        style={{ animation: "float-slow 8s ease-in-out infinite 5s" }}
      />
    </div>
  );
}
