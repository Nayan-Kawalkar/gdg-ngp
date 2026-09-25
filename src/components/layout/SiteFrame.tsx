"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Event microsites (DevFest) bring their own header, <main> and footer, as
 * their designs require. Everything else gets the site chrome. The slots are
 * server components passed in from the root layout, so nothing about them
 * becomes client-rendered.
 */
const standaloneRoutes = ["/devfest"];

export default function SiteFrame({
  navbar,
  footer,
  chat,
  children,
}: {
  navbar: ReactNode;
  footer: ReactNode;
  chat: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const standalone = standaloneRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (standalone) return <>{children}</>;

  return (
    <>
      {navbar}
      <main id="main">{children}</main>
      {footer}
      {chat}
    </>
  );
}
