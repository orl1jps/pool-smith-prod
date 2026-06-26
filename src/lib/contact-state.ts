// Shared, client-safe contact constants/types. LEAF module — imports nothing
// server-side, so both the client form and server code can import from here
// without dragging server code into the client bundle.

export const HONEYPOT_FIELD = "your-website";

export type ContactState = { ok: boolean; message: string };
export const CONTACT_INITIAL: ContactState = { ok: false, message: "" };
