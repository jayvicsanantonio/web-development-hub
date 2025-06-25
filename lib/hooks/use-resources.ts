'use client';
import { useState, useEffect } from 'react';
import { api } from '../api/client';
import { CategoryType, Resource } from '../types';
export function useResources(category: CategoryType) {
  const data = api.getResourcesByCategory(category);
  return {
    data,
    isLoading: false,
    error: null
  };
}
export function useResourceById(id: string | null) {
  const data = id ? api.getResourceById(id) : undefined;
  return {
    data,
    isLoading: false,
    error: null
  };
}
export function useFeaturedResources() {
  const data = api.getFeaturedResources();
  return {
    data,
    isLoading: false,
    error: null
  };
}
export function useSearchResources(term: string) {
  const data = term.length > 1 ? api.searchResources(term) : [];
  return {
    data,
    isLoading: false,
    error: null
  };
}
export function useRecentBlogs() {
  const data = api.getRecentBlogs();
  return {
    data,
    isLoading: false,
    error: null
  };
}
