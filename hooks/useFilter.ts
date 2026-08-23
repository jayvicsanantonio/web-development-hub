import { useState, useCallback } from 'react';

/**
 * Tag selection state.
 *
 * This previously exposed an `initialTags` / `onTagsChange` / `maxTags` option
 * object and five mutation paths, for a single caller that passed no options
 * and used two of them. The `onTagsChange` callback was also invoked from
 * inside the state updater, which is not a pure updater; deleting the unused
 * surface removes that hazard rather than hardening around it.
 */
export function useFilter() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  }, []);

  const clearAllTags = useCallback(() => {
    setSelectedTags([]);
  }, []);

  const isTagSelected = useCallback(
    (tag: string) => selectedTags.includes(tag),
    [selectedTags]
  );

  // Accepts both catalogue resources and bookmarks; the bookmark type does not
  // declare `tags`, so this stays structural rather than a concrete Resource[].
  const filterResourcesByTags = useCallback(
    <T extends { tags?: string[] }>(resources: T[]): T[] => {
      if (selectedTags.length === 0) return resources;

      return resources.filter((resource) => {
        const resourceTags = resource.tags;
        return (
          Array.isArray(resourceTags) &&
          selectedTags.every((tag) => resourceTags.includes(tag))
        );
      });
    },
    [selectedTags]
  );

  return {
    selectedTags,
    toggleTag,
    clearAllTags,
    isTagSelected,
    filterResourcesByTags,
    hasSelectedTags: selectedTags.length > 0,
    selectedTagCount: selectedTags.length,
  };
}
