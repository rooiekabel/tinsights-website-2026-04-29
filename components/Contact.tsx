"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Contact() {
  return (
    <section id="contact" className="relative mx-auto w-full max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-12 shadow-[0_24px_60px_-34px_rgba(15,23,42,0.35)] sm:px-10 sm:py-14 lg:px-14"
      >
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.25),transparent_70%)] blur-2xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.2),transparent_70%)] blur-2xl"
          aria-hidden
        />

        <div className="relative max-w-2xl">
          <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Laten we praten</h2>
          <p className="mt-3 text-base text-slate-700 sm:text-lg">
            Een vraag, een offerte, of hulp met domein of hosting: stuur een korte mail — we reageren
            doorgaans binnen één werkdag.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="mailto:info@tinsights.nl"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-sky-500 px-7 text-sm font-semibold text-white transition-all duration-200 hover:shadow-[0_12px_30px_-12px_rgba(79,70,229,0.55)] active:scale-[0.99]"
            >
              Mail: info@tinsights.nl
            </Link>
            <span className="text-sm text-slate-500">
              Project? Voeg best je site of idee in het onderwerp toe.
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
