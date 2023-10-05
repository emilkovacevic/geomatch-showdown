export function formatDate(isoDateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const date = new Date(isoDateString);
  return date.toLocaleDateString("en-US", options);
}
