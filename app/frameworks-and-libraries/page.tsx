import type { Metadata } from 'next';
import { CategoryResourcePage } from '@/components/ui/category-resource-page';

export const metadata: Metadata = {
  title: 'Frameworks and Libraries',
  description: 'Powerful frameworks and libraries to build modern web applications',
};

export default function Page() {
  return (
    <CategoryResourcePage
      title="Frameworks and Libraries"
      description="Powerful frameworks and libraries to build modern web applications"
    />
  );
}
