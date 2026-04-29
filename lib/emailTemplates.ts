const LOGO_URL = "https://tinsights.nl/assets/logoo.png";
const PRIMARY = "#6366f1";
const DARK = "#0f172a";

/** Logo altijd op witte achtergrond — goed leesbaar in alle clients */
function mailHeaderBlock(subtitle?: string): string {
  return `<tr>
  <td style="background:#ffffff;padding:28px 40px 22px;border-bottom:1px solid #e8ecf1;">
    <img src="${LOGO_URL}" alt="Tinsights" height="40" style="height:40px;width:auto;max-width:168px;display:block;border:0;" />
    ${
      subtitle
        ? `<p style="margin:14px 0 0;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#94a3b8;">${subtitle}</p>`
        : ""
    }
  </td>
</tr>
<tr>
  <td style="background:${PRIMARY};height:3px;line-height:3px;font-size:3px;">&nbsp;</td>
</tr>`;
}

function mailFooterBlock(): string {
  return `<tr>
  <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:22px 40px;">
    <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.65;">
      <strong style="color:#64748b;">Tinsights</strong> · Groningen ·
      <a href="mailto:info@tinsights.nl" style="color:${PRIMARY};text-decoration:none;">info@tinsights.nl</a> ·
      <a href="tel:0853696652" style="color:${PRIMARY};text-decoration:none;">085&nbsp;–&nbsp;369&nbsp;6652</a><br/>
      <span style="color:#cbd5e1;">KvK 99957949</span>
    </p>
  </td>
</tr>`;
}

