import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Privacyverklaring — Tinsights" };

export default function PrivacyverklaringPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section style={{ paddingTop: 120, paddingBottom: 96 }}>
        <div style={{ maxWidth: 920, margin: "0 auto", padding: "0 24px" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6366f1", marginBottom: 16 }}>
            Juridisch
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "#0f172a", lineHeight: 1.15, margin: "0 0 20px" }}>
            Privacyverklaring
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "#475569", margin: "0 0 8px" }}>
            Versie: 12-02-2026
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "#64748b", margin: "0 0 40px" }}>
            Deze privacyverklaring geldt voor bezoekers van onze website, (potentiele) klanten, leveranciers en contactpersonen.
          </p>

          <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, padding: "32px 28px", color: "#334155", fontSize: 15, lineHeight: 1.8 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>Inleiding</h2>
            <p style={{ margin: "0 0 16px" }}>
              Tinsights respecteert jouw privacy en verwerkt persoonsgegevens zorgvuldig, transparant en in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG).
              In deze verklaring leggen wij uit welke gegevens wij verwerken, waarom wij dat doen en welke rechten je hebt.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>1. Wie zijn wij?</h2>
            <p style={{ margin: "0 0 16px" }}>
              Tinsights, eenmanszaak, gevestigd te Groningen, kantoorhoudende aan Korreweg 2-17, KvK 99957949.
              Contact: info@tinsights.nl | 085-369-6652 | www.tinsights.nl
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>2. Welke persoonsgegevens verwerken wij?</h2>
            <ul style={{ margin: "0 0 16px", paddingLeft: 20 }}>
              <li>Contactgegevens: naam, e-mailadres, telefoonnummer, bedrijfsnaam</li>
              <li>Communicatie: berichten via e-mail en contactformulier</li>
              <li>Administratie: factuurgegevens, adres, KvK/BTW (zakelijk), betalingsgegevens</li>
              <li>Websitegebruik: IP-adres, browser/OS, apparaat- en loggegevens</li>
              <li>Hosting/onderhoud: technische logs, gebruikersaccounts, IP’s en geplaatste content</li>
            </ul>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>3. Waarom verwerken wij persoonsgegevens?</h2>
            <ul style={{ margin: "0 0 16px", paddingLeft: 20 }}>
              <li>Contact en offerteafhandeling</li>
              <li>Uitvoering van overeenkomsten (bouw, hosting, onderhoud, support)</li>
              <li>Facturatie en boekhouding</li>
              <li>Beveiliging en het voorkomen van misbruik</li>
              <li>Verbetering van onze website en diensten</li>
              <li>Naleving van wettelijke verplichtingen</li>
            </ul>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>4. Rechtsgrond (AVG)</h2>
            <ul style={{ margin: "0 0 16px", paddingLeft: 20 }}>
              <li>Uitvoering overeenkomst</li>
              <li>Gerechtvaardigd belang (beveiliging/bedrijfsvoering)</li>
              <li>Toestemming (bijv. niet-noodzakelijke cookies)</li>
              <li>Wettelijke verplichting (fiscale bewaarplicht)</li>
            </ul>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>5. Met wie delen wij gegevens?</h2>
            <p style={{ margin: "0 0 8px" }}>
              Wij delen persoonsgegevens alleen wanneer dat nodig is voor onze dienstverlening of wettelijke verplichtingen, bijvoorbeeld met:
            </p>
            <ul style={{ margin: "0 0 16px", paddingLeft: 20 }}>
              <li>Hosting/datacenter/registrar</li>
              <li>E-maildienstverleners</li>
              <li>Banken en betaalproviders</li>
              <li>Boekhouder of administratiesoftware</li>
            </ul>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>6. Doorgifte buiten de EU</h2>
            <p style={{ margin: "0 0 16px" }}>
              Sommige leveranciers kunnen (deels) buiten de EU verwerken. Waar relevant gebruiken wij passende waarborgen of kiezen we EU-diensten waar mogelijk.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>7. Verwerkers en beveiligingsafspraken</h2>
            <p style={{ margin: "0 0 16px" }}>
              Met partijen die namens ons persoonsgegevens verwerken sluiten wij, waar wettelijk vereist, verwerkersafspraken.
              Wij beoordelen leveranciers vooraf op betrouwbaarheid en passende technische/organisatorische beveiligingsmaatregelen.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>8. Bewaartermijnen</h2>
            <ul style={{ margin: "0 0 16px", paddingLeft: 20 }}>
              <li>Offertes/contact: maximaal 2 jaar (tenzij klantrelatie ontstaat)</li>
              <li>Administratie/facturen: 7 jaar (fiscale bewaarplicht)</li>
              <li>Logs/beveiligingsdata: doorgaans 3–12 maanden</li>
            </ul>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>9. Beveiliging</h2>
            <p style={{ margin: "0 0 16px" }}>
              Wij nemen passende maatregelen zoals SSL/TLS, toegangsbeheer, updates/patching, logging en monitoring.
              Absolute veiligheid bestaat niet; wij hanteren een inspanningsverplichting.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>10. Cookies</h2>
            <p style={{ margin: "0 0 16px" }}>
              Wij gebruiken cookies voor functionele werking en mogelijk analytics. Voor niet-noodzakelijke cookies vragen wij vooraf toestemming.
              Zie ook ons aparte cookiebeleid.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>11. Jouw rechten</h2>
            <p style={{ margin: "0 0 16px" }}>
              Je hebt recht op inzage, correctie, verwijdering, beperking, bezwaar en dataportabiliteit.
              Verzoeken kunnen naar info@tinsights.nl; wij kunnen om identificatie vragen.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>12. Minderjarigen</h2>
            <p style={{ margin: "0 0 16px" }}>
              Onze website en diensten zijn niet bedoeld voor kinderen onder 16 jaar zonder toestemming van ouder/verzorger.
              Als je vermoedt dat wij toch gegevens van een minderjarige verwerken zonder geldige toestemming, neem dan contact met ons op.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>13. Wijzigingen in deze verklaring</h2>
            <p style={{ margin: "0 0 16px" }}>
              Wij kunnen deze privacyverklaring van tijd tot tijd wijzigen. De meest recente versie staat altijd op deze pagina.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>14. Klachten</h2>
            <p style={{ margin: "0 0 16px" }}>
              Je kunt een klacht indienen bij de Autoriteit Persoonsgegevens.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>15. Contact</h2>
            <p style={{ margin: "0 0 0" }}>
              Voor privacyvragen of verzoeken: info@tinsights.nl
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
