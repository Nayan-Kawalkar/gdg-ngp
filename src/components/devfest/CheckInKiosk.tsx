"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Container } from "@/components/ui/Section";
import { DfIntro } from "@/components/devfest/ui";
import { Download, Share } from "@/components/devfest/icons";
import { routeTone } from "@/components/devfest/routeTone";
import { devfestCheckIn, devfestRoutes } from "@/data/devfest";
import {
  PASS_FONTS,
  PREVIEW_H,
  PREVIEW_W,
  drawPreview,
  gateFor,
  renderShareImage,
  seatFor,
  type Cabin,
  type PassDetails,
} from "@/lib/devfest/boardingPass";
import { ROUTE_COUNT, setPassengerName, stampRoute, usePassport, type RouteId } from "@/lib/devfest/passport";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

const cabins: { id: Cabin; label: string }[] = [
  { id: "first", label: "First Class" },
  { id: "business", label: "Business Class" },
];

const noSubscribe = () => () => {};
const canShareFiles = () => typeof navigator !== "undefined" && typeof navigator.canShare === "function";

/**
 * Self check-in: a kiosk where visitors type their name, pick a route and a
 * cabin, and "print" a souvenir boarding pass that slides out of the slot.
 * The pass is drawn live on a canvas (lib/devfest/boardingPass.ts); saving
 * or sharing renders it over a sky at 1200x630. Everything stays in the
 * browser. Picking a route here also stamps it in the passport.
 */
