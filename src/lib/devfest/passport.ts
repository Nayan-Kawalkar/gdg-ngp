"use client";

import { useSyncExternalStore } from "react";
import { devfestRoutes, type Route } from "@/data/devfest";

/**
 * The visitor's DevFest Passport on /devfest: one stamp per route they open,
 * plus the name they typed at the check-in kiosk. Like the real passport,
 * five stamps completes it.
 *
 * Kept in this browser only (localStorage) - a per-visitor keepsake, not
 * data anyone else sees. Every storage call is guarded: private windows and
 * blocked storage just mean the passport resets on reload.
 */

export type RouteId = Route["id"];
export type Passport = {
  stamps: RouteId[];
  name: string;
};

const KEY = "devfest-passport-2026";
export const ROUTE_COUNT = devfestRoutes.length;
const routeIds = new Set<string>(devfestRoutes.map((r) => r.id));
const EMPTY: Passport = { stamps: [], name: "" };

let state: Passport = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();
const stampListeners = new Set<(id: RouteId, total: number) => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const saved = JSON.parse(window.localStorage.getItem(KEY) ?? "null") as Partial<Passport> | null;
    if (saved) {
      state = {
        stamps: Array.isArray(saved.stamps)
          ? saved.stamps.filter((s): s is RouteId => routeIds.has(s))
          : [],
        name: typeof saved.name === "string" ? saved.name.slice(0, 22) : "",
      };
    }
  } catch {
    // unreadable storage: start with an empty passport
  }
}

function commit(next: Passport) {
  state = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // storage full or blocked: the passport still works for this visit
  }
  listeners.forEach((listener) => listener());
}

/** Stamps a route. Returns true if it was a new stamp. */
export function stampRoute(id: RouteId): boolean {
  load();
  if (state.stamps.includes(id)) return false;
  commit({ ...state, stamps: [...state.stamps, id] });
  stampListeners.forEach((listener) => listener(id, state.stamps.length));
  return true;
}

/** Called for each new stamp (not for ones restored from storage). */
export function onStamp(listener: (id: RouteId, total: number) => void) {
  stampListeners.add(listener);
  return () => {
    stampListeners.delete(listener);
  };
}

export function setPassengerName(name: string) {
  load();
  const clean = name.slice(0, 22);
  if (clean !== state.name) commit({ ...state, name: clean });
}

export function resetPassport() {
  load();
  commit(EMPTY);
}

/** The current passport, read synchronously (outside React). */
export function readPassport(): Passport {
  load();
  return state;
}

function subscribe(listener: () => void) {
  load();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** The passport, live. Empty during server render and hydration. */
export function usePassport(): Passport {
  return useSyncExternalStore(subscribe, readPassport, () => EMPTY);
}
