import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "ink" | "blue" | "paper" | "outline" | "onDark";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  ink: "bg-ink text-white hover:bg-ink-deep",
  blue: "bg-brand-blue text-white hover:bg-blue-deep",
  paper: "bg-paper text-ink border border-black/8",
  outline: "bg-transparent text-ink border border-ink/15 hover:bg-ink hover:text-white",
  onDark: "bg-white text-ink hover:bg-cream",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.95rem] sm:h-12 sm:px-6",
  lg: "h-12 px-6 text-base sm:h-14 sm:px-8 sm:text-[1.05rem]",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  magnetic?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = BaseProps & {
  href: string;
  external?: boolean;
};

function classesFor({ variant = "ink", size = "md", className }: BaseProps) {
  return cn("btn-solid", variants[variant], sizes[size], className);
}

/**
 * Pill CTA. Wrapped in a span so GSAP can translate the wrapper for the
 * magnetic effect without fighting the element's own :active transform.
 */
export function ButtonLink({
  href,
  external,
  magnetic = true,
  children,
  ...rest
}: ButtonAsLink) {
  const className = classesFor({ children, ...rest });
  const isExternal = external ?? /^(https?:|mailto:|#$)/.test(href);

  const inner = isExternal ? (
    <a
      href={href}
      className={className}
      {...(href.startsWith("http")
        ? { target: "_blank", rel: "noreferrer noopener" }
        : {})}
    >
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );

  return (
    <span
      className="inline-flex"
      {...(magnetic ? { "data-magnetic": "0.24" } : {})}
    >
      {inner}
    </span>
  );
}

export function Button({
  magnetic = true,
  children,
  variant,
  size,
  className,
  ...rest
}: BaseProps & ComponentPropsWithoutRef<"button">) {
  return (
    <span className="inline-flex" {...(magnetic ? { "data-magnetic": "0.24" } : {})}>
      <button className={classesFor({ variant, size, className, children })} {...rest}>
        {children}
      </button>
    </span>
  );
}

/** Small arrow that nudges right on hover of the parent `.group`. */
export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={cn(
        "size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1",
        className,
      )}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}