function mailWrapper(title: string, innerRows: string): string {
  return `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#eef2f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#eef2f6;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(15,23,42,0.06);border:1px solid #e8ecf1;">
          ${innerRows}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function contactAutoReplyHtml(name: string, message: string): string {
  const body = `${mailHeaderBlock()}
          <tr>
            <td style="padding:36px 40px 28px;">
              <h1 style="margin:0 0 10px;font-size:22px;font-weight:800;color:${DARK};letter-spacing:-0.02em;line-height:1.2;">
                Bedankt, ${name}!
              </h1>
              <p style="margin:0 0 22px;font-size:15px;color:#475569;line-height:1.65;">
                We hebben je bericht ontvangen en reageren <strong style="color:${DARK};">dezelfde werkdag</strong>, of uiterlijk binnen 24 uur.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:0 0 24px;">
                <tr>
                  <td style="background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;padding:16px 18px;">
                    <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;">Jouw bericht</p>
                    <p style="margin:0;font-size:14px;color:#334155;line-height:1.6;">${message.replace(/\n/g, "<br/>")}</p>
                  </td>
                </tr>
              </table>
              <table cellpadding="0" cellspacing="0" role="presentation" style="margin:0 0 8px;">
                <tr>
                  <td style="padding-right:10px;">
                    <a href="https://wa.me/31619181483" style="display:inline-block;background:${PRIMARY};color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;padding:12px 20px;border-radius:8px;">WhatsApp</a>
                  </td>
                  <td>
                    <a href="https://tinsights.nl" style="display:inline-block;border:1px solid ${PRIMARY};color:${PRIMARY};text-decoration:none;font-size:13px;font-weight:600;padding:11px 19px;border-radius:8px;">Website</a>
                  </td>
                </tr>
              </table>
              <p style="margin:24px 0 0;font-size:14px;color:#475569;line-height:1.6;">
                Met vriendelijke groet,<br/><strong style="color:${DARK};">Team Tinsights</strong>
              </p>
            </td>
          </tr>
          ${mailFooterBlock()}`;
  return mailWrapper(`Bedankt — Tinsights`, body);
}

export function contactAutoReplyText(name: string, message: string): string {
  return `Hoi ${name},

Bedankt voor je bericht! We hebben het goed ontvangen en nemen dezelfde werkdag — of uiterlijk binnen 24 uur — contact met je op.

Jouw bericht:
"${message}"

Heb je vragen? Bereik ons via:
- WhatsApp: 06-19181483
- Telefoon: 085 - 369 6652
- Email: info@tinsights.nl

Met vriendelijke groet,
Het Tinsights team

---
Tinsights — Webdevelopment, hosting & marketing
Groningen, Nederland | KvK: 99957949`;
}

export function contactAdminNotificationHtml(
  name: string,
  email: string,
  phone: string,
  message: string,
  submittedAt: string
): string {
  const body = `${mailHeaderBlock("Nieuw via contactformulier")}
          <tr>
            <td style="padding:32px 40px 28px;">
              <h1 style="margin:0 0 20px;font-size:20px;font-weight:800;color:${DARK};">Nieuw bericht binnen</h1>
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;margin:0 0 20px;">
                <tr style="background:#f8fafc;">
                  <td style="padding:12px 16px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;width:100px;">Naam</td>
                  <td style="padding:12px 16px;font-size:14px;color:${DARK};font-weight:600;">${name}</td>
                </tr>
                <tr style="border-top:1px solid #e2e8f0;">
                  <td style="padding:12px 16px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;">E-mail</td>
                  <td style="padding:12px 16px;font-size:14px;"><a href="mailto:${email}" style="color:${PRIMARY};text-decoration:none;">${email}</a></td>
                </tr>
                <tr style="border-top:1px solid #e2e8f0;background:#f8fafc;">
                  <td style="padding:12px 16px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;">Tel.</td>
                  <td style="padding:12px 16px;font-size:14px;color:#334155;">${phone || "—"}</td>
                </tr>
                <tr style="border-top:1px solid #e2e8f0;">
                  <td style="padding:12px 16px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;">Tijd</td>
                  <td style="padding:12px 16px;font-size:14px;color:#334155;">${submittedAt}</td>
                </tr>
              </table>
              <div style="background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;padding:16px 18px;margin-bottom:20px;">
                <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;">Bericht</p>
                <p style="margin:0;font-size:14px;color:#334155;line-height:1.65;">${message.replace(/\n/g, "<br/>")}</p>
              </div>
              <a href="mailto:${email}" style="display:inline-block;background:${PRIMARY};color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;padding:12px 22px;border-radius:8px;">Beantwoorden</a>
            </td>
          </tr>
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:16px 40px;">
              <p style="margin:0;font-size:11px;color:#94a3b8;">
                <a href="https://tinsights.nl/scotdejews/dashboard" style="color:${PRIMARY};text-decoration:none;font-weight:600;">Open dashboard</a>
              </p>
            </td>
          </tr>`;
  return mailWrapper(`Contact: ${name}`, body);
}

export interface MailerTemplate {
  id: string;
  label: string;
  description: string;
  subject: string;
  html: (vars: Record<string, string>) => string;
  vars: string[];
}

const mailerBody = (title: string | null, paragraphs: string, ctaHtml: string) => `${mailHeaderBlock()}
          <tr>
            <td style="padding:36px 40px 28px;">
              ${
                title
                  ? `<h1 style="margin:0 0 14px;font-size:22px;font-weight:800;color:${DARK};letter-spacing:-0.02em;line-height:1.25;">${title}</h1>`
                  : ""
              }
              ${paragraphs}
              <div style="margin-top:26px;">${ctaHtml}</div>
              <p style="margin:28px 0 0;font-size:14px;color:#475569;line-height:1.6;">
                Met vriendelijke groet,<br/><strong style="color:${DARK};">Team Tinsights</strong>
              </p>
            </td>
          </tr>
          ${mailFooterBlock()}`;

const ctaPrimary = (href: string, label: string) =>
  `<a href="${href}" style="display:inline-block;background:${PRIMARY};color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;padding:12px 22px;border-radius:8px;">${label}</a>`;

export const mailerTemplates: MailerTemplate[] = [
  {
    id: "offerte",
    label: "Offerte",
    description: "Na een gesprek — bedrag en project in de mail",
    subject: "Je offerte van Tinsights — {{naam}}",
    vars: ["naam", "projectnaam", "bedrag"],
    html: ({ naam, projectnaam, bedrag }) => {
      const p = `
        <p style="margin:0 0 14px;font-size:15px;color:#475569;line-height:1.65;">
          Hi ${naam || "daar"}, hierbij de offerte voor <strong style="color:${DARK};">${projectnaam || "jouw project"}</strong>.
        </p>
        ${
          bedrag
            ? `<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:0 0 18px;background:#f8fafc;border-radius:10px;border:1px solid #e2e8f0;">
            <tr><td style="padding:18px 20px;text-align:center;">
              <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.06em;">Totaal</p>
              <p style="margin:0;font-size:26px;font-weight:800;color:${PRIMARY};letter-spacing:-0.02em;">${bedrag}</p>
            </td></tr>
          </table>`
            : ""
        }
        <p style="margin:0;font-size:14px;color:#64748b;line-height:1.6;">Vragen of aanpassingen? Reply op deze mail — we helpen je graag.</p>`;
      return mailWrapper(
        `Offerte — Tinsights`,
        mailerBody(`Je offerte is klaar`, p, ctaPrimary("mailto:info@tinsights.nl", "Vraag stellen"))
      );
    },
  },
  {
    id: "welkom",
    label: "Welkom",
    description: "Nieuwe klant — korte welkom + WhatsApp",
    subject: "Welkom bij Tinsights, {{naam}}!",
    vars: ["naam", "projectnaam"],
    html: ({ naam, projectnaam }) => {
      const p = `
        <p style="margin:0 0 14px;font-size:15px;color:#475569;line-height:1.65;">
          Welkom ${naam || ""}! Fijn dat we voor je aan de slag mogen${projectnaam ? ` met <strong style="color:${DARK};">${projectnaam}</strong>` : ""}.
        </p>
        <p style="margin:0;font-size:14px;color:#64748b;line-height:1.6;">
          We houden je op de hoogte. Bereik ons ook direct via WhatsApp als je iets wilt bespreken.
        </p>`;
      return mailWrapper(
        `Welkom — Tinsights`,
        mailerBody(`Welkom aan boord`, p, ctaPrimary("https://wa.me/31619181483", "WhatsApp Tinsights"))
      );
    },
  },
  {
    id: "followup",
    label: "Follow-up",
    description: "Korte check-in na offerte of gesprek",
    subject: "Even checken — Tinsights",
    vars: ["naam", "onderwerp"],
    html: ({ naam, onderwerp }) => {
      const p = `
        <p style="margin:0 0 14px;font-size:15px;color:#475569;line-height:1.65;">
          Hoi ${naam || ""}, we wilden even horen hoe het met <strong style="color:${DARK};">${onderwerp || "jouw vraag"}</strong> staat.
        </p>
        <p style="margin:0;font-size:14px;color:#64748b;line-height:1.6;">Laat gerust weten of we iets voor je kunnen doen.</p>`;
      return mailWrapper(
        `Follow-up — Tinsights`,
        mailerBody(`Even opvolgen`, p, ctaPrimary("mailto:info@tinsights.nl", "Antwoord geven"))
      );
    },
  },
  {
    id: "nieuwsbrief",
    label: "Update",
    description: "Nieuws of aankondiging — eigen inhoud",
    subject: "{{onderwerp}} — Tinsights",
    vars: ["naam", "onderwerp", "inhoud"],
    html: ({ naam, onderwerp, inhoud }) => {
      const p = `
        ${naam ? `<p style="margin:0 0 14px;font-size:15px;color:#475569;">Hoi ${naam},</p>` : ""}
        <p style="margin:0 0 18px;font-size:20px;font-weight:800;color:${DARK};letter-spacing:-0.02em;line-height:1.25;">${onderwerp || "Nieuws van Tinsights"}</p>
        <div style="font-size:15px;color:#334155;line-height:1.7;">${inhoud ? inhoud.replace(/\n/g, "<br/>") : "<em style=\"color:#94a3b8;\">Voeg je tekst toe in de mailer.</em>"}</div>`;
      return mailWrapper(
        onderwerp || "Tinsights",
        mailerBody(null, p, ctaPrimary("https://tinsights.nl", "Naar website"))
      );
    },
  },
];