export default function CheckInKiosk() {
  const passport = usePassport();
  const [routeId, setRouteId] = useState<RouteId>("explore");
  const [cabin, setCabin] = useState<Cabin>("first");
  const [assets, setAssets] = useState(0);
  const [saved, setSaved] = useState("");
  const canShare = useSyncExternalStore(noSubscribe, canShareFiles, () => false);
  const canvas = useRef<HTMLCanvasElement>(null);
  const paper = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLImageElement | null>(null);

  const route = devfestRoutes.find((r) => r.id === routeId) ?? devfestRoutes[0];
  const complete = passport.stamps.length === ROUTE_COUNT;
  const pass: PassDetails = { name: passport.name, route, cabin, complete };
  const seat = passport.name.trim() ? seatFor(passport.name, route.id, cabin) : null;

  // The logo and Poppins weights, then redraw with them.
  useEffect(() => {
    let alive = true;
    const img = new Image();
    img.src = "/devfest/devfest-logo.png";
    img
      .decode()
      .then(() => {
        if (!alive) return;
        logo.current = img;
        setAssets((n) => n + 1);
      })
      .catch(() => {});
    Promise.all(PASS_FONTS.map((f) => document.fonts.load(f)))
      .then(() => alive && setAssets((n) => n + 1))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (canvas.current) drawPreview(canvas.current, { name: passport.name, route, cabin, complete }, logo.current);
  }, [passport.name, route, cabin, complete, assets]);

  /** The pass feeding out of the printer slot. */
  const feed = useCallback(() => {
    if (prefersReducedMotion()) return;
    paper.current?.animate(
      [
        { transform: "translateY(-101%)" },
        { transform: "translateY(-45%)", offset: 0.45 },
        { transform: "translateY(-47%)", offset: 0.55 },
        { transform: "translateY(0)" },
      ],
      { duration: 1300, easing: "cubic-bezier(0.25, 0.8, 0.3, 1)" },
    );
  }, []);

  // Print once when the kiosk first comes into view.
  useEffect(() => {
    const el = paper.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        feed();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [feed]);

  const pickRoute = (id: RouteId) => {
    setRouteId(id);
    stampRoute(id);
    setSaved("");
    feed();
  };

  const pickCabin = (id: Cabin) => {
    setCabin(id);
    setSaved("");
    feed();
  };

  const fileName = () => {
    const slug = passport.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return `devfest-nagpur-2026-boarding-pass${slug ? `-${slug}` : ""}.png`;
  };

  const toBlob = () =>
    new Promise<Blob | null>((resolve) => renderShareImage(pass, logo.current).toBlob(resolve, "image/png"));

  const download = async () => {
    const blob = await toBlob();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName();
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 4000);
    setSaved("Pass saved - check your downloads.");
  };

  const share = async () => {
    const blob = await toBlob();
    if (!blob) return;
    const file = new File([blob], fileName(), { type: "image/png" });
    if (!navigator.canShare?.({ files: [file] })) {
      await download();
      return;
    }
    try {
      await navigator.share({ files: [file], title: "DevFest Nagpur 2026", text: devfestCheckIn.shareText });
      setSaved("Shared. See you on board!");
    } catch {
      // closed the share sheet: nothing to do
    }
  };

  const described = `${passport.name.trim() || "Your name"}, ${route.name} route, ${
    cabin === "first" ? "First Class" : "Business Class"
  }, gate ${gateFor(route)}${seat ? `, seat ${seat}` : ""}${complete ? ", with the 5 of 5 passport stamp" : ""}.`;

  return (
    <section
      id="check-in"
      aria-labelledby="checkin-title"
      className="relative scroll-mt-20 overflow-hidden bg-linear-to-b from-df-paper to-df-mist/70 py-20 lg:py-28"
    >
      <Container>
        <DfIntro
          headingId="checkin-title"
          eyebrow={devfestCheckIn.eyebrow}
          title={devfestCheckIn.title}
          sub={devfestCheckIn.sub}
        />

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,25rem)_1fr] lg:gap-14">
          {/* The kiosk */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void download();
            }}
            className="rounded-[2rem] bg-df-midnight p-2.5 shadow-[0_30px_60px_-30px_rgba(4,30,68,0.6)]"
          >
            <div className="rounded-[1.6rem] bg-white p-5 sm:p-7">
              <p className="flex items-center justify-between gap-3 font-df text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-df-slate">
                <span>Flight DF26 &middot; Self check-in</span>
                <span className="flex items-center gap-1.5 text-green-deep">
                  <span aria-hidden="true" className="size-2 rounded-full bg-brand-green" />
                  Open
                </span>
              </p>

              <label htmlFor="pass-name" className="mt-6 block font-df text-[0.85rem] font-semibold text-df-navy">
                1. Passenger name
              </label>
              <input
                id="pass-name"
                value={passport.name}
                onChange={(e) => {
                  setPassengerName(e.target.value);
                  setSaved("");
                }}
                maxLength={22}
                autoComplete="name"
                placeholder="Your name"
                className="mt-2 h-12 w-full rounded-xl border border-df-mist bg-df-paper px-4 font-df text-[1rem] font-medium uppercase tracking-wide text-df-navy placeholder:normal-case placeholder:tracking-normal placeholder:text-df-slate/60 focus:border-df-blue focus:outline-none focus:ring-2 focus:ring-df-blue/20"
              />

              <fieldset className="mt-6">
                <legend className="font-df text-[0.85rem] font-semibold text-df-navy">2. Your route</legend>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {devfestRoutes.map((r) => {
                    const checked = r.id === routeId;
                    return (
                      <label
                        key={r.id}
                        className={cn(
                          "flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 font-df text-[0.85rem] font-medium transition-colors duration-200 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-df-amber",
                          checked
                            ? "border-df-midnight bg-df-midnight text-white"
                            : "border-df-mist bg-white text-df-navy hover:border-df-steel",
                        )}
                      >
                        <input
                          type="radio"
                          name="pass-route"
                          value={r.id}
                          checked={checked}
                          onChange={() => pickRoute(r.id)}
                          className="sr-only"
                        />
                        <span aria-hidden="true" className={cn("size-2.5 shrink-0 rounded-full", routeTone[r.color].dot)} />
                        {r.name}
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset className="mt-6">
                <legend className="font-df text-[0.85rem] font-semibold text-df-navy">3. Cabin</legend>
                <div className="mt-2 grid grid-cols-2 gap-1 rounded-xl bg-df-mist/70 p-1">
                  {cabins.map((c) => {
                    const checked = c.id === cabin;
                    return (
                      <label
                        key={c.id}
                        className={cn(
                          "flex cursor-pointer items-center justify-center rounded-lg px-3 py-2 font-df text-[0.85rem] font-semibold transition-colors duration-200 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-df-amber",
                          checked ? "bg-white text-df-navy shadow-sm" : "text-df-slate hover:text-df-navy",
                        )}
                      >
                        <input
                          type="radio"
                          name="pass-cabin"
                          value={c.id}
                          checked={checked}
                          onChange={() => pickCabin(c.id)}
                          className="sr-only"
                        />
                        {c.label}
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="press group inline-flex h-12 items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--color-df-amber),var(--color-df-orange))] px-6 font-df text-[0.95rem] font-semibold text-white shadow-[0_12px_24px_-12px_rgba(254,76,1,0.7)] transition-[filter] duration-300 hover:brightness-105"
                >
                  Download pass
                  <Download aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </button>
                {canShare ? (
                  <button
                    type="button"
                    onClick={() => void share()}
                    className="press inline-flex h-12 items-center gap-2 rounded-full border border-df-midnight/35 bg-white px-5 font-df text-[0.95rem] font-semibold text-df-navy transition-colors duration-300 hover:border-df-midnight"
                  >
                    Share
                    <Share aria-hidden="true" className="size-4" />
                  </button>
                ) : null}
              </div>
              <p role="status" className="mt-3 min-h-[1.25rem] text-[0.85rem] text-df-slate">
                {saved}
              </p>
            </div>
          </form>

          {/* The printer: the pass feeds out of the slot */}
          <div className="lg:pt-6">
            <div className="relative z-10 mx-auto h-4 w-[94%] rounded-full bg-df-ink shadow-[inset_0_3px_6px_rgba(0,0,0,0.65),0_1px_0_rgba(255,255,255,0.8)]" />
            <div className="-mt-2 overflow-hidden pb-2 pt-1.5">
              <div ref={paper}>
                <canvas
                  ref={canvas}
                  width={PREVIEW_W}
                  height={PREVIEW_H}
                  role="img"
                  aria-label={`Boarding pass preview: ${described}`}
                  className="block h-auto w-full"
                />
              </div>
            </div>
            <p className="text-center text-[0.85rem] text-df-slate">
              {complete ? devfestCheckIn.bonusDone : devfestCheckIn.bonus}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
