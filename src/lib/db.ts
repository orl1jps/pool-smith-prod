import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import { mkdirSync } from "node:fs";

// File-based persistence for contact form submissions using Node's built-in
// SQLite (node:sqlite). Leads are saved BEFORE the email is sent, so a
// submission is never lost if Resend fails. DB file defaults to
// data/submissions.db (gitignored); override with SUBMISSIONS_DB_PATH.
//
// NOTE: node:sqlite requires Node 24+ and a persistent filesystem (Node
// server / VPS — not serverless/edge). On ephemeral hosts, replace this module
// with a hosted DB behind the same saveSubmission / markEmailStatus interface.

const DB_PATH =
  process.env.SUBMISSIONS_DB_PATH ??
  path.join(process.cwd(), "data", "submissions.db");

let db: DatabaseSync | null = null;

function getDb(): DatabaseSync {
  if (db) return db;
  mkdirSync(path.dirname(DB_PATH), { recursive: true });
  const d = new DatabaseSync(DB_PATH);
  d.exec(`
    CREATE TABLE IF NOT EXISTS submissions (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at   TEXT    NOT NULL,
      form         TEXT    NOT NULL,
      name         TEXT,
      email        TEXT,
      phone        TEXT,
      message      TEXT,
      source       TEXT,
      ip           TEXT,
      email_status TEXT    NOT NULL DEFAULT 'pending'
    );
  `);
  db = d;
  return d;
}

export type NewSubmission = {
  form: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  source?: string;
  ip?: string;
};

// Returns the new row id, or null if persistence failed (never throws — a DB
// error must not break the form submission).
export function saveSubmission(s: NewSubmission): number | null {
  try {
    const stmt = getDb().prepare(
      `INSERT INTO submissions (created_at, form, name, email, phone, message, source, ip)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    );
    const info = stmt.run(
      new Date().toISOString(),
      s.form,
      s.name,
      s.email,
      s.phone ?? "",
      s.message,
      s.source ?? "",
      s.ip ?? ""
    );
    return Number(info.lastInsertRowid);
  } catch (err) {
    console.error("[db] failed to save submission:", err);
    return null;
  }
}

export function markEmailStatus(id: number, status: "sent" | "failed"): void {
  try {
    getDb()
      .prepare(`UPDATE submissions SET email_status = ? WHERE id = ?`)
      .run(status, id);
  } catch (err) {
    console.error("[db] failed to update email_status:", err);
  }
}

export function listSubmissions(limit = 100): unknown[] {
  try {
    return getDb()
      .prepare(`SELECT * FROM submissions ORDER BY id DESC LIMIT ?`)
      .all(limit);
  } catch (err) {
    console.error("[db] failed to list submissions:", err);
    return [];
  }
}
