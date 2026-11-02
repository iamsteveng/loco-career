/** Encode a job slug as one URL path segment. A slash becomes %2F. */
export function encodeJobSlug(slug: string): string {
  return encodeURIComponent(slug);
}

/**
 * Stored slug from a route param.
 * The router may already have turned %2F back into a slash. Decoding again
 * restores a segment that is still percent-encoded, and leaves a decoded
 * slash untouched.
 */
export function decodeJobSlug(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function jobPath(slug: string): string {
  return `/jobs/${encodeJobSlug(slug)}`;
}
