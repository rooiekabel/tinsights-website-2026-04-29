"use client";

/**
 * Stille achtergrondvideo in de hero; valt terug op gradient als video niet laadt.
 */
export default function HeroBackgroundVideo() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#f4f7fb]">
      <video
        className="absolute left-1/2 top-1/2 h-full min-h-full w-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-20 sm:opacity-25"
        src="/assets/background.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8fbff]/96 via-[#f5f8fc]/92 to-[#f4f7fb]/98" aria-hidden />
    </div>
  );
}
