/**
 * Shared field checks for every form on the site. Each returns a boolean so
 * the form keeps ownership of its own error copy - the voice of the message
 * changes per form, the rule does not.
 */

export const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

/** Full http(s) URL with a dotted host. */
export const isUrl = (value: string) => /^(https?:\/\/)[^\s.]+\.[^\s]{2,}/i.test(value.trim());

/** Accepts the scheme-less form people paste, e.g. "linkedin.com/in/name". */
export const isLinkedIn = (value: string) =>
  /^(https?:\/\/)?([\w-]+\.)*linkedin\.com\/.+/i.test(value.trim());

export const isBlank = (value: string) => !value.trim();

export const isShorterThan = (value: string, min: number) => value.trim().length < min;

/** ISO yyyy-mm-dd strings compare correctly as strings. */
export const isPastDate = (isoDate: string) =>
  Boolean(isoDate) && isoDate < new Date().toISOString().slice(0, 10);
