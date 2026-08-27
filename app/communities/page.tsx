import type { Metadata } from 'next';
import { CategoryResourcePage } from '@/components/ui/category-resource-page';

export const metadata: Metadata = {
  title: 'Communities',
  description: 'Connect with fellow developers in these vibrant communities',
};

export default function Page() {
  return (
    <CategoryResourcePage
      title="Communities"
      description="Connect with fellow developers in these vibrant communities"
    />
  );
}
