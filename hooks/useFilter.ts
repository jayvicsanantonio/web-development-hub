import { useState, useCallback } from 'react';

export type TagFilterOptions = {
  
  initialTags?: string[];

  
  onTagsChange?: (tags: string[]) => void;

  
  maxTags?: number;
};


export function useFilter(options: TagFilterOptions = {}) {
  const { initialTags = [], onTagsChange, maxTags } = options;
  const [selectedTags, setSelectedTags] =
    useState<string[]>(initialTags);

  
  const addTag = useCallback(
    (tag: string) => {
      setSelectedTags((prev) => {

        if (prev.includes(tag)) return prev;


        if (maxTags !== undefined && prev.length >= maxTags) {
          return prev;
        }

        const updated = [...prev, tag];
        onTagsChange?.(updated);
        return updated;
      });
    },
    [maxTags, onTagsChange]
  );

  
  const removeTag = useCallback(
    (tag: string) => {
      setSelectedTags((prev) => {
        const updated = prev.filter((t) => t !== tag);
        onTagsChange?.(updated);
        return updated;
      });
    },
    [onTagsChange]
  );

  
  const toggleTag = useCallback(
    (tag: string) => {
      setSelectedTags((prev) => {
        const isSelected = prev.includes(tag);
        const updated = isSelected
          ? prev.filter((t) => t !== tag)
          : [...prev, tag];


        if (
          !isSelected &&
          maxTags !== undefined &&
          prev.length >= maxTags
        ) {
          return prev;
        }

        onTagsChange?.(updated);
        return updated;
      });
    },
    [maxTags, onTagsChange]
  );

  
  const clearAllTags = useCallback(() => {
    setSelectedTags([]);
    onTagsChange?.([]);
  }, [onTagsChange]);

  
  const isTagSelected = useCallback(
    (tag: string) => {
      return selectedTags.includes(tag);
    },
    [selectedTags]
  );

  
  const filterResourcesByTags = useCallback(
    <T extends Record<string, any>>(
      resources: T[],
      tagFieldName: string = 'tags'
    ): T[] => {
      if (selectedTags.length === 0) return resources;

      return resources.filter((resource) => {
        const resourceTags = resource[tagFieldName];
        return (
          resourceTags &&
          Array.isArray(resourceTags) &&
          selectedTags.every((tag) => resourceTags.includes(tag))
        );
      });
    },
    [selectedTags]
  );

  return {

    selectedTags,


    addTag,
    removeTag,
    toggleTag,
    clearAllTags,


    isTagSelected,
    filterResourcesByTags,


    hasSelectedTags: selectedTags.length > 0,
    selectedTagCount: selectedTags.length,


    setSelectedTags,
  };
}
