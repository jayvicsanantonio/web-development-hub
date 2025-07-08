import { debounce } from 'lodash'
import { useMemo, useCallback } from 'react'

export type SearchableResource = {
  title: string
  href: string
  description: string
  section: string
  tags?: string[]
}

export type SearchResult = SearchableResource & {
  searchString: string
  relevanceScore: number
}

/**
 * Creates a search index for faster lookups
 */
export const createSearchIndex = (resources: SearchableResource[]): SearchResult[] => {
  return resources.map(resource => {
    const searchString = `${resource.title} ${resource.description} ${resource.section} ${resource.tags?.join(' ') || ''}`.toLowerCase()
    
    return {
      ...resource,
      searchString,
      relevanceScore: 0,
    }
  })
}

/**
 * Calculates relevance score for search results
 */
const calculateRelevanceScore = (resource: SearchResult, query: string): number => {
  const lowerQuery = query.toLowerCase()
  let score = 0
  
  // Title matches get highest score
  if (resource.title.toLowerCase().includes(lowerQuery)) {
    score += 10
    if (resource.title.toLowerCase().startsWith(lowerQuery)) {
      score += 5
    }
  }
  
  // Description matches get medium score
  if (resource.description.toLowerCase().includes(lowerQuery)) {
    score += 5
  }
  
  // Section matches get lower score
  if (resource.section.toLowerCase().includes(lowerQuery)) {
    score += 2
  }
  
  // Tag matches get bonus score
  if (resource.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))) {
    score += 3
  }
  
  return score
}

/**
 * Performs optimized search with relevance scoring
 */
export const performSearch = (
  searchIndex: SearchResult[],
  query: string,
  limit: number = 50
): SearchResult[] => {
  if (!query.trim()) return []
  
  const results = searchIndex
    .filter(resource => resource.searchString.includes(query.toLowerCase()))
    .map(resource => ({
      ...resource,
      relevanceScore: calculateRelevanceScore(resource, query)
    }))
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, limit)
  
  return results
}

/**
 * Custom hook for optimized search functionality
 */
export const useOptimizedSearch = (resources: SearchableResource[]) => {
  // Create search index with memoization
  const searchIndex = useMemo(() => createSearchIndex(resources), [resources])
  
  // Debounced search function
  const debouncedSearch = useMemo(
    () => debounce((query: string, callback: (results: SearchResult[]) => void) => {
      const results = performSearch(searchIndex, query)
      callback(results)
    }, 300),
    [searchIndex]
  )
  
  // Cleanup function
  const cleanup = useCallback(() => {
    debouncedSearch.cancel()
  }, [debouncedSearch])
  
  return {
    searchIndex,
    debouncedSearch,
    cleanup,
    performSearch: (query: string) => performSearch(searchIndex, query)
  }
}

/**
 * Sanitizes search query to prevent injection attacks
 */
export const sanitizeSearchQuery = (query: string): string => {
  return query
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/['"]/g, '') // Remove quotes
    .substring(0, 100) // Limit length
}

/**
 * Validates search query
 */
export const validateSearchQuery = (query: string): { isValid: boolean; error?: string } => {
  if (!query) {
    return { isValid: true } // Empty queries are valid
  }
  
  if (query.length > 100) {
    return { isValid: false, error: 'Search query too long' }
  }
  
  if (query.trim().length < 1) {
    return { isValid: false, error: 'Search query cannot be empty' }
  }
  
  return { isValid: true }
}