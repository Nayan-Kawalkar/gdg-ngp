"use client";

import { useId, type ReactNode, type TextareaHTMLAttributes, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const base =
  "w-full rounded-2xl border border-black/10 bg-paper px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink-soft/45 transition-colors duration-200 focus:border-brand-blue focus:outline-none";

const invalid = "border-brand-red/60 focus:border-brand-red";

function Label({
  htmlFor,
  children,
  optional,
}: {
  htmlFor: string;
  children: ReactNode;
  optional?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="flex items-baseline gap-2 text-[0.9rem] font-medium">
      {children}
      {optional ? (
        <span className="text-[0.78rem] font-normal text-ink-soft/60">Optional</span>
      ) : null}
    </label>
  );
}

function Error({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-[0.82rem] text-red-deep">
      {message}
    </p>
  );
}

/**
 * Text input with a real label, and an error that is wired to the control via
 * aria-describedby + aria-invalid so screen readers announce it.
 */
export function TextField({
  label,
  error,
  optional,
  hint,
  className,
  ...props
}: {
  label: string;
  error?: string;
  optional?: boolean;
  hint?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div className={className}>
      <Label htmlFor={id} optional={optional}>
        {label}
      </Label>
      {hint ? (
        <p id={hintId} className="mt-1.5 text-[0.82rem] text-ink-soft/70">
          {hint}
        </p>
      ) : null}
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={cn(error && errorId, hint && hintId) || undefined}
        className={cn(base, "mt-2", error && invalid)}
        {...props}
      />
      <Error id={errorId} message={error} />
    </div>
  );
}

export function TextAreaField({
  label,
  error,
  optional,
  hint,
  className,
  ...props
}: {
  label: string;
  error?: string;
  optional?: boolean;
  hint?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div className={className}>
      <Label htmlFor={id} optional={optional}>
        {label}
      </Label>
      {hint ? (
        <p id={hintId} className="mt-1.5 text-[0.82rem] text-ink-soft/70">
          {hint}
        </p>
      ) : null}
      <textarea
        id={id}
        rows={4}
        aria-invalid={error ? true : undefined}
        aria-describedby={cn(error && errorId, hint && hintId) || undefined}
        className={cn(base, "mt-2 resize-y", error && invalid)}
        {...props}
      />
      <Error id={errorId} message={error} />
    </div>
  );
}

export function SelectField({
  label,
  error,
  options,
  className,
  ...props
}: {
  label: string;
  error?: string;
  options: readonly { value: string; label: string }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <select
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(base, "mt-2 appearance-none pr-10", error && invalid)}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Error id={errorId} message={error} />
    </div>
  );
}

/** Multi-select rendered as toggle chips, exposed as a labelled checkbox group. */
export function ChipGroupField({
  label,
  options,
  value,
  onChange,
  error,
  className,
}: {
  label: string;
  options: readonly string[];
  value: string[];
  onChange: (next: string[]) => void;
  error?: string;
  className?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <fieldset className={className} aria-describedby={error ? errorId : undefined}>
      <legend className="text-[0.9rem] font-medium">{label}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const on = value.includes(option);
          return (
            <label
              key={option}
              className={cn(
                "press cursor-pointer rounded-full border px-4 py-2 text-[0.85rem] font-medium transition-colors duration-200",
                on
                  ? "border-transparent bg-ink text-white"
                  : "border-black/10 bg-paper text-ink-soft hover:text-ink",
              )}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={on}
                onChange={() =>
                  onChange(on ? value.filter((v) => v !== option) : [...value, option])
                }
              />
              {option}
            </label>
          );
        })}
      </div>
      <Error id={errorId} message={error} />
    </fieldset>
  );
}
