export const formatDate = (date: Date | null): string => {
  if (!date) return "Not enabled";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function generateSecretKey(): string {
  return `sk_live_${Math.random().toString(36).slice(2, 24)}`;
}
