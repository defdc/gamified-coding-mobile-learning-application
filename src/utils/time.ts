export function nowIso(): string {
  return new Date().toISOString();
}

export function secondsSince(startTimeMs: number): number {
  return Math.max(0, Math.round((Date.now() - startTimeMs) / 1000));
}
