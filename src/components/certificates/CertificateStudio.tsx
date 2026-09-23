"use client";

import { useCallback, useId, useRef, useState } from "react";
import CertificateSvg from "@/components/certificates/CertificateSvg";
import PhotoCropper from "@/components/certificates/PhotoCropper";
import LorDialog from "@/components/certificates/LorDialog";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Field";
import { IconDownload, IconUpload } from "@/components/ui/Icons";
import { tierMeta, type Volunteer } from "@/data/volunteers";
import { photoFrame, type Photo } from "@/lib/certificates/geometry";
import {
  certificateToPdf,
  certificateToPng,
  downloadBlob,
  readPhoto,
} from "@/lib/certificates/export";
import { isBlank } from "@/lib/validate";
import { cn } from "@/lib/cn";

const MAX_NAME = 40;

function fileSlug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "certificate";
}

/**
 * The private certificate page's working area: editor on the left, a live
 * preview on the right, downloads and the LOR request underneath.
 * Everything - including the photo - stays in the browser.
 */
export default function CertificateStudio({
  volunteer,
  organizer,
}: {
  volunteer: Volunteer;
  organizer: string;
}) {
  const meta = tierMeta[volunteer.tier];
  const frame = photoFrame(volunteer.tier);

  const [name, setName] = useState(volunteer.name);
  const [designation, setDesignation] = useState(volunteer.designation);
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [nameError, setNameError] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [busy, setBusy] = useState<"png" | "pdf" | null>(null);
  const [exportError, setExportError] = useState("");
  const [lorOpen, setLorOpen] = useState(false);
  // Stable, because Dialog re-runs its focus effect whenever onClose changes.
  const closeLor = useCallback(() => setLorOpen(false), []);

  const svgRef = useRef<SVGSVGElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const fileId = useId();
  const nameRef = useRef<HTMLDivElement>(null);

  async function onFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setPhotoError("That is not an image. Try a JPG or PNG.");
      return;
    }
    try {
      const read = await readPhoto(file);
      setPhoto({ ...read, x: 0, y: 0, scale: 1 });
      setPhotoError("");
    } catch (error) {
      setPhotoError(error instanceof Error ? error.message : "That photo could not be read.");
    }
  }

  async function download(kind: "png" | "pdf") {
    if (isBlank(name)) {
      setNameError("Add your name as it should appear.");
      nameRef.current?.querySelector("input")?.focus();
      return;
    }
    const svg = svgRef.current;
    if (!svg || busy) return;
    setBusy(kind);
    setExportError("");
    try {
      const blob = kind === "png" ? await certificateToPng(svg) : await certificateToPdf(svg);
      downloadBlob(blob, `gdg-nagpur-${fileSlug(meta.title)}-${fileSlug(name)}.${kind}`);
      // TODO(analytics): record the download for the organizers' tracker.
    } catch {
      setExportError("The download did not work. Try again, or use a recent Chrome, Edge or Safari.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
      {/* Preview - first on phones, so people see what they are editing */}
      <div className="lg:order-2">
        <div className="lg:sticky lg:top-28">
          <div
            data-reveal="scale"
            className={cn(
              "relative overflow-hidden rounded-[1.25rem] border border-black/8 bg-paper sm:rounded-[1.75rem]",
              volunteer.tier === "outstanding" && "animate-shine",
            )}
          >
            <CertificateSvg
              svgRef={svgRef}
              volunteer={volunteer}
              name={name}
              designation={designation}
              photo={photo}
              organizer={organizer}
              className="block h-auto w-full"
            />
          </div>
          <p className="mt-3 text-center text-[0.8rem] text-ink-soft/70">
            Live preview &middot; downloads at 3200 &times; 2262 px
          </p>
        </div>
      </div>

      {/* Editor */}
      <div className="lg:order-1">
        <div className="card-sticker p-7 sm:p-9">
          <span className="label-caps text-ink-soft/60">
            {meta.label} tier &middot; {meta.title}
          </span>

          <div className="mt-6 grid gap-6">
            <div ref={nameRef}>
              <TextField
                label="Name on the certificate"
                hint="Exactly as you want it printed."
                value={name}
                maxLength={MAX_NAME}
                autoComplete="name"
                onChange={(e) => {
                  setName(e.target.value);
                  if (nameError && !isBlank(e.target.value)) setNameError("");
                }}
                error={nameError}
              />
            </div>

            {meta.editableDesignation ? (
              <TextField
                label="Designation"
                hint="Pre-filled by the organizers. Adjust it if it is not quite right."
                value={designation}
                maxLength={48}
                onChange={(e) => setDesignation(e.target.value)}
              />
            ) : null}

            {frame ? (
              <div>
                <p className="text-[0.9rem] font-medium">
                  Photo{" "}
                  <span className="text-[0.78rem] font-normal text-ink-soft/60">Optional</span>
                </p>
                <p className="mt-1.5 text-[0.82rem] text-ink-soft/70">
                  {frame.shape === "circle"
                    ? "A clear head-and-shoulders shot works best."
                    : "A portrait photo works best - it fills the left panel."}{" "}
                  It never leaves your browser.
                </p>

                {photo ? (
                  <div className="mt-4">
                    <PhotoCropper frame={frame} photo={photo} name={name} onChange={setPhoto} />
                  </div>
                ) : null}

                <div className="mt-4 flex flex-wrap gap-2">
                  <input
                    ref={fileRef}
                    id={fileId}
                    type="file"
                    accept="image/*"
                    onChange={onFile}
                    // The button below is the control; this input is just the picker.
                    tabIndex={-1}
                    aria-hidden="true"
                    className="sr-only"
                  />
                  <Button
                    type="button"
                    variant="paper"
                    size="sm"
                    magnetic={false}
                    onClick={() => fileRef.current?.click()}
                  >
                    <IconUpload className="size-4" />
                    {photo ? "Change photo" : "Upload a photo"}
                  </Button>
                  {photo ? (
                    <Button type="button" variant="outline" size="sm" magnetic={false} onClick={() => setPhoto(null)}>
                      Remove
                    </Button>
                  ) : null}
                </div>
                {photoError ? (
                  <p role="alert" className="mt-2 text-[0.82rem] text-red-deep">
                    {photoError}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="mt-9 border-t border-ink/8 pt-7">
            <p className="text-[0.9rem] font-medium">Download</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <Button variant="ink" magnetic={false} onClick={() => download("pdf")} disabled={busy !== null}>
                <IconDownload className="size-4" />
                {busy === "pdf" ? "Preparing PDF..." : "PDF"}
              </Button>
              <Button variant="paper" magnetic={false} onClick={() => download("png")} disabled={busy !== null}>
                <IconDownload className="size-4" />
                {busy === "png" ? "Preparing PNG..." : "PNG image"}
              </Button>
            </div>
            <p aria-live="polite" className="mt-2 text-[0.82rem] text-red-deep">
              {exportError}
            </p>
          </div>
        </div>

        <div className="card-inset mt-5 flex flex-col items-start gap-4 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h2 className="text-[1.25rem] tracking-[-0.03em]">Need a recommendation letter?</h2>
            <p className="mt-1.5 text-[0.9rem] leading-relaxed text-ink-soft">
              The organizers write them by hand for volunteers.
            </p>
          </div>
          <Button variant="outline" magnetic={false} onClick={() => setLorOpen(true)}>
            Request an LOR
          </Button>
        </div>
      </div>

      <LorDialog
        open={lorOpen}
        onClose={closeLor}
        name={name}
        role={designation}
      />
    </div>
  );
}
