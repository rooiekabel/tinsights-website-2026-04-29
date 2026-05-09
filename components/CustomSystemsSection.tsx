import SiteIcon from "@/components/SiteIcon";
import Link from "next/link";

const cards = [
  {
    icon: "bi-calendar-event",
    title: "Agenda & boekingen",
    body: "Online afspraken, beschikbaarheid en herinneringen — gekoppeld aan je agenda.",
  },
  {
    icon: "bi-database",
    title: "Database & zoeken",
    body: "Producten, leden of orders netjes opgeslagen. Snel zoeken en filteren.",
  },
  {
    icon: "bi-box-arrow-in-right",
    title: "Klantenportaal",
    body: "Inloggen, documenten bekijken, status volgen — veilig en overzichtelijk.",
  },
  {
    icon: "bi-plugin",
    title: "API-koppelingen",
    body: "Koppel met CRM, boekhouding, mailing of betaalproviders.",
  },
  {
    icon: "bi-lightning-charge",
    title: "Automatisering",
    body: "Minder handwerk: triggers, mails en acties op het juiste moment.",
  },
  {
    icon: "bi-speedometer2",
    title: "Dashboard & admin",
    body: "Eigen beheerscherm: cijfers, orders of content bijhouden.",
  },
] as const;

export default function CustomSystemsSection() {
  return (
    <section
      id="maatwerk-systemen"
      className="scroll-mt-20 border-y border-slate-200 bg-slate-50"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-indigo-500">
            Maatwerk
          </p>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Werkende systemen op jouw site
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-slate-600 sm:text-base">
            Van agenda en database tot koppelingen en automatisering — wij bouwen het door elkaar heen.
          </p>
        </div>

        <div className="mt-8 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:snap-none lg:grid-cols-3">
          {cards.map((card, index) => (
            <article
              key={card.title}
              className={`min-h-[176px] shrink-0 rounded-2xl border border-slate-200 bg-white p-5 ${
                index === 0 ? "w-[min(82vw,300px)] snap-start" : "w-[min(82vw,300px)] snap-center"
              } md:w-auto md:shrink`}
            >
              <SiteIcon bootstrap={`bi ${card.icon}`} className="text-indigo-600" size={20} />
              <h3 className="mt-3 text-base font-semibold text-slate-900">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{card.body}</p>
            </article>
          ))}
        </div>

        <p className="mt-2 text-center text-xs text-slate-400 md:hidden">Veeg voor meer →</p>

        <div className="mt-8 text-center">
          <Link
            href="/diensten"
            className="inline-flex items-center gap-2 font-semibold text-indigo-600 transition-colors duration-200 hover:text-indigo-700"
          >
            Bekijk onze diensten
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
