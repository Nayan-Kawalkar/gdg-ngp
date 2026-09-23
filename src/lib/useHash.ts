"use client";

import { useEffect, useRef } from "react";

/**
 * Call `onHash` with the URL fragment (without `#`) on mount, and again every
 * time the visitor follows a same-page `#link`.
 *
 * `hashchange` alone is not enough: Next's <Link> updates the fragment with
 * history.pushState, which never fires it. So we also watch clicks on anchors
 * that point at this page, and read the fragment off the link itself.
 *
 * Used for deep links that pick a form tab, e.g. `/speak#judge` or
 * `/collaborate#partner`.
 */
export function useHash(onHash: (hash: string) => void) {
  const handler = useRef(onHash);

  useEffect(() => {
    handler.current = onHash;
  });

  useEffect(() => {
    const emit = (hash: string) => handler.current(decodeURIComponent(hash.replace(/^#/, "")));

    emit(window.location.hash);

    const onHashChange = () => emit(window.location.hash);
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      const url = new URL(link.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;
      emit(url.hash);
    };

    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onClick);
    };
  }, []);
}
