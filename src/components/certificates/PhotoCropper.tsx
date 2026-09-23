"use client";

import { useId, useRef } from "react";
import { PhotoLayer } from "@/components/certificates/CertificateSvg";
import { clampPhoto, type Frame, type Photo } from "@/lib/certificates/geometry";
import { cn } from "@/lib/cn";

/**
 * Drag to pan, slide to zoom. Renders the photo with the SAME PhotoLayer the
 * certificate uses, over a viewBox that is exactly the frame - so the crop
 * here is pixel-for-pixel what prints. Arrow keys pan for keyboard users.
 */
export default function PhotoCropper({
  frame,
  photo,
  name,
  onChange,
}: {
  frame: Frame;
  photo: Photo;
  name: string;
  onChange: (next: Photo) => void;
}) {
  const box = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; start: Photo } | null>(null);
  const clipId = `crop-${useId().replace(/[^a-zA-Z0-9-]/g, "")}`;
  const zoomId = useId();

  // The cropper's own view of the frame, positioned at 0,0.
  const local: Frame = { ...frame, x: 0, y: 0 };
  const set = (next: Photo) => onChange(clampPhoto(next, local));

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, start: photo };
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    const el = box.current;
    if (!d || !el) return;
    // Screen pixels -> certificate units.
    const k = local.w / el.getBoundingClientRect().width;
    set({ ...d.start, x: d.start.x + (e.clientX - d.x) * k, y: d.start.y + (e.clientY - d.y) * k });
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const step = e.shiftKey ? 40 : 10;
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    const move = moves[e.key];
    if (!move) return;
    e.preventDefault();
    set({ ...photo, x: photo.x + move[0], y: photo.y + move[1] });
  }

  return (
    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
      <div
        ref={box}
        role="img"
        tabIndex={0}
        aria-label="Photo position. Drag, or use the arrow keys, to move it."
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={() => (drag.current = null)}
        onPointerCancel={() => (drag.current = null)}
        onKeyDown={onKeyDown}
        className={cn(
          "relative shrink-0 cursor-grab touch-none select-none overflow-hidden bg-cream-dark active:cursor-grabbing",
          frame.shape === "circle" ? "size-36 rounded-full" : "h-52 rounded-2xl",
        )}
        style={frame.shape === "circle" ? undefined : { aspectRatio: `${frame.w} / ${frame.h}` }}
      >
        <svg viewBox={`0 0 ${local.w} ${local.h}`} className="pointer-events-none size-full" aria-hidden="true">
          <PhotoLayer frame={local} photo={photo} clipId={clipId} name={name} />
        </svg>
      </div>

      <div className="w-full max-w-56">
        <label htmlFor={zoomId} className="text-[0.85rem] font-medium">
          Zoom
        </label>
        <input
          id={zoomId}
          type="range"
          min={1}
          max={3}
          step={0.01}
          value={photo.scale}
          onChange={(e) => set({ ...photo, scale: Number(e.target.value) })}
          className="mt-2 w-full accent-[var(--color-ink)]"
        />
        <p className="mt-1.5 text-[0.78rem] text-ink-soft/70">Drag the photo to position it.</p>
      </div>
    </div>
  );
}
