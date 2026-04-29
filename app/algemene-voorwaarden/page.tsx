import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Algemene Voorwaarden — Tinsights" };

export default function AlgemeneVoorwaardenPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section style={{ paddingTop: 120, paddingBottom: 96 }}>
        <div style={{ maxWidth: 920, margin: "0 auto", padding: "0 24px" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6366f1", marginBottom: 16 }}>
            Juridisch
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "#0f172a", lineHeight: 1.15, margin: "0 0 20px" }}>
            Algemene Voorwaarden
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "#475569", margin: "0 0 8px" }}>
            Versie: 12-02-2026
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "#64748b", margin: "0 0 40px" }}>
            Dit is een verkorte online weergave. Bij verschil geldt de volledige tekst zoals contractueel verstrekt.
          </p>
          <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, padding: "32px 28px", color: "#334155", fontSize: 15, lineHeight: 1.8 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>Inleiding en reikwijdte</h2>
            <p style={{ margin: "0 0 16px" }}>
              Deze voorwaarden gelden voor alle offertes, werkzaamheden en overeenkomsten tussen Tinsights en opdrachtgever.
              Met deze voorwaarden borgen wij heldere afspraken over uitvoering, risicoverdeling, aansprakelijkheid, betaling en juridische verantwoordelijkheden.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>1. Gegevens ondernemer</h2>
            <p style={{ margin: "0 0 16px" }}>
              Tinsights, eenmanszaak, gevestigd te Groningen, kantoorhoudende aan Korreweg 2-17,
              ingeschreven bij de Kamer van Koophandel onder nummer 99957949.
              Contact: info@tinsights.nl | 085-369-6652 | www.tinsights.nl
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>2. Toepasselijkheid</h2>
            <ul style={{ margin: "0 0 16px", paddingLeft: 20 }}>
              <li>Van toepassing op alle offertes, diensten en overeenkomsten van Tinsights.</li>
              <li>Afwijkingen gelden alleen schriftelijk.</li>
              <li>Voorwaarden van opdrachtgever worden uitdrukkelijk afgewezen.</li>
            </ul>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>3. Offerte en totstandkoming</h2>
            <ul style={{ margin: "0 0 16px", paddingLeft: 20 }}>
              <li>Offertes zijn vrijblijvend en 30 dagen geldig, tenzij anders vermeld.</li>
              <li>Overeenkomst ontstaat na schriftelijke acceptatie of start uitvoering met instemming.</li>
              <li>Kennelijke fouten of verschrijvingen binden Tinsights niet.</li>
            </ul>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>4. Uitvoering en verplichtingen opdrachtgever</h2>
            <ul style={{ margin: "0 0 16px", paddingLeft: 20 }}>
              <li>Diensten worden uitgevoerd op basis van inspanningsverplichting, tenzij schriftelijk anders overeengekomen.</li>
              <li>Opdrachtgever levert tijdig correcte, volledige en rechtmatige informatie/content aan.</li>
              <li>Opdrachtgever blijft verantwoordelijk voor juridische inhoud (privacy/cookies/consumentenrecht).</li>
            </ul>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>5. Oplevering en acceptatie</h2>
            <ul style={{ margin: "0 0 16px", paddingLeft: 20 }}>
              <li>Levertermijnen zijn indicatief, tenzij expliciet als fataal aangemerkt.</li>
              <li>Testtermijn is 14 dagen na oplevermelding.</li>
              <li>Bij geen reactie binnen 14 dagen geldt het werk als geaccepteerd.</li>
              <li>Maximaal 3 feedbackrondes inbegrepen, tenzij anders afgesproken.</li>
            </ul>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>6. Prijzen, betaling en opschorting</h2>
            <ul style={{ margin: "0 0 16px", paddingLeft: 20 }}>
              <li>Alle prijzen zijn exclusief BTW, tenzij anders vermeld.</li>
              <li>Projecten standaard: 50% aanbetaling, 50% bij oplevering.</li>
              <li>Betaaltermijn: 14 dagen na factuurdatum.</li>
              <li>Bij wanbetaling mag Tinsights werkzaamheden opschorten en toegang/hosting beperken.</li>
            </ul>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>7. Meerwerk en scopewijzigingen</h2>
            <ul style={{ margin: "0 0 16px", paddingLeft: 20 }}>
              <li>Wijzigingen buiten de overeengekomen scope gelden als meerwerk.</li>
              <li>Meerwerk wordt uitgevoerd na akkoord of na feitelijke opdracht/gebruik.</li>
              <li>Meerwerk kan invloed hebben op planning, oplevering en kosten.</li>
            </ul>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>8. Hosting en domeinen</h2>
            <ul style={{ margin: "0 0 16px", paddingLeft: 20 }}>
              <li>Hosting is een inspanningsverplichting; geen 100% uptime garantie zonder aparte SLA.</li>
              <li>Tijdelijke downtime voor onderhoud kan voorkomen.</li>
              <li>Back-ups zijn alleen inbegrepen indien expliciet overeengekomen.</li>
              <li>Bij wanbetaling kan de website (tijdelijk) offline worden gezet.</li>
            </ul>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>9. Security, audits en resultaten</h2>
            <p style={{ margin: "0 0 16px" }}>
              Security-audits, ethical hacking en SEO/marketing zijn inspanningsdiensten. Tinsights garandeert geen specifieke ranking,
              omzetgroei, volledige kwetsbaarheidsdetectie of absolute veiligheid.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>10. Intellectuele eigendom</h2>
            <p style={{ margin: "0 0 16px" }}>
              IE-rechten blijven bij Tinsights totdat volledige betaling heeft plaatsgevonden. Na volledige betaling
              krijgt opdrachtgever een niet-exclusief gebruiksrecht voor het afgesproken doel.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>11. Aansprakelijkheid</h2>
            <ul style={{ margin: "0 0 16px", paddingLeft: 20 }}>
              <li>Geen aansprakelijkheid voor indirecte schade/gevolgschade, waaronder omzetverlies of dataverlies.</li>
              <li>Aansprakelijkheid is beperkt tot het betaalde bedrag voor de opdracht met een maximum van €2.500.</li>
              <li>Alleen bij opzet of bewuste roekeloosheid van de bedrijfsleiding vervallen deze beperkingen.</li>
            </ul>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>12. Vrijwaring en verantwoordelijkheid opdrachtgever</h2>
            <p style={{ margin: "0 0 16px" }}>
              Opdrachtgever vrijwaart Tinsights tegen aanspraken van derden die voortkomen uit aangeleverde content,
              schending van IE- of privacyrechten, of onrechtmatig gebruik van de website.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>13. Opschorting, ontbinding en opzegging</h2>
            <ul style={{ margin: "0 0 16px", paddingLeft: 20 }}>
              <li>Tinsights mag opschorten of ontbinden bij wanbetaling, misbruik of onredelijke samenwerking.</li>
              <li>Abonnementen (hosting/onderhoud) zijn schriftelijk opzegbaar met 1 maand opzegtermijn, tenzij anders overeengekomen.</li>
              <li>Reeds verrichte werkzaamheden en kosten blijven verschuldigd.</li>
            </ul>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>14. Herroepingsrecht en recht</h2>
            <ul style={{ margin: "0 0 0", paddingLeft: 20 }}>
              <li>Alleen consumenten hebben wettelijk herroepingsrecht; B2B niet.</li>
              <li>Op alle overeenkomsten is Nederlands recht van toepassing.</li>
              <li>Geschillen worden voorgelegd aan de bevoegde rechter in Nederland.</li>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
