import type { Metadata } from 'next';
import { CategoryResourcePage } from '@/components/ui/category-resource-page';

export const metadata: Metadata = {
  title: 'Developer Tools',
  description: 'Essential tools to streamline your development workflow',
};

export default function Page() {
  return (
    <CategoryResourcePage
      title="Developer Tools"
      description="Essential tools to streamline your development workflow"
    />
  );
}
