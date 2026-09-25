import type { SVGProps } from "react";

/**
 * DevFest icon set: 24px line icons at a slightly heavier stroke than the
 * site's, to sit next to Poppins. Colour comes from `currentColor`, so a
 * parent sets it (the template pairs blue and orange).
 */
type IconProps = SVGProps<SVGSVGElement>;

const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Svg({ children, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...line} {...props}>
      {children}
    </svg>
  );
}

/** Filled airliner silhouette, nose pointing right. */
export function Plane(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M21.6 11.2c.6.3.6 1.2 0 1.5l-2 .9-5.3.1-4.5 6.6a.9.9 0 0 1-.8.4H7.7a.6.6 0 0 1-.6-.8l2.4-6.2-4 .1-1.7 2.3a.7.7 0 0 1-.6.3H2.2a.4.4 0 0 1-.4-.5l.8-3.9-.8-3.9a.4.4 0 0 1 .4-.5h1c.2 0 .4.1.6.3l1.7 2.3 4 .1L7.1 4.1a.6.6 0 0 1 .6-.8H9a.9.9 0 0 1 .8.4l4.5 6.6 5.3.1Z"
      />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4.5 12h15M13.5 6l6 6-6 6" />
    </Svg>
  );
}

export function ArrowDown(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 4.5v15M6 13.5l6 6 6-6" />
    </Svg>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m6 9 6 6 6-6" />
    </Svg>
  );
}

export function Check(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Svg>
  );
}

export function Pin(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 21s7-6.2 7-11.5a7 7 0 1 0-14 0C5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </Svg>
  );
}

export function People(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M15.8 14.2a4.4 4.4 0 0 1 4.7 4.8" />
    </Svg>
  );
}

export function Routes(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="6" cy="18" r="2.2" />
      <circle cx="18" cy="6" r="2.2" />
      <path d="M8.2 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.8" />
    </Svg>
  );
}

export function Calendar(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </Svg>
  );
}

export function Ticket(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3.5 8.5V6.5a1 1 0 0 1 1-1h15a1 1 0 0 1 1 1v2a2.5 2.5 0 0 0 0 5v2a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-2a2.5 2.5 0 0 0 0-5Z" />
      <path d="M14 6v2M14 11v2M14 16v1.5" />
    </Svg>
  );
}

export function Compass(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8Z" />
    </Svg>
  );
}

export function Book(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 6.5C10.3 5.2 7.9 4.5 4 4.5v13c3.9 0 6.3.7 8 2 1.7-1.3 4.1-2 8-2v-13c-3.9 0-6.3.7-8 2Z" />
      <path d="M12 6.5v13" />
    </Svg>
  );
}

export function Hammer(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m14.5 6.5 3 3M12.2 8.8l-7.7 7.7a1.8 1.8 0 0 0 2.5 2.5l7.7-7.7" />
      <path d="m11 5 3.5-2.5L21 9l-2.5 3.5Z" />
    </Svg>
  );
}

export function Chat(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M20 11.5a7.5 7.5 0 0 1-11 6.6L4 19.5l1.4-4.5A7.5 7.5 0 1 1 20 11.5Z" />
      <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" />
    </Svg>
  );
}

export function Party(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 20 8.5 7.5 16.5 15.5Z" />
      <path d="M14 4.5c.5 1-.2 2.2-1.3 2.5M19.5 10c-1-.5-2.2.2-2.5 1.3M17.5 3.5v2M20.5 6.5h-2M12.5 10.5l3-3" />
    </Svg>
  );
}

export function Code(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m8.5 16.5-4.5-4.5 4.5-4.5M15.5 7.5l4.5 4.5-4.5 4.5M13.5 5l-3 14" />
    </Svg>
  );
}

export function Briefcase(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="7.5" width="18" height="12" rx="2.5" />
      <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M3 12.5h18" />
    </Svg>
  );
}

