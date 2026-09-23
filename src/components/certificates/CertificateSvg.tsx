import type { Ref } from "react";
import { tierMeta, type Volunteer } from "@/data/volunteers";
import {
  CERT_H,
  CERT_W,
  fitFontSize,
  initials,
  photoFrame,
  photoPlacement,
  wrap,
  type Frame,
  type Photo,
} from "@/lib/certificates/geometry";
import { C, FONT_DISPLAY, FONT_SANS, fontFaceCss } from "@/lib/certificates/palette";

const display = `"${FONT_DISPLAY}", sans-serif`;
const sans = `"${FONT_SANS}", sans-serif`;
const brand = [C.blue, C.red, C.yellow, C.green];

const issued = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/**
 * The photo inside its frame, clipped. Shared with the crop tool so what you
 * position there is exactly what prints.
 */
export function PhotoLayer({
  frame,
  photo,
  clipId,
  name,
}: {
  frame: Frame;
  photo: Photo | null;
  clipId: string;
  name: string;
}) {
  const place = photo ? photoPlacement(photo, frame) : null;
  return (
    <>
      <clipPath id={clipId}>
        {frame.shape === "circle" ? (
          <circle cx={frame.x + frame.w / 2} cy={frame.y + frame.h / 2} r={frame.w / 2} />
        ) : (
          <rect x={frame.x} y={frame.y} width={frame.w} height={frame.h} rx={frame.r ?? 0} />
        )}
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <rect x={frame.x} y={frame.y} width={frame.w} height={frame.h} fill={C.blueSoft} />
        {photo && place ? (
          <image
            href={photo.src}
            x={place.x}
            y={place.y}
            width={place.w}
            height={place.h}
            preserveAspectRatio="none"
          />
        ) : (
          <text
            x={frame.x + frame.w / 2}
            y={frame.y + frame.h / 2}
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily={display}
            fontWeight={500}
            fontSize={frame.shape === "circle" ? 84 : 170}
            fill={C.blueDeep}
            opacity={0.55}
          >
            {initials(name) || "?"}
          </text>
        )}
      </g>
    </>
  );
}

function BrandBar({ x, y }: { x: number; y: number }) {
  return (
    <g>
      {brand.map((fill, i) => (
        <rect key={fill} x={x + i * 46} y={y} width={40} height={6} rx={3} fill={fill} />
      ))}
    </g>
  );
}

function Header({ x, right, markHref }: { x: number; right: number; markHref: string }) {
  return (
    <g>
      <image href={markHref} x={x} y={122} width={100} height={56} />
      <text x={x + 120} y={157} fontFamily={display} fontWeight={500} fontSize={36} fill={C.ink} letterSpacing={-0.8}>
        GDG Nagpur
      </text>
      <text x={x + 120} y={186} fontFamily={sans} fontSize={18} fill={C.inkSoft}>
        Google Developer Groups
      </text>
      <text x={right} y={150} textAnchor="end" fontFamily={sans} fontWeight={500} fontSize={14} letterSpacing={3} fill={C.inkSoft}>
        CERTIFICATE NO.
      </text>
    </g>
  );
}

function Signature({ x, y, organizer }: { x: number; y: number; organizer: string }) {
  return (
    <g>
      <text x={x} y={y - 22} fontFamily={display} fontSize={34} fill={C.ink} letterSpacing={-0.5}>
        {organizer}
      </text>
      <line x1={x} x2={x + 360} y1={y} y2={y} stroke={C.ink} strokeOpacity={0.25} strokeWidth={2} />
      <text x={x} y={y + 34} fontFamily={sans} fontSize={18} fill={C.inkSoft}>
        Organizer, GDG Nagpur
      </text>
    </g>
  );
}

function Issued({ x, y, date }: { x: number; y: number; date: string }) {
  return (
    <g>
      <text x={x} y={y - 22} fontFamily={display} fontSize={30} fill={C.ink}>
        {issued.format(new Date(`${date}T00:00:00Z`))}
      </text>
      <line x1={x} x2={x + 280} y1={y} y2={y} stroke={C.ink} strokeOpacity={0.25} strokeWidth={2} />
      <text x={x} y={y + 34} fontFamily={sans} fontSize={18} fill={C.inkSoft}>
        Date of issue
      </text>
    </g>
  );
}

/**
 * One certificate, three templates (PRD 13). Pure SVG with literal colours and
 * its own @font-face so it exports as a self-contained image; see
 * lib/certificates/export.ts for how fonts and images are inlined.
 */
