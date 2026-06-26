import Link from "next/link";
import { nav } from "@/content/site";

export default function NotFound() {
  return (
    <section className="section" style={{ textAlign: "center" }}>
      <div className="container" style={{ maxWidth: 640 }}>
        <p
          className="eyebrow"
          style={{ fontSize: "4rem", display: "block", marginBottom: 8 }}
        >
          404
        </p>
        <h1>Page Not Found</h1>
        <p className="lead">
          Sorry, we couldn&apos;t find the page you were looking for. It may have
          moved or no longer exists.
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: 24,
          }}
        >
          <Link href="/" className="btn btn-primary">
            Back to Home
          </Link>
          <Link href="/contact-us" className="btn btn-ghost">
            Contact Us
          </Link>
        </div>
        <nav
          aria-label="Helpful links"
          style={{ marginTop: 40, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}
        >
          {nav
            .filter((n) => ["Services", "Prices", "Gallery", "Locations"].includes(n.label))
            .map((n) => (
              <Link key={n.href} href={n.href}>
                {n.label}
              </Link>
            ))}
        </nav>
      </div>
    </section>
  );
}