export function Spark(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M13 3 5.5 13.5H12L11 21l7.5-10.5H12Z" />
    </Svg>
  );
}

export function Badge(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="5" y="3.5" width="14" height="17" rx="2.5" />
      <path d="M9.5 3.5v2h5v-2M9 15.5h6M10 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z" />
    </Svg>
  );
}

export function Board(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="2.5" y="4" width="19" height="13" rx="2" />
      <path d="M6 8h6M6 11h4M14.5 8H18M14.5 11H18M8.5 20.5h7M12 17v3.5" />
    </Svg>
  );
}

export function Camera(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 8.5a2 2 0 0 1 2-2h2l1.5-2h5L16 6.5h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
      <circle cx="12" cy="12.5" r="3.5" />
    </Svg>
  );
}

export function Seed(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 21v-8M12 13c0-4 3-7 7.5-7 0 4.5-3 7-7.5 7ZM12 15.5C12 12 9.5 9.5 5 9.5c0 3.8 2.5 6 7 6Z" />
    </Svg>
  );
}

export function Stamp(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9.5 12.5 8 5.5a4 4 0 1 1 8 0l-1.5 7" />
      <path d="M5 16a3.5 3.5 0 0 1 3.5-3.5h7A3.5 3.5 0 0 1 19 16v1H5ZM5.5 20.5h13" />
    </Svg>
  );
}

export function Layers(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m12 3.5 9 4.5-9 4.5L3 8Z" />
      <path d="m3 12.5 9 4.5 9-4.5M3 16.5 12 21l9-4.5" />
    </Svg>
  );
}

export function Gate(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="6" y="3" width="12" height="18" rx="1.5" />
      <path d="M9.5 7h5M12 12.5v4M10 14.5l2 2 2-2" />
    </Svg>
  );
}

export function Store(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 10v9.5h16V10M3 6.5 4.5 3.5h15L21 6.5c0 1.9-1.6 3.5-3.5 3.5S14 8.4 14 6.5c0 1.9-1.6 3.5-3.5 3.5S7 8.4 7 6.5C7 8.4 5.4 10 3.5 10" />
      <path d="M10 19.5V14h4v5.5" />
    </Svg>
  );
}

export function Heart(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M12 20.5s-7.5-4.6-9.2-9.2C1.6 8 3.5 4.5 7 4.5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3.5 0 5.4 3.5 4.2 6.8C19.5 15.9 12 20.5 12 20.5Z"
      />
    </svg>
  );
}

export function Menu(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 7.5h16M4 12h16M4 16.5h16" />
    </Svg>
  );
}

export function Close(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Svg>
  );
}

/** Generic person silhouette for "announcing soon" speaker cards. */
export function Silhouette(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" {...props}>
      <circle cx="32" cy="24" r="12" fill="currentColor" />
      <path d="M10 60c1.5-12 10.5-20 22-20s20.5 8 22 20Z" fill="currentColor" />
    </svg>
  );
}

/** Rolling suitcase: the baggage-claim sign. */
export function Suitcase(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="5.5" y="7" width="13" height="12.5" rx="2" />
      <path d="M9.5 7V4.5h5V7M9.5 10.5v6M14.5 10.5v6M8 19.5v1.5M16 19.5v1.5" />
    </Svg>
  );
}

/** Closed passport booklet with its emblem. */
export function PassportBook(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <circle cx="12" cy="10.5" r="3.2" />
      <path d="M8.8 10.5h6.4M12 7.3c1 .9 1.5 2 1.5 3.2S13 12.8 12 13.7c-1-.9-1.5-2-1.5-3.2S11 8.2 12 7.3M9 17h6" />
    </Svg>
  );
}

/** Downward tray arrow, for downloading. */
export function Download(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M5 19.5h14" />
    </Svg>
  );
}

/** Share: a box with an arrow leaving it. */
export function Share(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3.5v11M8 7.5l4-4 4 4M7 11H5.5v9h13v-9H17" />
    </Svg>
  );
}
