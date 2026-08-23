import type { Metadata } from 'next';
import { CategoryResourcePage } from '@/components/ui/category-resource-page';

export const metadata: Metadata = {
  title: 'Learning Resources',
  description: 'Start or advance your web development journey with these educational resources',
};

export default function Page() {
  return (
    <CategoryResourcePage
      title="Learning Resources"
      description="Start or advance your web development journey with these educational resources"
    />
  );
}
