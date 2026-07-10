export function titleToSlug(title: string): string {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[\s]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return base || `post-${crypto.randomUUID().slice(0, 8)}`;
}

export function generateUniqueSlug(): string {
  return `post-${crypto.randomUUID().slice(0, 8)}`;
}
