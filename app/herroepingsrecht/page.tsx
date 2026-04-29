import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Herroepingsrecht — Tinsights" };

export default function HerroepingsrechtPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section style={{ paddingTop: 120, paddingBottom: 96 }}>
        <div style={{ maxWidth: 920, margin: "0 auto", padding: "0 24px" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6366f1", marginBottom: 16 }}>
            Juridisch
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "#0f172a", lineHeight: 1.15, margin: "0 0 20px" }}>
            Herroepingsrecht
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "#475569", margin: "0 0 48px" }}>
            Informatie over bedenktijd en herroeping bij overeenkomsten op afstand.
          </p>
          <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, padding: "32px 28px", color: "#334155", fontSize: 15, lineHeight: 1.8 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>Inleiding</h2>
            <p style={{ margin: "0 0 16px" }}>
              Op deze pagina lees je wanneer je als consument gebruik kunt maken van het wettelijke herroepingsrecht.
              Dit overzicht is bedoeld als heldere uitleg en wordt toegepast samen met onze algemene voorwaarden en dwingend consumentenrecht.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>1. Toepassing</h2>
            <p style={{ margin: "0 0 16px" }}>
              Dit herroepingsrecht geldt uitsluitend voor consumenten (B2C). Zakelijke opdrachtgevers (B2B) hebben geen wettelijk herroepingsrecht.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>2. Wettelijke bedenktijd</h2>
            <p style={{ margin: "0 0 16px" }}>
              Als consument heb je in beginsel 14 dagen bedenktijd bij op afstand gesloten overeenkomsten.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>3. Start binnen bedenktijd</h2>
            <p style={{ margin: "0 0 16px" }}>
              Indien je uitdrukkelijk verzoekt dat Tinsights direct start met de dienst, kan Tinsights bij herroeping
              een redelijke vergoeding rekenen voor het deel dat al is uitgevoerd.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>4. Digitale inhoud</h2>
            <p style={{ margin: "0 0 16px" }}>
              Voor digitale inhoud die niet op een materiële drager wordt geleverd kan het herroepingsrecht vervallen zodra:
            </p>
            <ul style={{ margin: "0 0 16px", paddingLeft: 20 }}>
              <li>de uitvoering is gestart,</li>
              <li>je daar vooraf uitdrukkelijk mee hebt ingestemd, en</li>
              <li>je hebt verklaard afstand te doen van je herroepingsrecht.</li>
            </ul>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>5. Herroepen</h2>
            <p style={{ margin: "0 0 16px" }}>
              Je kunt herroepen door binnen de wettelijke termijn een duidelijke verklaring te sturen naar info@tinsights.nl.
              Vermeld daarbij minimaal je naam, contactgegevens en de overeenkomst waarop de herroeping ziet.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>6. Gevolgen van herroeping</h2>
            <p style={{ margin: "0 0 16px" }}>
              Als de herroeping geldig is, stoppen wij de verdere uitvoering van de dienst. Voor reeds verrichte werkzaamheden
              binnen de bedenktijd kan een redelijke, evenredige vergoeding in rekening worden gebracht als je expliciet om vroege start hebt gevraagd.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>7. Uitzonderingen</h2>
            <ul style={{ margin: "0 0 16px", paddingLeft: 20 }}>
              <li>Volledig uitgevoerde diensten met jouw voorafgaande uitdrukkelijke instemming.</li>
              <li>Digitale inhoud na start levering met uitdrukkelijke instemming en afstandsverklaring.</li>
              <li>Situaties waarin de wet herroeping uitsluit.</li>
            </ul>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>8. Bewijslast en communicatie</h2>
            <p style={{ margin: "0 0 16px" }}>
              Bewaar je herroepingsverklaring en verzendbevestiging goed. Communicatie per e-mail geldt als schriftelijk.
              Bij twijfel over termijnen of uitzonderingen geldt de wettelijke regeling.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>9. Contactgegevens</h2>
            <p style={{ margin: "0 0 0" }}>
              Tinsights, Korreweg 2-17, Groningen — info@tinsights.nl — 085-369-6652
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
