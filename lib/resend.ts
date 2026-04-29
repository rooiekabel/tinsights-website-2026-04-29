import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const FROM_EMAIL = process.env.RESEND_FROM || "Tinsights <noreply@tinsights.nl>";
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "info@tinsights.nl";
