import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { resend, FROM_EMAIL } from "@/lib/resend";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { to, subject, html, replyTo } = body;

    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: "Ontvanger, onderwerp en inhoud zijn verplicht." },
        { status: 400 }
      );
    }

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
      replyTo: replyTo || "info@tinsights.nl",
    });

    return NextResponse.json({ ok: true, id: result.data?.id });
  } catch (err) {
    console.error("Mailer error:", err);
    return NextResponse.json(
      { error: "Versturen mislukt. Controleer de gegevens." },
      { status: 500 }
    );
  }
}
