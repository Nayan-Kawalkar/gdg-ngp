/**
 * Volunteer certificates (PRD 13).
 *
 * Each selected volunteer gets a private link: /certificates/<token>.
 *
 * FRONTEND-ONLY LIMITATION: these tokens ship in the JS bundle, so the pages
 * are unlisted (noindex, robots-disallowed, linked from nowhere) but not truly
 * private. Real privacy needs the backend phase: tokens issued and checked
 * server-side, plus the admin side the PRD describes (choose who gets which
 * tier, send links, track downloads and LOR requests).
 *
 * TODO(certificates): the three volunteers below are PLACEHOLDERS, one per
 * tier, so every template can be reviewed.
 */

export type CertificateTier = "volunteer" | "star" | "outstanding";

export type Volunteer = {
  /** Long, unguessable. Never a name or an incrementing number. */
  token: string;
  name: string;
  tier: CertificateTier;
  /** Pre-filled by organizers; editable on star/outstanding tiers only. */
  designation: string;
  /** What it is for - rendered as "for ...". */
  contribution: string;
  /** ISO date */
  issuedOn: string;
  certificateId: string;
};

export const tierMeta: Record<
  CertificateTier,
  { title: string; label: string; photo: "none" | "circle" | "portrait"; editableDesignation: boolean }
> = {
  volunteer: { title: "Volunteer", label: "Basic", photo: "none", editableDesignation: false },
  star: { title: "Star Contributor", label: "Intermediate", photo: "circle", editableDesignation: true },
  outstanding: {
    title: "Outstanding Contributor",
    label: "Advanced",
    photo: "portrait",
    editableDesignation: true,
  },
};

export const volunteers: Volunteer[] = [
  {
    token: "v7Kq2mX9pL4sT8wR3nB6yD1f",
    name: "Aarav Sharma",
    tier: "volunteer",
    designation: "Volunteer",
    contribution: "volunteering at DevFest Nagpur 2025",
    issuedOn: "2026-01-10",
    certificateId: "GDGNGP-2026-0107",
  },
  {
    token: "s3Hn8vQ1zK6cW4jY9tM2gP5e",
    name: "Isha Deshmukh",
    tier: "star",
    designation: "Event Lead, Registrations",
    contribution: "leading registrations across three flagship events in 2025-26",
    issuedOn: "2026-06-02",
    certificateId: "GDGNGP-2026-0214",
  },
  {
    token: "o5Tb1rF7xN3dZ8kV2hC6qJ4u",
    name: "Rohan Kulkarni",
    tier: "outstanding",
    designation: "Core Team, Programs",
    contribution: "building and running the Build with AI programme for two seasons",
    issuedOn: "2026-09-01",
    certificateId: "GDGNGP-2026-0301",
  },
];

export function getVolunteerByToken(token: string): Volunteer | undefined {
  return volunteers.find((v) => v.token === token);
}
