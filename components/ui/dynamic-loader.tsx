'use client';

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

interface DynamicLoaderProps {
  loading?: () => JSX.Element;
}

// Loading component
const DefaultLoader = () => (
  <div className="flex items-center justify-center h-32">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

// Higher-order component for dynamic loading
export function createDynamicComponent<T extends ComponentType<any>>(
  importFunction: () => Promise<{ default: T }>,
  options?: DynamicLoaderProps
) {
  return dynamic(importFunction, {
    loading: options?.loading || DefaultLoader,
    ssr: false, // Disable SSR for components that need client-side features
  });
}

// Pre-configured dynamic components for common use cases
export const DynamicSearchWrapper = createDynamicComponent(
  () => import('@/components/search-wrapper')
);

export const DynamicResourceGrid = createDynamicComponent(
  () => import('@/components/ui/resource-grid')
);

export default DynamicLoader;

function DynamicLoader({ loading = DefaultLoader }: DynamicLoaderProps) {
  return loading();
}
