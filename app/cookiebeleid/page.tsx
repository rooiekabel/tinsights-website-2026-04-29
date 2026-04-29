import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Cookiebeleid — Tinsights" };

export default function CookiebeleidPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section style={{ paddingTop: 120, paddingBottom: 96 }}>
        <div style={{ maxWidth: 920, margin: "0 auto", padding: "0 24px" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6366f1", marginBottom: 16 }}>
            Juridisch
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "#0f172a", lineHeight: 1.15, margin: "0 0 20px" }}>
            Cookiebeleid
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "#475569", margin: "0 0 8px" }}>
            Versie: 12-02-2026
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "#64748b", margin: "0 0 40px" }}>
            Dit beleid legt uit welke cookies en vergelijkbare technieken Tinsights gebruikt en hoe je voorkeuren kunt beheren.
          </p>

          <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, padding: "32px 28px", color: "#334155", fontSize: 15, lineHeight: 1.8 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>Inleiding</h2>
            <p style={{ margin: "0 0 16px" }}>
              Dit cookiebeleid maakt deel uit van onze privacydocumentatie. Hieronder lees je welke categorieen cookies wij gebruiken,
              op welke grondslag dit gebeurt en hoe je zelf controle houdt over je voorkeuren.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>1. Wat zijn cookies?</h2>
            <p style={{ margin: "0 0 16px" }}>
              Cookies zijn kleine tekstbestanden die bij bezoek aan onze website op je apparaat worden opgeslagen.
              Daarmee kunnen we de website laten functioneren, gebruik analyseren en de gebruikerservaring verbeteren.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>2. Welke soorten cookies gebruiken wij?</h2>
            <ul style={{ margin: "0 0 16px", paddingLeft: 20 }}>
              <li><strong>Noodzakelijke cookies:</strong> nodig voor basisfunctionaliteit en beveiliging.</li>
              <li><strong>Voorkeurscookies:</strong> onthouden instellingen zoals taal of interfacekeuzes.</li>
              <li><strong>Analytische cookies:</strong> meten gebruik en prestaties van de website.</li>
              <li><strong>Marketingcookies:</strong> alleen indien toegepast en na toestemming.</li>
            </ul>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>3. Rechtsgrond en toestemming</h2>
            <p style={{ margin: "0 0 16px" }}>
              Noodzakelijke cookies plaatsen wij op basis van gerechtvaardigd belang. Voor niet-noodzakelijke cookies
              vragen wij vooraf toestemming via de cookiebanner, voor zover wettelijk vereist.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>4. Bewaartermijnen</h2>
            <p style={{ margin: "0 0 16px" }}>
              De bewaartermijn verschilt per cookie. Sessiecookies vervallen na browserafsluiting; persistente cookies
              worden voor een vooraf ingestelde periode bewaard.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>5. Derden</h2>
            <p style={{ margin: "0 0 16px" }}>
              Indien wij diensten van derden gebruiken (zoals analytics of embedded content), kunnen deze partijen
              ook cookies plaatsen. Raadpleeg in dat geval ook de privacy- en cookieverklaringen van die partijen.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>6. Overzicht per categorie</h2>
            <ul style={{ margin: "0 0 16px", paddingLeft: 20 }}>
              <li><strong>Functioneel:</strong> sessiebeheer, beveiliging, formulierwerking.</li>
              <li><strong>Analyse:</strong> geanonimiseerde statistieken en prestatiemeting.</li>
              <li><strong>Marketing:</strong> alleen indien actief ingezet en na expliciete toestemming.</li>
            </ul>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>7. Cookies beheren of verwijderen</h2>
            <p style={{ margin: "0 0 16px" }}>
              Je kunt je cookievoorkeuren aanpassen via onze cookiebanner (indien beschikbaar) of via je browserinstellingen.
              Het uitschakelen van bepaalde cookies kan invloed hebben op de werking van de website.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>8. Intrekken van toestemming</h2>
            <p style={{ margin: "0 0 16px" }}>
              Toestemming voor niet-noodzakelijke cookies kun je op elk moment intrekken door je voorkeuren te wijzigen.
              Intrekking werkt vanaf dat moment en heeft geen terugwerkende kracht.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>9. Wijzigingen</h2>
            <p style={{ margin: "0 0 16px" }}>
              Wij kunnen dit cookiebeleid wijzigen. De meest actuele versie staat altijd op deze pagina.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 14px" }}>10. Contact</h2>
            <p style={{ margin: "0 0 0" }}>
              Vragen over cookies of privacy? Neem contact op via info@tinsights.nl.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
