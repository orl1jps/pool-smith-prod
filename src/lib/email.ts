import { Resend } from "resend";

// Lead email delivery via Resend. Configure with env vars (see env.example):
//   RESEND_API_KEY  – required; from https://resend.com/api-keys
//   MAIL_TO         – inbox that receives leads
//   MAIL_FROM       – verified sender
//
// The default MAIL_FROM (onboarding@resend.dev) only works in Resend test mode
// and can only deliver to the Resend account owner's own address. For real
// delivery, verify the domain in Resend and set a branded MAIL_FROM.

const MAIL_TO = process.env.MAIL_TO || "poolsmithofflorida@gmail.com";
const MAIL_FROM = process.env.MAIL_FROM || "Pool Smith <onboarding@resend.dev>";

let client: Resend | null = null;

function getClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!client) client = new Resend(apiKey);
  return client;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function rowsToHtml(rows: [string, string][]): string {
  const cells = rows
    .filter(([, v]) => v)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;font-weight:bold;vertical-align:top">${escapeHtml(
          label
        )}</td><td style="padding:6px 12px;white-space:pre-wrap">${escapeHtml(
          value
        )}</td></tr>`
    )
    .join("");
  return `<table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${cells}</table>`;
}

function rowsToText(rows: [string, string][]): string {
  return rows
    .filter(([, v]) => v)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
}

async function send(opts: {
  subject: string;
  rows: [string, string][];
  replyTo?: string;
  context: string;
}): Promise<boolean> {
  const resend = getClient();
  if (!resend) {
    console.warn(
      `[email] RESEND_API_KEY not set — ${opts.context} email NOT sent. Data:`,
      Object.fromEntries(opts.rows)
    );
    return false;
  }

  try {
    const { error } = await resend.emails.send({
      from: MAIL_FROM,
      to: MAIL_TO,
      replyTo: opts.replyTo || undefined,
      subject: opts.subject,
      text: rowsToText(opts.rows),
      html: rowsToHtml(opts.rows),
    });
    if (error) {
      console.error(`[email] Resend error (${opts.context}):`, error);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[email] send failed (${opts.context}):`, err);
    return false;
  }
}

export type ContactLead = {
  name: string;
  email: string;
  phone: string;
  message: string;
  subject?: string;
};

export async function sendContactEmail(lead: ContactLead): Promise<boolean> {
  return send({
    context: "contact",
    subject: `New website lead from ${lead.name || "a visitor"}`,
    replyTo: lead.email,
    rows: [
      ["Name", lead.name],
      ["Email", lead.email],
      ["Phone", lead.phone],
      ["Regarding", lead.subject ?? ""],
      ["Message", lead.message],
    ],
  });
}
