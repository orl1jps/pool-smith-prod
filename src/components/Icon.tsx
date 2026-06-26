// Inline SVG icons replacing the theme's icon font (no webfont request).
// Clean single-stroke line icons sized via the parent's font-size/width.

export type IconName =
  | "pool"
  | "waterpolo"
  | "wrench"
  | "medal"
  | "handshake"
  | "test-tube"
  | "sweep"
  | "clock"
  | "phone"
  | "mail"
  | "mapPin"
  | "check"
  | "shield"
  | "droplet";

const paths: Record<IconName, React.ReactNode> = {
  pool: (
    <>
      <path d="M2 16c1.5 0 1.5 1.2 3 1.2S8.5 16 10 16s1.5 1.2 3 1.2S16.5 16 18 16s1.5 1.2 3 1.2" />
      <path d="M7 16V5a2 2 0 0 1 4 0v11M13 16V5a2 2 0 0 1 4 0v11" />
      <path d="M7 10h4M13 10h4" />
    </>
  ),
  waterpolo: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </>
  ),
  wrench: (
    <path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L4 16.8a2 2 0 0 0 2.8 2.8l5.3-5.3a4 4 0 0 0 5.2-5.4l-2.6 2.6-2.1-.5-.5-2.1z" />
  ),
  medal: (
    <>
      <circle cx="12" cy="14" r="5" />
      <path d="M12 12.5 13 15l-1-.7-1 .7zM8.5 9 6 3M15.5 9 18 3M9.5 4.5 12 9l2.5-4.5" />
    </>
  ),
  handshake: (
    <path d="m11 17 2 2a1 1 0 0 0 3-3M6 13l3.5 3.5a1 1 0 0 0 3-3l-1.5-1.5M21 9l-3-3-5 1-3 3M3 9l3-3 4 1M3 9v5l3 3M21 9v5l-2 2" />
  ),
  "test-tube": (
    <path d="M14.5 3 6 11.5a3 3 0 0 0 4.2 4.2L18.7 7.2M9 8l4 4M7 15h4" />
  ),
  sweep: (
    <path d="M19 3 9 13M16 6l-1.5 4.5L9 16l-2-2 5.5-5.5L17 7M7 14l-3 6 6-3M4 20l3-1" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  phone: (
    <path d="M5 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L17 16l5 2v3a1 1 0 0 1-1 1A18 18 0 0 1 3 4a1 1 0 0 1 1-1z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  mapPin: (
    <>
      <path d="M12 22s7-7.6 7-13a7 7 0 1 0-14 0c0 5.4 7 13 7 13z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
  check: <path d="m4 12 5 5L20 6" />,
  shield: <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />,
  droplet: <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />,
};

export function Icon({
  name,
  className,
  size = 24,
}: {
  name: IconName;
  className?: string;
  size?: number;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
