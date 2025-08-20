
export function generateSecretKey(): string {
  return `sk_live_${Math.random().toString(36).slice(2, 24)}`;
}
