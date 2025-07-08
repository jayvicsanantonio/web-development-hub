import { useState, useCallback } from 'react';

export type TagFilterOptions = {
  /**
   * Initial tags to be selected when the hook is initialized
   */
  initialTags?: string[];
  
  /**
   * Optional callback that runs whenever selected tags change
   */
  onTagsChange?: (tags: string[]) => void;
  
  /**
   * Maximum number of tags that can be selected simultaneously
   * Defaults to unlimited if not specified
   */
  maxTags?: number;
}

/**
 * Hook for managing tag filtering functionality
 * 
 * @param options Configuration options for the filter behavior
 * @returns Object containing tag filter state and methods
 */
export function useFilter(options: TagFilterOptions = {}) {
  const { initialTags = [], onTagsChange, maxTags } = options;
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
  
  /**
   * Add a tag to the selected tags list
   */
  const addTag = useCallback((tag: string) => {
    setSelectedTags(prev => {
      // Don't add if it already exists
      if (prev.includes(tag)) return prev;
      
      // Check if adding would exceed maxTags limit
      if (maxTags !== undefined && prev.length >= maxTags) {
        return prev;
      }
      
      const updated = [...prev, tag];
      onTagsChange?.(updated);
      return updated;
    });
  }, [maxTags, onTagsChange]);
  
  /**
   * Remove a tag from the selected tags list
   */
  const removeTag = useCallback((tag: string) => {
    setSelectedTags(prev => {
      const updated = prev.filter(t => t !== tag);
      onTagsChange?.(updated);
      return updated;
    });
  }, [onTagsChange]);
  
  /**
   * Toggle a tag (add if not present, remove if present)
   */
  const toggleTag = useCallback((tag: string) => {
    setSelectedTags(prev => {
      const isSelected = prev.includes(tag);
      const updated = isSelected 
        ? prev.filter(t => t !== tag)
        : [...prev, tag];
        
      // Check if adding would exceed maxTags limit
      if (!isSelected && maxTags !== undefined && prev.length >= maxTags) {
        return prev;
      }
      
      onTagsChange?.(updated);
      return updated;
    });
  }, [maxTags, onTagsChange]);
  
  /**
   * Clear all selected tags
   */
  const clearAllTags = useCallback(() => {
    setSelectedTags([]);
    onTagsChange?.([]);
  }, [onTagsChange]);
  
  /**
   * Check if a specific tag is selected
   */
  const isTagSelected = useCallback((tag: string) => {
    return selectedTags.includes(tag);
  }, [selectedTags]);
  
  /**
   * Filter resources based on the selected tags
   * 
   * @param resources Array of resources to filter
   * @param tagFieldName The property name where tags are stored in each resource
   * @returns Filtered array of resources
   */
  const filterResourcesByTags = useCallback(<T extends Record<string, any>>(
    resources: T[],
    tagFieldName: string = 'tags'
  ): T[] => {
    if (selectedTags.length === 0) return resources;
    
    return resources.filter(resource => {
      const resourceTags = resource[tagFieldName];
      return resourceTags && 
             Array.isArray(resourceTags) && 
             selectedTags.some(tag => resourceTags.includes(tag));
    });
  }, [selectedTags]);
  
  return {
    // State
    selectedTags,
    
    // Actions
    addTag,
    removeTag,
    toggleTag,
    clearAllTags,
    
    // Helpers
    isTagSelected,
    filterResourcesByTags,
    
    // Derived values
    hasSelectedTags: selectedTags.length > 0,
    selectedTagCount: selectedTags.length,
    
    // For direct state manipulation (use with caution)
    setSelectedTags
  };
}
