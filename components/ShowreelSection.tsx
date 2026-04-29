"use client";

import { motion } from "framer-motion";

/**
 * Korte showreel / sfeervideo (tutorial.mp4) — professioneel ingelijst.
 */
export default function ShowreelSection() {
  return (
    <section
      className="relative mx-auto w-full max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="showreel-heading"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-4xl text-center"
      >
        <h2 id="showreel-heading" className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Sfeerimpressie
        </h2>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          Een korte blik achter de schermen — motion, details en afwerking zoals we die aanpakken.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
        className="relative mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_70px_-34px_rgba(15,23,42,0.35)] sm:rounded-3xl"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" aria-hidden />
        <video
          className="aspect-video w-full object-cover"
          src="/assets/tutorial.mp4"
          controls
          playsInline
          preload="metadata"
          poster="/assets/mockup-4.png"
        >
          Je browser ondersteunt geen video. Bekijk de site op een moderne browser.
        </video>
      </motion.div>
    </section>
  );
}
