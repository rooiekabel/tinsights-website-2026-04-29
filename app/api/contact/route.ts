import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { resend, FROM_EMAIL, ADMIN_EMAIL } from "@/lib/resend";
import {
  contactAutoReplyHtml,
  contactAutoReplyText,
  contactAdminNotificationHtml,
} from "@/lib/emailTemplates";
import type { ContactEntry } from "@/lib/types/contact";

const DATA_FILE = path.join(process.cwd(), "data", "contacts.json");

async function readContacts(): Promise<ContactEntry[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeContacts(entries: ContactEntry[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2), "utf-8");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { naam, email, telefoon, bericht } = body;

    if (!naam || !email || !bericht) {
      return NextResponse.json(
        { error: "Naam, e-mail en bericht zijn verplicht." },
        { status: 400 }
      );
    }

    const now = new Date();
    const submittedAt = now.toLocaleString("nl-NL", {
      timeZone: "Europe/Amsterdam",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const entry: ContactEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      naam,
      email,
      telefoon: telefoon || "",
      bericht,
      submittedAt,
      timestamp: now.getTime(),
      gelezen: false,
    };

    // Sla op in JSON bestand
    const contacts = await readContacts();
    contacts.unshift(entry);
    await writeContacts(contacts);

    // Auto-reply naar bezoeker
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Bedankt voor je bericht, ${naam}! — Tinsights`,
      html: contactAutoReplyHtml(naam, bericht),
      text: contactAutoReplyText(naam, bericht),
    });

    // Notificatie naar admin
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `📬 Nieuw contactformulier: ${naam}`,
      html: contactAdminNotificationHtml(naam, email, telefoon || "", bericht, submittedAt),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Er ging iets mis. Probeer het opnieuw." },
      { status: 500 }
    );
  }
}

export async function GET() {
  const contacts = await readContacts();
  return NextResponse.json(contacts);
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;
    const contacts = await readContacts();
    const updated = contacts.map((c) =>
      c.id === id ? { ...c, gelezen: true } : c
    );
    await writeContacts(updated);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
