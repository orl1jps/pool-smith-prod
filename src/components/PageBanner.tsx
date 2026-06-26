import Link from "next/link";

export function PageBanner({
  title,
  subtitle,
  image,
  crumbs = [],
}: {
  title: string;
  subtitle?: string;
  image?: string;
  crumbs?: { label: string; href?: string }[];
}) {
  return (
    <section
      className="page-banner"
      style={image ? { backgroundImage: `url(${image})` } : undefined}
    >
      <div className="container">
        <h1>{title}</h1>
        {subtitle && <p className="lead" style={{ color: "#dbe9f3" }}>{subtitle}</p>}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label}>
              <span aria-hidden="true">/</span>{" "}
              {c.href ? <Link href={c.href}>{c.label}</Link> : <span>{c.label}</span>}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}
