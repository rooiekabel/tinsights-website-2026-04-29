export type CityData = {
  naam: string;
  slug: string;
  image: string;
  regio: string;
  provincie: string;
  metaTitle: string;
  metaDescription: string;
  ogUrl: string;
  areaServed: string;
  /** Uppercase prefix for section 2 label, e.g. GRONINGSE */
  localOndernemersLabel: string;
  /** Lowercase adjective for services H2, e.g. Groningse */
  servicesAdjective: string;
  eyebrow: string;
  h1Line1: string;
  h1Line2: string;
  heroParagraph: string;
  trustLine: string;
  /** Newline-separated lines for centered H2 */
  localAuthorityH2: string;
  localP1: string;
  localP2: string;
  seoH2: string;
  seoP1: string;
  seoP2: string;
  seoP3: string;
  /** Newline allowed for bottom CTA heading */
  ctaH2: string;
  faqQ3: string;
  faqA3: string;
};

export const cities = {
  groningen: {
    naam: "Groningen",
    slug: "webdesign-groningen",
    image: "/assets/groningennetherlandsnight.jpg",
    regio: "Groningen en omstreken",
    provincie: "Groningen",
    metaTitle: "Webdesign Groningen | Professionele Websites | Tinsights",
    metaDescription:
      "Webdesign bureau in Groningen. Professionele websites voor ondernemers in Groningen en omstreken. Snel, betaalbaar en SEO geoptimaliseerd.",
    ogUrl: "https://tinsights.nl/webdesign-groningen",
    areaServed: "Groningen",
    localOndernemersLabel: "GRONINGSE",
    servicesAdjective: "Groningse",
    eyebrow: "WEBDESIGN BUREAU — GRONINGEN",
    h1Line1: "Webdesign Groningen",
    h1Line2: "dat klanten oplevert",
    heroParagraph:
      "Tinsights is gevestigd in Groningen en bouwt websites voor lokale ondernemers die serieus gevonden willen worden. Geen templates. Geen verborgen kosten. Wel een website die werkt.",
    trustLine: "4.9★ Google Reviews · Binnen 2 weken live · Vaste prijs vooraf",
    localAuthorityH2: "Groningen heeft goede ondernemers.\nNiet altijd goede websites.",
    localP1:
      "De concurrentie in Groningen groeit snel — ook online. Klanten googelen voordat ze bellen. Ze bekijken uw website op hun telefoon terwijl ze op de bus wachten. Als uw website er dan niet goed uitziet of traag laadt, gaan ze naar uw concurrent. Zo simpel is het.",
    localP2:
      "Tinsights bouwt websites die dat voorkomen. Snel, professioneel, goed vindbaar in Google. Speciaal voor ondernemers in Groningen en omstreken die klanten willen aantrekken via het internet — zonder gedoe.",
    seoH2: "Website laten maken in Groningen",
    seoP1:
      "Groningen telt meer dan 230.000 inwoners en een groeiende ondernemersmarkt. Van de Grote Markt tot het Europapark — overal zijn bedrijven die online zichtbaarder willen worden. Tinsights helpt daarbij.",
    seoP2:
      "Een website laten maken in Groningen betekent bij ons: persoonlijk contact, vaste prijs en een resultaat waar u trots op kunt zijn. Wij werken voor kappers, restaurants, garagebedrijven, tandartsen en veel meer branches in de regio.",
    seoP3:
      "Zoekt u een webdesign bureau in Groningen dat u écht begrijpt? Neem vrijblijvend contact op. Wij reageren altijd binnen 24 uur.",
    ctaH2: "Klaar om meer klanten te krijgen\nvia uw website in Groningen?",
    faqQ3: "Bouwen jullie ook webshops in Groningen?",
    faqA3:
      "Ja. Wij bouwen webshops voor ondernemers in Groningen en omgeving. Van een kleine productwebshop tot een grotere e-commerce oplossing met voorraadbeheer en betaalsysteem.",
  },

  assen: {
    naam: "Assen",
    slug: "webdesign-assen",
    image: "/assets/assennetherlands.jpg",
    regio: "Assen en heel Drenthe",
    provincie: "Drenthe",
    metaTitle: "Webdesign Assen | Professionele Websites | Tinsights",
    metaDescription:
      "Webdesign bureau actief in Assen. Professionele websites voor ondernemers in Assen en Drenthe. Op maat en snel online.",
    ogUrl: "https://tinsights.nl/webdesign-assen",
    areaServed: "Assen",
    localOndernemersLabel: "ASSER",
    servicesAdjective: "Asser",
    eyebrow: "WEBDESIGN BUREAU — ASSEN",
    h1Line1: "Webdesign Assen",
    h1Line2: "professioneel online",
    heroParagraph:
      "Tinsights bouwt professionele websites voor ondernemers in Assen en heel Drenthe. Geen templates, geen verborgen kosten. Wel een website die werkt en gevonden wordt in Google.",
    trustLine: "4.9★ Google Reviews · Binnen 2 weken live · Vaste prijs vooraf",
    localAuthorityH2: "Assen heeft actieve ondernemers.\nNiet altijd een sterke online aanwezigheid.",
    localP1:
      "Assen groeit als ondernemersstad — van het centrum tot de bedrijventerreinen aan de rand. Maar veel Asser bedrijven zijn online slecht vindbaar. Klanten zoeken op hun telefoon en kiezen degene die ze als eerste vinden. Dat hoeft u niet te zijn.",
    localP2:
      "Tinsights bouwt websites voor Asser ondernemers die serieus genomen willen worden online. Snel, professioneel en geoptimaliseerd voor Google. Geen dure bureaus, wel topkwaliteit.",
    seoH2: "Website laten maken in Assen",
    seoP1:
      "Assen is de hoofdstad van Drenthe en telt ruim 67.000 inwoners. De stad heeft een sterke detailhandel, horeca en zakelijke dienstverlening. Voor al deze branches bouwt Tinsights professionele websites die lokaal gevonden worden.",
    seoP2:
      "Een website laten maken in Assen betekent bij ons: persoonlijk contact, vaste prijs en een eindresultaat waar u klanten mee aantrekt. Wij werken voor kappers, restaurants, garages, tandartsen en meer in Drenthe.",
    seoP3:
      "Zoekt u een webdesign bureau actief in Assen? Neem vrijblijvend contact op. Reactie binnen 24 uur.",
    ctaH2: "Klaar voor een professionele website in Assen?",
    faqQ3: "Werken jullie alleen in Assen?",
    faqA3:
      "Wij werken vanuit Groningen en zijn actief in heel Drenthe, waaronder Assen. Alles verloopt digitaal zodat afstand geen rol speelt.",
  },

  zwolle: {
    naam: "Zwolle",
    slug: "webdesign-zwolle",
    image: "/assets/zwollenetherlands.jpg",
    regio: "Zwolle en Overijssel",
    provincie: "Overijssel",
    metaTitle: "Webdesign Zwolle | Professionele Websites | Tinsights",
    metaDescription:
      "Webdesign bureau actief in Zwolle. Snelle, moderne websites voor Zwolse ondernemers. SEO geoptimaliseerd en mobiel vriendelijk.",
    ogUrl: "https://tinsights.nl/webdesign-zwolle",
    areaServed: "Zwolle",
    localOndernemersLabel: "ZWOLSE",
    servicesAdjective: "Zwolse",
    eyebrow: "WEBDESIGN BUREAU — ZWOLLE",
    h1Line1: "Webdesign Zwolle",
    h1Line2: "gevonden in Google",
    heroParagraph:
      "Bent u ondernemer in Zwolle en wilt u beter gevonden worden online? Tinsights bouwt websites die ranken, converteren en klanten opleveren. Binnen twee weken online.",
    trustLine: "4.9★ Google Reviews · Binnen 2 weken live · Vaste prijs vooraf",
    localAuthorityH2: "Zwolle groeit hard.\nDe online concurrentie ook.",
    localP1:
      "Zwolle is een van de snelst groeiende steden van Nederland. Meer bedrijven betekent meer concurrentie — ook online. Wie niet vindbaar is in Google, bestaat niet voor zijn potentiële klanten. Zo eenvoudig is dat.",
    localP2:
      "Tinsights bouwt websites voor Zwolse ondernemers die dat begrijpen. Strak, snel, lokaal geoptimaliseerd voor Google. U investeert eenmalig en profiteert er jarenlang van.",
    seoH2: "Website laten maken in Zwolle",
    seoP1:
      "Zwolle telt ruim 130.000 inwoners en is het economisch hart van Overijssel. De stad heeft een diverse ondernemersmarkt: van horeca en retail tot zakelijke dienstverlening en zorg. Voor al deze branches bouwt Tinsights professionele websites.",
    seoP2:
      "Een website laten maken in Zwolle betekent bij ons: maatwerk, eerlijke prijs en een website die écht gevonden wordt. Wij kennen de Zwolse markt en weten welke zoekwoorden uw doelgroep gebruikt.",
    seoP3:
      "Op zoek naar een webdesign bureau actief in Zwolle? Neem contact op. Wij reageren altijd binnen 24 uur met een concreet voorstel.",
    ctaH2: "Klaar om zichtbaar te worden in Zwolle?",
    faqQ3: "Werken jullie ook in Zwolle?",
    faqA3:
      "Wij werken vanuit Groningen maar bedienen klanten door heel Nederland, inclusief Zwolle en de rest van Overijssel. Alles verloopt digitaal.",
  },

  leeuwarden: {
    naam: "Leeuwarden",
    slug: "webdesign-leeuwarden",
    image: "/assets/leeuwardennetherlands.jpg",
    regio: "Leeuwarden en Friesland",
    provincie: "Friesland",
    metaTitle: "Webdesign Leeuwarden | Professionele Websites | Tinsights",
    metaDescription:
      "Webdesign bureau actief in Leeuwarden. Professionele websites voor ondernemers in Leeuwarden en Friesland. Snel online en goed vindbaar.",
    ogUrl: "https://tinsights.nl/webdesign-leeuwarden",
    areaServed: "Leeuwarden",
    localOndernemersLabel: "LEEUWARDER",
    servicesAdjective: "Leeuwarder",
    eyebrow: "WEBDESIGN BUREAU — LEEUWARDEN",
    h1Line1: "Webdesign Leeuwarden",
    h1Line2: "meer klanten online",
    heroParagraph:
      "Tinsights bouwt professionele websites voor ondernemers in Leeuwarden en heel Friesland. Modern design, sterke SEO en volledig mobiel vriendelijk. Wij denken met u mee van begin tot eind.",
    trustLine: "4.9★ Google Reviews · Binnen 2 weken live · Vaste prijs vooraf",
    localAuthorityH2: "Leeuwarden heeft sterke ondernemers.\nOnline is er nog winst te halen.",
    localP1:
      "Leeuwarden is een levendige stad met een sterke lokale ondernemersmarkt. Maar veel Leeuwarder bedrijven lopen online klanten mis — omdat hun website verouderd is, slecht laadt op mobiel of simpelweg niet gevonden wordt in Google.",
    localP2:
      "Tinsights helpt ondernemers in Leeuwarden en Friesland met een website die dat verandert. Strak, snel en lokaal sterk in Google. Vaste prijs, geen verrassingen.",
    seoH2: "Website laten maken in Leeuwarden",
    seoP1:
      "Leeuwarden is de hoofdstad van Friesland en telt ruim 123.000 inwoners. De stad heeft een gevarieerde economie met horeca, zorg, retail en zakelijke dienstverlening. Voor al deze branches bouwt Tinsights professionele websites.",
    seoP2:
      "Een website laten maken in Leeuwarden bij Tinsights betekent: maatwerk ontwerp, technisch correcte SEO en een website die op elk apparaat werkt. Persoonlijk contact en vaste prijs vooraf.",
    seoP3:
      "Zoekt u een webdesign bureau actief in Leeuwarden of Friesland? Neem vrijblijvend contact op. Wij reageren binnen 24 uur.",
    ctaH2: "Klaar voor meer klanten in Leeuwarden?",
    faqQ3: "Werken jullie ook in Leeuwarden en Friesland?",
    faqA3:
      "Ja. Wij werken vanuit Groningen en zijn actief in heel Friesland waaronder Leeuwarden. Alles verloopt digitaal, afstand is geen probleem.",
  },

  drachten: {
    naam: "Drachten",
    slug: "webdesign-drachten",
    image: "/assets/drachtennetlerhands.png",
    regio: "Drachten en regio Smallingerland",
    provincie: "Friesland",
    metaTitle: "Webdesign Drachten | Professionele Websites | Tinsights",
    metaDescription:
      "Webdesign bureau actief in Drachten. Professionele websites voor ondernemers in Drachten en omgeving. Betaalbaar en snel.",
    ogUrl: "https://tinsights.nl/webdesign-drachten",
    areaServed: "Drachten",
    localOndernemersLabel: "DRACHTSTER",
    servicesAdjective: "Drachtster",
    eyebrow: "WEBDESIGN BUREAU — DRACHTEN",
    h1Line1: "Webdesign Drachten",
    h1Line2: "op maat voor uw regio",
    heroParagraph:
      "Bent u ondernemer in Drachten of omgeving? Tinsights bouwt betaalbare, professionele websites die goed gevonden worden in Google. Persoonlijk contact gedurende het hele traject.",
    trustLine: "4.9★ Google Reviews · Binnen 2 weken live · Vaste prijs vooraf",
    localAuthorityH2: "Drachten heeft ambitieuze ondernemers.\nOnline is er veel ruimte om op te vallen.",
    localP1:
      "Drachten is een van de grootste kernen van Friesland en heeft een actieve lokale economie. Toch zijn veel bedrijven in de regio Smallingerland online nauwelijks zichtbaar. Dat is een gemiste kans — want klanten zoeken ook hier eerst op Google.",
    localP2:
      "Tinsights bouwt websites voor ondernemers in Drachten die dat willen veranderen. Betaalbaar, professioneel en snel. U krijgt een website die werkt op telefoon, tablet en desktop.",
    seoH2: "Website laten maken in Drachten",
    seoP1:
      "Drachten is de tweede stad van Friesland en een belangrijk economisch centrum in Noord-Nederland. De gemeente Smallingerland telt ruim 55.000 inwoners met een sterke mix van industrie, detailhandel en dienstverlening. Voor al deze sectoren bouwt Tinsights professionele websites.",
    seoP2:
      "Een website laten maken in Drachten bij Tinsights: maatwerk, vaste prijs en persoonlijk contact. Wij optimaliseren uw website voor lokale zoekopdrachten in Drachten en de regio Smallingerland.",
    seoP3:
      "Op zoek naar een webdesign bureau dat actief is in Drachten? Neem contact op. Wij reageren altijd binnen 24 uur met een vrijblijvend voorstel.",
    ctaH2: "Klaar voor een nieuwe website in Drachten?",
    faqQ3: "Werken jullie ook in Drachten?",
    faqA3:
      "Ja. Wij werken vanuit Groningen en zijn actief in Drachten en heel Noord-Nederland. Alles verloopt digitaal zodat afstand geen rol speelt.",
  },
} satisfies Record<string, CityData>;

export type CityKey = keyof typeof cities;
