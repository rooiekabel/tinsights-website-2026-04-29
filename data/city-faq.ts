import type { CityData } from "@/data/cities";

/** Seven FAQ items for city landing pages (accordion + JSON-LD). */
export function buildCityFaqItems(city: CityData): { q: string; a: string }[] {
  const n = city.naam;
  return [
    {
      q: `Wat kost een website laten maken in ${n}?`,
      a: "Een professionele website begint bij ons vanaf €349 eenmalig. De prijs hangt af van uw wensen en functies. U krijgt altijd een vaste prijs vooraf — geen verrassingen achteraf.",
    },
    {
      q: "Hoe lang duurt het bouwen van mijn website?",
      a: "Gemiddeld 1 tot 2 weken na goedkeuring van het ontwerp. Bij complexere projecten iets langer. Wij communiceren altijd transparant over de planning.",
    },
    {
      q: city.faqQ3,
      a: city.faqA3,
    },
    {
      q: "Kan ik mijn website later zelf aanpassen?",
      a: "Ja. Wij leveren elke website op met een eenvoudig beheerpaneel. Teksten en foto's aanpassen doet u zelf zonder technische kennis.",
    },
    {
      q: "Is mijn website vindbaar in Google?",
      a: `Alle websites worden standaard technisch geoptimaliseerd voor zoekmachines. Voor uitgebreidere lokale SEO in ${n} bieden wij een apart pakket.`,
    },
    {
      q: "Bouwen jullie ook webshops?",
      a: "Ja. Van een kleine productwebshop tot een grotere e-commerce oplossing met voorraadbeheer en betaalsysteem. Wij bouwen webshops voor diverse branches.",
    },
    {
      q: "Wat als ik al een website heb?",
      a: "Dan analyseren wij uw huidige website en bekijken wat beter kan. Soms volstaan gerichte aanpassingen, soms is een volledig nieuwe website slimmer. Wij denken altijd met u mee.",
    },
  ];
}
