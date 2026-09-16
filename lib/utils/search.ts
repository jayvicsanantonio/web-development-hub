// The one rule for narrowing a resource list, and the sentence that reports
// what it found. Every view filters its own list through these: the home page
// the whole catalogue, a category page its own section, bookmarks the saved
// list.

type Filterable = {
  title: string;
  description: string;
  section?: string;
  tags?: string[];
};

/** Whether the visitor has asked for anything to be narrowed at all. */
export function isFiltering(query: string, tags: string[]): boolean {
  return query.trim().length > 0 || tags.length > 0;
}

function matchesQuery(resource: Filterable, query: string): boolean {
  if (!query) return true;

  return (
    resource.title.toLowerCase().includes(query) ||
    resource.description.toLowerCase().includes(query) ||
    (resource.section?.toLowerCase().includes(query) ?? false)
  );
}

/**
 * Narrows a list to the resources matching the query and carrying every
 * selected tag. Resources with no tags drop out as soon as a tag is selected.
 */
export function filterResources<T extends Filterable>(
  resources: T[],
  query: string,
  tags: string[]
): T[] {
  const needle = query.trim().toLowerCase();

  if (!needle && tags.length === 0) return resources;

  return resources.filter(
    (resource) =>
      matchesQuery(resource, needle) &&
      tags.every((tag) => resource.tags?.includes(tag))
  );
}

/**
 * What a filtered page says it found. The query is quoted only when there is
 * one, so filtering by tag alone does not report results `for ""`.
 */
export function resultSummary(
  count: number,
  query: string,
  noun = 'result'
): string {
  const trimmed = query.trim();
  const suffix = trimmed ? ` for "${trimmed}"` : '';
  const plural = count === 1 ? noun : `${noun}s`;

  return count === 0
    ? `No ${noun}s found${suffix}`
    : `Found ${count} ${plural}${suffix}`;
}
