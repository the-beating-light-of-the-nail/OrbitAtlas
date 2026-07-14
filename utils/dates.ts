/** Format an ISO date string as "Jun 6, 2024" for display. */
export function formatDate(iso: string | null | undefined): string {
  if (!iso) return 'Unknown';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return 'Unknown';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/** Format an ISO datetime as "Jun 6, 2024, 12:20 UTC". */
export function formatDateTime(iso: string | null | undefined): string {
  if (!iso) return 'Unknown';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return 'Unknown';
  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  });
  return `${formatDate(iso)}, ${time} UTC`;
}

/** Return a human readable relative phrase like "in 3 days" / "2 months ago". */
export function relativeToNow(iso: string | null | undefined): string {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  const diffMs = date.getTime() - Date.now();
  const absDays = Math.round(Math.abs(diffMs) / 86_400_000);
  const future = diffMs > 0;
  if (absDays < 1) return future ? 'today' : 'today';
  if (absDays === 1) return future ? 'tomorrow' : 'yesterday';
  if (absDays < 30) return future ? `in ${absDays} days` : `${absDays} days ago`;
  const months = Math.round(absDays / 30);
  if (months < 12) return future ? `in ${months} months` : `${months} months ago`;
  const years = Math.round(absDays / 365);
  return future ? `in ${years} years` : `${years} years ago`;
}

/** Year part of an ISO date, or null. */
export function yearOf(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const y = iso.slice(0, 4);
  return /^\d{4}$/.test(y) ? y : null;
}