export default function CertificateSvg({
  volunteer,
  name,
  designation,
  photo,
  organizer,
  idPrefix = "cert",
  markHref = "/gdg-mark.svg",
  svgRef,
  className,
}: {
  volunteer: Volunteer;
  name: string;
  designation: string;
  photo: Photo | null;
  organizer: string;
  idPrefix?: string;
  markHref?: string;
  svgRef?: Ref<SVGSVGElement>;
  className?: string;
}) {
  const tier = volunteer.tier;
  const meta = tierMeta[tier];
  const frame = photoFrame(tier);
  const shownName = name.trim() || "Your name";

  const outstanding = tier === "outstanding";
  const star = tier === "star";

  // Content column
  const left = outstanding ? 660 : 150;
  const right = 1450;
  const nameX = star ? 410 : left;
  const nameMax = right - nameX;
  const nameSize = fitFontSize(shownName, nameMax, outstanding ? 92 : 104);
  const contribution = wrap(`for ${volunteer.contribution}`, outstanding ? 58 : 84);

  const titleLines = outstanding ? ["Outstanding", "Contributor"] : [meta.title];

  // Vertical rhythm, shifted down for the two-line outstanding title so it
  // clears the "certificate of recognition" label above it.
  const titleY = outstanding ? 450 : 470;
  const lead = outstanding ? 625 : 560;
  const nameY = star ? 710 : outstanding ? 735 : 680;
  // "Volunteer / Volunteer" reads as a typo - drop the line when it repeats the title.
  const role = designation.trim() || meta.title;
  const showRole = role.toLowerCase() !== meta.title.toLowerCase();
  const designationY = nameY + 64;
  const contributionY = showRole ? designationY + 56 : nameY + 70;
  const footerY = outstanding ? 1010 : 990;

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${CERT_W} ${CERT_H}`}
      width={CERT_W}
      height={CERT_H}
      role="img"
      aria-label={`${meta.title} certificate for ${shownName}`}
      className={className}
    >
      <defs>
        <style>{fontFaceCss()}</style>
        <linearGradient id={`${idPrefix}-foil`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.blue} />
          <stop offset="0.35" stopColor={C.red} />
          <stop offset="0.65" stopColor={C.yellow} />
          <stop offset="1" stopColor={C.green} />
        </linearGradient>
      </defs>

      {/* Ground */}
      <rect width={CERT_W} height={CERT_H} fill={C.cream} />

      {/* Tier decoration */}
      {star ? (
        <>
          <circle cx={1540} cy={70} r={330} fill={C.blueMist} />
          <rect x={0} y={nameY - 115} width={CERT_W} height={200} fill={C.blueMist} opacity={0.75} />
        </>
      ) : null}
      {outstanding ? (
        <circle cx={CERT_W} cy={CERT_H} r={280} fill={C.yellowSoft} opacity={0.7} />
      ) : null}

      {/* Photo */}
      {frame ? (
        <PhotoLayer frame={frame} photo={photo} clipId={`${idPrefix}-clip`} name={shownName} />
      ) : null}
      {star && frame ? (
        <circle
          cx={frame.x + frame.w / 2}
          cy={frame.y + frame.h / 2}
          r={frame.w / 2 + 8}
          fill="none"
          stroke={C.paper}
          strokeWidth={10}
        />
      ) : null}

      {/* Border */}
      {outstanding ? (
        <rect x={24} y={24} width={CERT_W - 48} height={CERT_H - 48} rx={30} fill="none" stroke={`url(#${idPrefix}-foil)`} strokeWidth={8} />
      ) : (
        <rect x={40} y={40} width={CERT_W - 80} height={CERT_H - 80} rx={36} fill="none" stroke={C.ink} strokeOpacity={0.1} strokeWidth={2} />
      )}

      {/* Rosette for the top tier, sitting on the photo's edge */}
      {outstanding ? (
        <g transform="translate(560 880)">
          <circle r={96} fill={C.yellow} />
          <circle r={78} fill="none" stroke={C.ink} strokeOpacity={0.25} strokeWidth={2} strokeDasharray="4 7" />
          <path
            d="M0 -46c4 27 19 42 46 46-27 4-42 19-46 46-4-27-19-42-46-46 27-4 42-19 46-46Z"
            fill={C.ink}
          />
        </g>
      ) : null}

      <Header x={left} right={right} markHref={markHref} />
      <text x={right} y={182} textAnchor="end" fontFamily={display} fontSize={24} fill={C.ink}>
        {volunteer.certificateId}
      </text>

      <BrandBar x={left} y={290} />
      <text x={left} y={345} fontFamily={sans} fontWeight={500} fontSize={20} letterSpacing={5} fill={C.inkSoft}>
        CERTIFICATE OF RECOGNITION
      </text>

      {titleLines.map((line, i) => (
        <text
          key={line}
          x={left}
          y={titleY + i * 90}
          fontFamily={display}
          fontSize={outstanding ? 88 : 92}
          letterSpacing={-3}
          fill={C.ink}
        >
          {line}
        </text>
      ))}

      <text x={left} y={lead} fontFamily={sans} fontSize={24} fill={C.inkSoft}>
        {outstanding ? "Presented with gratitude to" : "This certifies that"}
      </text>

      <text
        x={nameX}
        y={nameY}
        fontFamily={display}
        fontWeight={500}
        fontSize={nameSize}
        letterSpacing={-nameSize * 0.03}
        fill={name.trim() ? C.ink : C.inkSoft}
        fillOpacity={name.trim() ? 1 : 0.4}
      >
        {shownName}
      </text>

      {showRole ? (
        <text x={nameX} y={designationY} fontFamily={sans} fontWeight={500} fontSize={30} fill={C.blueDeep}>
          {role}
        </text>
      ) : null}

      {contribution.map((line, i) => (
        <text
          key={i}
          x={star ? nameX : left}
          y={contributionY + i * 38}
          fontFamily={sans}
          fontSize={26}
          fill={C.inkSoft}
        >
          {line}
        </text>
      ))}

      <Signature x={left} y={footerY} organizer={organizer} />
      <Issued x={outstanding ? left + 460 : 700} y={footerY} date={volunteer.issuedOn} />

      {/* Four-dot brand mark, bottom right */}
      {!outstanding ? (
        <g transform={`translate(${right - 70} ${footerY - 38})`}>
          <circle cx={12} cy={12} r={11} fill={C.blue} />
          <circle cx={44} cy={12} r={11} fill={C.red} />
          <circle cx={12} cy={44} r={11} fill={C.yellow} />
          <circle cx={44} cy={44} r={11} fill={C.green} />
        </g>
      ) : null}
    </svg>
  );
}
