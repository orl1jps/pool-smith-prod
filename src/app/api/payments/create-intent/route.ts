import { NextResponse } from "next/server";
import {
  getStripe,
  dollarsToCents,
  MIN_PAYMENT,
  MAX_PAYMENT,
} from "@/lib/stripe";

export async function POST(request: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Online payments are not configured yet. Please call us to pay." },
      { status: 503 }
    );
  }

  let body: { amount?: unknown; name?: unknown; email?: unknown; note?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const amount = Number(body.amount);
  if (!Number.isFinite(amount) || amount < MIN_PAYMENT || amount > MAX_PAYMENT) {
    return NextResponse.json(
      { error: `Please enter an amount between $${MIN_PAYMENT} and $${MAX_PAYMENT}.` },
      { status: 400 }
    );
  }

  const name = typeof body.name === "string" ? body.name.trim().slice(0, 120) : "";
  const email = typeof body.email === "string" ? body.email.trim().slice(0, 160) : "";
  const note = typeof body.note === "string" ? body.note.trim().slice(0, 300) : "";

  try {
    const intent = await stripe.paymentIntents.create({
      amount: dollarsToCents(amount),
      currency: "usd",
      description: "Pool Smith payment",
      receipt_email: email || undefined,
      automatic_payment_methods: { enabled: true },
      metadata: {
        customer_name: name,
        customer_email: email,
        note,
        source: "pool-smith-payments",
      },
    });
    return NextResponse.json({ clientSecret: intent.client_secret });
  } catch (err) {
    console.error("[payments] failed to create PaymentIntent:", err);
    return NextResponse.json(
      { error: "We couldn't start the payment. Please try again or call us." },
      { status: 500 }
    );
  }
}
