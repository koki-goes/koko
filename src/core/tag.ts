export function parseTag(tag?: string): string | undefined {
  if (!tag) {
    return undefined;
  }

  const trimmed = tag.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}
