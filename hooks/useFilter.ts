// Tag selection state for the filter panel, plus the predicate that narrows a
// resource list to the selected tags.
import { useCallback, useState } from 'react';

export function useFilter() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  /** Adds or removes a tag depending on whether it is already selected. */
  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((current) =>
      current.includes(tag)
        ? current.filter((t) => t !== tag)
        : [...current, tag]
    );
  }, []);

  /** Drops every selection. */
  const clearAllTags = useCallback(() => {
    setSelectedTags([]);
  }, []);

  const isTagSelected = useCallback(
    (tag: string) => selectedTags.includes(tag),
    [selectedTags]
  );

  /**
   * Narrows a list to resources carrying every selected tag. Resources with
   * no tags drop out as soon as anything is selected.
   */
  const filterResourcesByTags = useCallback(
    <T extends { tags?: string[] }>(resources: T[]): T[] => {
      if (selectedTags.length === 0) return resources;

      return resources.filter((resource) =>
        selectedTags.every((tag) => resource.tags?.includes(tag))
      );
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
  };
}
