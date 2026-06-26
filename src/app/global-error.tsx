"use client";

// Custom global error boundary. Replaces Next's default _global-error page.

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui, Arial, sans-serif",
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          margin: 0,
          background: "#f5f7f9",
          color: "#1f2a33",
        }}
      >
        <div style={{ textAlign: "center", padding: 24, maxWidth: 460 }}>
          <h1 style={{ color: "#005395", marginBottom: 8 }}>Something went wrong</h1>
          <p style={{ color: "#5a6670" }}>
            Sorry — an unexpected error occurred. Please try again, or call us at{" "}
            <a href="tel:8449857665" style={{ color: "#005395" }}>
              844-985-7665
            </a>
            .
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: 16,
              padding: "12px 28px",
              borderRadius: 999,
              border: 0,
              background: "#005395",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
