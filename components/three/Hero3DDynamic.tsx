"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const Hero3DCanvas = dynamic(() => import("./Hero3DCanvas"), { ssr: false });

function Skeleton() {
  return (
    <div
      className="flex h-[min(52vh,420px)] w-full min-h-[280px] items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent sm:h-[440px] lg:min-h-[400px]"
      aria-hidden
    >
      <div className="h-20 w-20 animate-pulse rounded-2xl bg-gradient-to-tr from-violet-600/20 to-sky-500/20" />
    </div>
  );
}

export default function Hero3DDynamic() {
  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-gradient-to-b from-violet-500/15 via-transparent to-sky-500/10 blur-xl" />
      <div className="relative rounded-2xl border border-white/10 bg-[#0a0a0a]/40 p-1 shadow-[0_0_60px_-10px_rgba(124,58,237,0.35)] backdrop-blur-sm">
        <Suspense fallback={<Skeleton />}>
          <Hero3DCanvas />
        </Suspense>
      </div>
      <p className="mt-3 text-center text-xs text-white/45 sm:text-left">
        Moderne stack — snelheid, design en techniek in balans
      </p>
    </div>
  );
}
